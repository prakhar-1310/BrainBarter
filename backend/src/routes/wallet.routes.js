import express from 'express';
import {
  getBalance,
  spendTokens,
  getTransactions
} from '../controllers/wallet.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

/**
 * @route   GET /api/wallet/balance
 * @desc    Get current token balance
 * @access  Private
 */
router.get('/balance', getBalance);

/**
 * @route   POST /api/wallet/spend
 * @desc    Spend tokens (generic endpoint)
 * @access  Private
 */
router.post('/spend', spendTokens);

/**
 * @route   GET /api/wallet/transactions
 * @desc    Get transaction history (purchases/earnings)
 * @access  Private
 */
router.get('/transactions', getTransactions);

export default router;
