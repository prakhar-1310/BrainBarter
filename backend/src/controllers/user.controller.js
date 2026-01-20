import supabaseService from '../services/supabase.service.js';
import { HTTP_STATUS } from '../constants/index.js';
import { clerkClient } from '@clerk/clerk-sdk-node';

/**
 * User Controller - handles user profile operations
 */

/**
 * GET /api/user/profile
 * Get current user's profile
 */
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await supabaseService.getUserById(userId);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        college: user.college,
        course: user.course,
        role: user.role,
        tokenBalance: user.token_balance,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};

/**
 * POST /api/user/onboard
 * Complete user onboarding with additional details
 */
export const onboardUser = async (req, res) => {
  try {
    console.log('=== Onboard User Controller ===');
    console.log('User ID:', req.user?.id);
    console.log('Request body:', req.body);
    
    const userId = req.user.id;
    const { name, college, course, role } = req.body;

    // Allow role-only updates for initial role selection
    if (role && !name && !college && !course) {
      console.log('Role-only update requested:', role);
      
      const updatedUser = await supabaseService.upsertUser({
        id: userId,
        clerk_user_id: req.user.clerkUserId,
        email: req.user.email,
        role: role
      });

      console.log('User updated successfully:', updatedUser?.id);
      
      // Update Clerk metadata to mark user as onboarded
      await clerkClient.users.updateUser(req.user.clerkUserId, {
        publicMetadata: {
          onboarded: true,
          role: role
        }
      });
      
      console.log('Clerk metadata updated for:', req.user.clerkUserId);

      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Role updated successfully',
        data: {
          id: updatedUser.id,
          role: updatedUser.role,
          tokenBalance: updatedUser.token_balance
        }
      });
    }

    if (!name || !college || !course) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Name, college, and course are required for full onboarding'
      });
    }

    const updatedUser = await supabaseService.upsertUser({
      id: userId,
      clerk_user_id: req.user.clerkUserId,
      name,
      email: req.user.email,
      college,
      course,
      role: role || req.user.role
    });
    
    // Update Clerk metadata for full onboarding
    await clerkClient.users.updateUser(req.user.clerkUserId, {
      publicMetadata: {
        onboarded: true,
        role: role || req.user.role
      }
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        college: updatedUser.college,
        course: updatedUser.course,
        role: updatedUser.role,
        tokenBalance: updatedUser.token_balance
      }
    });
  } catch (error) {
    console.error('Onboard user error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

export default { getUserProfile, onboardUser };
