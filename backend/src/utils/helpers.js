/**
 * Response formatting utility
 */
export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const sendError = (res, message, statusCode = 500, error = null) => {
  const response = {
    success: false,
    message
  };

  if (error && process.env.NODE_ENV === 'development') {
    response.error = error.message;
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

/**
 * Async handler wrapper to catch errors
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Validate required fields
 */
export const validateFields = (fields, body) => {
  const missing = [];
  
  for (const field of fields) {
    if (!body[field]) {
      missing.push(field);
    }
  }

  if (missing.length > 0) {
    return {
      valid: false,
      missing
    };
  }

  return { valid: true };
};

/**
 * Generate random string
 */
export const generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Parse pagination parameters
 */
export const parsePagination = (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

export default {
  sendSuccess,
  sendError,
  asyncHandler,
  validateFields,
  generateRandomString,
  parsePagination
};
