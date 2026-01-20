import supabaseService from '../services/supabase.service.js';
import aiService from '../services/ai.service.js';
import { HTTP_STATUS, TOKEN_DISTRIBUTION } from '../constants/index.js';
import { STORAGE_BUCKETS } from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

/**
 * Content Controller - handles content upload, retrieval, and purchases
 */

/**
 * POST /api/content/upload
 * Upload new content (creator only)
 */
export const uploadContent = async (req, res) => {
  try {
    const creatorId = req.user.id;
    const { title, subject, topic, description, contentType, priceTokens } = req.body;

    if (!title || !subject || !topic || !contentType || !priceTokens) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    if (!req.file) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Determine storage bucket based on content type
    let bucket;
    if (contentType === 'video') {
      bucket = STORAGE_BUCKETS.VIDEOS;
    } else if (contentType === 'pdf' || contentType === 'notes') {
      bucket = STORAGE_BUCKETS.NOTES;
    } else {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid content type'
      });
    }

    // Generate unique file path
    const fileExt = path.extname(req.file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = `${creatorId}/${fileName}`;

    // Upload to Supabase Storage
    await supabaseService.uploadFile(
      bucket,
      filePath,
      req.file.buffer,
      req.file.mimetype
    );

    // Create content record in database
    const content = await supabaseService.createContent({
      creator_id: creatorId,
      title,
      subject,
      topic,
      description,
      content_type: contentType,
      storage_url: filePath,
      price_tokens: parseInt(priceTokens),
      rating: 0
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Content uploaded successfully',
      data: content
    });
  } catch (error) {
    console.error('Upload content error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to upload content',
      error: error.message
    });
  }
};

/**
 * GET /api/content/recommendations
 * Get recommended content for students
 */
export const getRecommendations = async (req, res) => {
  try {
    const { subject, topic, contentType } = req.query;

    const filters = {};
    if (subject) filters.subject = subject;
    if (topic) filters.topic = topic;
    if (contentType) filters.contentType = contentType;

    const contents = await supabaseService.getRecommendedContent(filters);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: contents
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch recommendations',
      error: error.message
    });
  }
};

/**
 * GET /api/content/:id
 * Get specific content details
 */
export const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const content = await supabaseService.getContentById(id);

    if (!content) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Content not found'
      });
    }

    // Check if user has purchased this content
    const hasPurchased = await supabaseService.hasPurchased(userId, id);

    // If purchased, include signed URL for access
    let accessUrl = null;
    if (hasPurchased || content.creator_id === userId) {
      // Determine bucket based on content type
      let bucket;
      if (content.content_type === 'video') {
        bucket = STORAGE_BUCKETS.VIDEOS;
      } else {
        bucket = STORAGE_BUCKETS.NOTES;
      }

      accessUrl = await supabaseService.getSignedUrl(bucket, content.storage_url, 7200);
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        ...content,
        hasPurchased,
        accessUrl
      }
    });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch content',
      error: error.message
    });
  }
};

/**
 * POST /api/content/unlock
 * Unlock/purchase content with tokens
 */
export const unlockContent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contentId } = req.body;

    if (!contentId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Content ID is required'
      });
    }

    // Get content details
    const content = await supabaseService.getContentById(contentId);

    if (!content) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Content not found'
      });
    }

    // Check if already purchased
    const alreadyPurchased = await supabaseService.hasPurchased(userId, contentId);

    if (alreadyPurchased) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: 'Content already purchased'
      });
    }

    // Get user's current balance
    const user = await supabaseService.getUserById(userId);

    if (user.token_balance < content.price_tokens) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Insufficient tokens',
        required: content.price_tokens,
        available: user.token_balance
      });
    }

    // Calculate token distribution
    const creatorShare = Math.floor(content.price_tokens * TOKEN_DISTRIBUTION.CREATOR_SHARE);
    const platformShare = Math.floor(content.price_tokens * TOKEN_DISTRIBUTION.PLATFORM_SHARE);
    const aiPoolShare = content.price_tokens - creatorShare - platformShare;

    // Deduct tokens from student
    const newStudentBalance = user.token_balance - content.price_tokens;
    await supabaseService.updateTokenBalance(userId, newStudentBalance);

    // Add tokens to creator
    const creator = await supabaseService.getUserById(content.creator_id);
    const newCreatorBalance = creator.token_balance + creatorShare;
    await supabaseService.updateTokenBalance(content.creator_id, newCreatorBalance);

    // Record purchase
    await supabaseService.recordPurchase(userId, contentId, content.price_tokens);

    // Record creator earnings
    await supabaseService.recordEarnings(content.creator_id, contentId, creatorShare);

    // Get signed URL for access
    let bucket;
    if (content.content_type === 'video') {
      bucket = STORAGE_BUCKETS.VIDEOS;
    } else {
      bucket = STORAGE_BUCKETS.NOTES;
    }

    const accessUrl = await supabaseService.getSignedUrl(bucket, content.storage_url, 7200);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Content unlocked successfully',
      data: {
        content,
        accessUrl,
        newBalance: newStudentBalance,
        distribution: {
          creator: creatorShare,
          platform: platformShare,
          aiPool: aiPoolShare
        }
      }
    });
  } catch (error) {
    console.error('Unlock content error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to unlock content',
      error: error.message
    });
  }
};

export default {
  uploadContent,
  getRecommendations,
  getContentById,
  unlockContent
};
