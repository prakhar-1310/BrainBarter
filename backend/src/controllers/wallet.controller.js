import supabaseService from '../services/supabase.service.js';
import { HTTP_STATUS } from '../constants/index.js';

/**
 * Wallet Controller - handles token balance and transactions
 */

/**
 * GET /api/wallet/balance
 * Get current token balance
 */
export const getBalance = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await supabaseService.getUserById(userId);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        balance: user.token_balance,
        userId: user.id
      }
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch balance',
      error: error.message
    });
  }
};

/**
 * POST /api/wallet/spend
 * Spend tokens (generic endpoint for non-content purchases)
 */
export const spendTokens = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, reason } = req.body;

    if (!amount || amount <= 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid amount'
      });
    }

    const user = await supabaseService.getUserById(userId);

    if (user.token_balance < amount) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Insufficient tokens',
        required: amount,
        available: user.token_balance
      });
    }

    const newBalance = user.token_balance - amount;
    await supabaseService.updateTokenBalance(userId, newBalance);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `${amount} tokens spent successfully`,
      data: {
        previousBalance: user.token_balance,
        newBalance,
        amountSpent: amount,
        reason: reason || 'General purchase'
      }
    });
  } catch (error) {
    console.error('Spend tokens error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to spend tokens',
      error: error.message
    });
  }
};

/**
 * GET /api/wallet/transactions
 * Get transaction history (purchases and earnings)
 */
export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let transactions = [];

    if (userRole === 'student') {
      // Get purchase history
      const purchases = await supabaseService.getUserPurchases(userId);
      transactions = purchases.map(p => ({
        id: p.id,
        type: 'purchase',
        amount: -p.tokens_spent,
        contentTitle: p.content?.title,
        contentId: p.content_id,
        date: p.created_at
      }));
    } else if (userRole === 'creator') {
      // Get earnings history
      const earnings = await supabaseService.getCreatorEarnings(userId);
      transactions = earnings.map(e => ({
        id: e.id,
        type: 'earning',
        amount: e.tokens_earned,
        contentTitle: e.content?.title,
        contentId: e.content_id,
        date: e.created_at
      }));
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        transactions,
        totalTransactions: transactions.length
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: error.message
    });
  }
};

export default {
  getBalance,
  spendTokens,
  getTransactions
};
