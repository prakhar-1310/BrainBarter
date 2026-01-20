import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Import routes
import userRoutes from './routes/user.routes.js';
import contentRoutes from './routes/content.routes.js';
import examRoutes from './routes/exam.routes.js';
import walletRoutes from './routes/wallet.routes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (no auth required)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'BrainBarter API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/wallet', walletRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to BrainBarter API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      user: '/api/user',
      content: '/api/content',
      exam: '/api/exam',
      wallet: '/api/wallet'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

export default app;
