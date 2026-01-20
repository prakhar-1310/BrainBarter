import { supabaseAdmin, getSignedUrl, STORAGE_BUCKETS } from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Supabase Service - handles all database and storage operations
 */
class SupabaseService {
  /**
   * Create or update user profile
   */
  async upsertUser(userData) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .upsert([userData], { onConflict: 'clerk_user_id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get user by Clerk ID
   */
  async getUserByClerkId(clerkUserId) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  /**
   * Get user by internal ID
   */
  async getUserById(userId) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update user token balance
   */
  async updateTokenBalance(userId, newBalance) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ token_balance: newBalance })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Create content
   */
  async createContent(contentData) {
    const { data, error } = await supabaseAdmin
      .from('contents')
      .insert([contentData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get content by ID
   */
  async getContentById(contentId) {
    const { data, error } = await supabaseAdmin
      .from('contents')
      .select(`
        *,
        creator:users!contents_creator_id_fkey(id, name, email)
      `)
      .eq('id', contentId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get recommended content (filtered by subject, topic, etc.)
   */
  async getRecommendedContent(filters = {}) {
    let query = supabaseAdmin
      .from('contents')
      .select(`
        *,
        creator:users!contents_creator_id_fkey(id, name)
      `)
      .order('created_at', { ascending: false });

    if (filters.subject) {
      query = query.eq('subject', filters.subject);
    }

    if (filters.topic) {
      query = query.eq('topic', filters.topic);
    }

    if (filters.contentType) {
      query = query.eq('content_type', filters.contentType);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  /**
   * Check if user has purchased content
   */
  async hasPurchased(userId, contentId) {
    const { data, error } = await supabaseAdmin
      .from('purchases')
      .select('id')
      .eq('user_id', userId)
      .eq('content_id', contentId)
      .single();

    return !!data;
  }

  /**
   * Record a purchase
   */
  async recordPurchase(userId, contentId, tokensSpent) {
    const { data, error } = await supabaseAdmin
      .from('purchases')
      .insert([{
        user_id: userId,
        content_id: contentId,
        tokens_spent: tokensSpent
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Record creator earnings
   */
  async recordEarnings(creatorId, contentId, tokensEarned) {
    const { data, error } = await supabaseAdmin
      .from('earnings')
      .insert([{
        creator_id: creatorId,
        content_id: contentId,
        tokens_earned: tokensEarned
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get user's purchase history
   */
  async getUserPurchases(userId) {
    const { data, error } = await supabaseAdmin
      .from('purchases')
      .select(`
        *,
        content:contents(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Get creator's earnings
   */
  async getCreatorEarnings(creatorId) {
    const { data, error } = await supabaseAdmin
      .from('earnings')
      .select(`
        *,
        content:contents(title, subject)
      `)
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Upload file to Supabase Storage
   */
  async uploadFile(bucket, filePath, fileBuffer, contentType) {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, fileBuffer, {
        contentType,
        upsert: false
      });

    if (error) throw error;
    return data;
  }

  /**
   * Get signed URL for private content
   */
  async getSignedUrl(bucket, path, expiresIn = 3600) {
    return await getSignedUrl(bucket, path, expiresIn);
  }

  /**
   * Delete file from storage
   */
  async deleteFile(bucket, path) {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
    return data;
  }

  /**
   * Store exam input
   */
  async storeExamInput(userId, syllabusUrl, pastPapersUrl) {
    const { data, error } = await supabaseAdmin
      .from('exam_inputs')
      .insert([{
        user_id: userId,
        syllabus_url: syllabusUrl,
        past_papers_url: pastPapersUrl
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get exam inputs by user
   */
  async getExamInputsByUser(userId) {
    const { data, error } = await supabaseAdmin
      .from('exam_inputs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export default new SupabaseService();
