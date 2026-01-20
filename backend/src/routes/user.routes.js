import express from 'express';
import { getUserProfile, onboardUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

/**
 * @route   GET /api/user/profile
 * @desc    Get current user's profile
 * @access  Private
 */
router.get('/profile', getUserProfile);

/**
 * @route   POST /api/user/onboard
 * @desc    Complete user onboarding with additional details
 * @access  Private
 */
router.post('/onboard', onboardUser);

export default router;
