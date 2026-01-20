import express from 'express';
import multer from 'multer';
import {
  uploadExamFiles,
  predictTopics,
  getRecommendedContent
} from '../controllers/exam.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit for exam files
  }
});

// All routes require authentication
router.use(authMiddleware);

/**
 * @route   POST /api/exam/upload
 * @desc    Upload syllabus and past papers
 * @access  Private (Student)
 */
router.post('/upload', upload.fields([
  { name: 'syllabus', maxCount: 1 },
  { name: 'pastPapers', maxCount: 1 }
]), uploadExamFiles);

/**
 * @route   POST /api/exam/predict-topics
 * @desc    Use AI to predict exam topics from uploaded files
 * @access  Private (Student)
 */
router.post('/predict-topics', predictTopics);

/**
 * @route   GET /api/exam/recommended-content
 * @desc    Get content recommendations based on predicted topics
 * @access  Private (Student)
 */
router.get('/recommended-content', getRecommendedContent);

export default router;
