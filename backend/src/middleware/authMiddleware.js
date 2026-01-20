import { clerkClient } from '@clerk/clerk-sdk-node';
import { supabaseAdmin } from '../config/supabase.js';
import { HTTP_STATUS } from '../constants/index.js';
import { verifyToken } from '@clerk/clerk-sdk-node';

/**
 * Authentication middleware to verify Clerk JWT tokens
 * Attaches user info to req.user
 */
export const authMiddleware = async (req, res, next) => {
  try {
    console.log('Auth middleware called for:', req.method, req.path);
    console.log('Authorization header:', req.headers.authorization ? 'Present' : 'Missing');
    
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid authorization header');
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'No authorization token provided'
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token extracted, length:', token.length);

    // Verify token using Clerk's verifyToken
    const decoded = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY
    });
    
    console.log('Token verified, user ID:', decoded?.sub);
    
    if (!decoded || !decoded.sub) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Get user details from Clerk
    const clerkUser = await clerkClient.users.getUser(decoded.sub);
    console.log('Clerk user fetched:', clerkUser.id);
    
    // Get or create user in Supabase
    const { data: dbUser, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUser.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    // If user doesn't exist in DB, create them
    if (!dbUser) {
      const userEmail = clerkUser.emailAddresses[0]?.emailAddress;
      const adminEmail = process.env.ADMIN_EMAIL;
      
      // Auto-assign admin role if email matches
      const autoRole = (adminEmail && userEmail === adminEmail) 
        ? 'admin' 
        : (clerkUser.publicMetadata?.role || 'student');
      
      // Admin gets unlimited tokens (999999999)
      const tokenBalance = (autoRole === 'admin') ? 999999999 : 100;
      
      const { data: newUser, error: createError } = await supabaseAdmin
        .from('users')
        .insert([{
          clerk_user_id: clerkUser.id,
          email: userEmail,
          name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim() : null,
          role: autoRole,
          token_balance: tokenBalance
        }])
        .select()
        .single();

      if (createError) throw createError;

      req.user = {
        id: newUser.id,
        clerkUserId: clerkUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        tokenBalance: newUser.token_balance
      };
    } else {
      // Check if user should be admin based on email
      const adminEmail = process.env.ADMIN_EMAIL;
      let userRole = dbUser.role;
      
      if (adminEmail && dbUser.email === adminEmail && dbUser.role !== 'admin') {
        // Auto-upgrade to admin
        const { data: updatedUser } = await supabaseAdmin
          .from('users')
          .update({ role: 'admin' })
          .eq('id', dbUser.id)
          .select()
          .single();
        
        userRole = 'admin';
      }
      
      req.user = {
        id: dbUser.id,
        clerkUserId: dbUser.clerk_user_id,
        email: dbUser.email,
        name: dbUser.name,
        role: userRole,
        tokenBalance: dbUser.token_balance,
        college: dbUser.college,
        course: dbUser.course
      };
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
};

export default authMiddleware;
