import supabaseService from '../services/supabase.service.js';
import aiService from '../services/ai.service.js';
import { HTTP_STATUS } from '../constants/index.js';
import { STORAGE_BUCKETS } from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

/**
 * Exam Controller - handles exam mode features
 */

/**
 * POST /api/exam/upload
 * Upload syllabus and past papers
 */
export const uploadExamFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.files || !req.files.syllabus || !req.files.pastPapers) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Both syllabus and past papers are required'
      });
    }

    const syllabusFile = req.files.syllabus[0];
    const pastPapersFile = req.files.pastPapers[0];

    // Upload syllabus
    const syllabusExt = path.extname(syllabusFile.originalname);
    const syllabusFileName = `syllabus_${uuidv4()}${syllabusExt}`;
    const syllabusPath = `${userId}/${syllabusFileName}`;

    await supabaseService.uploadFile(
      STORAGE_BUCKETS.EXAM_FILES,
      syllabusPath,
      syllabusFile.buffer,
      syllabusFile.mimetype
    );

    // Upload past papers
    const papersExt = path.extname(pastPapersFile.originalname);
    const papersFileName = `papers_${uuidv4()}${papersExt}`;
    const papersPath = `${userId}/${papersFileName}`;

    await supabaseService.uploadFile(
      STORAGE_BUCKETS.EXAM_FILES,
      papersPath,
      pastPapersFile.buffer,
      pastPapersFile.mimetype
    );

    // Store in database
    const examInput = await supabaseService.storeExamInput(
      userId,
      syllabusPath,
      papersPath
    );

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Exam files uploaded successfully',
      data: {
        id: examInput.id,
        syllabusUrl: syllabusPath,
        pastPapersUrl: papersPath
      }
    });
  } catch (error) {
    console.error('Upload exam files error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to upload exam files',
      error: error.message
    });
  }
};

/**
 * POST /api/exam/predict-topics
 * Use AI to predict exam topics
 */
export const predictTopics = async (req, res) => {
  try {
    const { examInputId } = req.body;

    if (!examInputId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Exam input ID is required'
      });
    }

    // Get exam input files
    const examInputs = await supabaseService.getExamInputsByUser(req.user.id);
    const examInput = examInputs.find(input => input.id === examInputId);

    if (!examInput) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Exam input not found'
      });
    }

    // Get signed URLs for files
    const syllabusUrl = await supabaseService.getSignedUrl(
      STORAGE_BUCKETS.EXAM_FILES,
      examInput.syllabus_url,
      3600
    );

    const papersUrl = await supabaseService.getSignedUrl(
      STORAGE_BUCKETS.EXAM_FILES,
      examInput.past_papers_url,
      3600
    );

    // Extract text from files (placeholder - needs actual implementation)
    const syllabusText = await aiService.extractText(syllabusUrl);
    const papersText = await aiService.extractText(papersUrl);

    // Predict topics using AI
    const predictions = await aiService.predictExamTopics(syllabusText, papersText);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        predictions,
        syllabusUrl,
        papersUrl
      }
    });
  } catch (error) {
    console.error('Predict topics error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to predict topics',
      error: error.message
    });
  }
};

/**
 * GET /api/exam/recommended-content
 * Get content recommendations based on predicted topics
 */
export const getRecommendedContent = async (req, res) => {
  try {
    const { topics } = req.query;

    if (!topics) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Topics are required'
      });
    }

    // Parse topics (comma-separated)
    const topicList = topics.split(',').map(t => t.trim());

    // Get content for each topic
    const allContent = [];

    for (const topic of topicList) {
      const content = await supabaseService.getRecommendedContent({ topic });
      allContent.push(...content);
    }

    // Remove duplicates
    const uniqueContent = Array.from(
      new Map(allContent.map(item => [item.id, item])).values()
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: uniqueContent
    });
  } catch (error) {
    console.error('Get recommended content error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch recommended content',
      error: error.message
    });
  }
};

export default {
  uploadExamFiles,
  predictTopics,
  getRecommendedContent
};
