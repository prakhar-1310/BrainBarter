import express from 'express';
import multer from 'multer';
import {
  uploadContent,
  getRecommendations,
  getContentById,
  unlockContent
} from '../controllers/content.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireCreator } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB limit
  }
});

// All routes require authentication
router.use(authMiddleware);

/**
 * @route   POST /api/content/upload
 * @desc    Upload new content (videos, PDFs, notes)
 * @access  Private (Creator only)
 */
router.post('/upload', requireCreator, upload.single('file'), uploadContent);

/**
 * @route   GET /api/content/recommendations
 * @desc    Get recommended content based on filters
 * @access  Private
 */
router.get('/recommendations', getRecommendations);

/**
 * @route   GET /api/content/:id
 * @desc    Get specific content details
 * @access  Private
 */
router.get('/:id', getContentById);

/**
 * @route   POST /api/content/unlock
 * @desc    Purchase/unlock content with tokens
 * @access  Private (Student)
 */
router.post('/unlock', unlockContent);

export default router;
