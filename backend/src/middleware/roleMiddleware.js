import { HTTP_STATUS, USER_ROLES } from '../constants/index.js';

/**
 * Middleware to restrict access to creator-only routes
 */
export const requireCreator = (req, res, next) => {
  if (!req.user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (req.user.role !== USER_ROLES.CREATOR) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: 'Creator access required'
    });
  }

  next();
};

/**
 * Middleware to restrict access to student-only routes
 */
export const requireStudent = (req, res, next) => {
  if (!req.user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (req.user.role !== USER_ROLES.STUDENT) {
    return res.status(HTTP_STATUS.FORBIDDEN).json({
      success: false,
      message: 'Student access required'
    });
  }

  next();
};

/**
 * Middleware to allow both students and creators
 */
export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Authentication required'
    });
  }

  next();
};

export default { requireCreator, requireStudent, requireAuth };
