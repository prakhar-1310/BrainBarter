import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

const clerkSecretKey = process.env.CLERK_SECRET_KEY;

if (!clerkSecretKey) {
  throw new Error('Missing CLERK_SECRET_KEY environment variable');
}

// Initialize Clerk client with API key
export const clerk = Clerk({ secretKey: clerkSecretKey });

// Helper to verify session token
export const verifyClerkToken = async (token) => {
  try {
    const session = await clerk.sessions.verifySession(token);
    return session;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Helper to get user from Clerk
export const getClerkUser = async (userId) => {
  try {
    const user = await clerk.users.getUser(userId);
    return user;
  } catch (error) {
    throw new Error('User not found');
  }
};

export default clerk;
