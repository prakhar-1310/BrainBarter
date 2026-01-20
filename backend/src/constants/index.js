export const TOKEN_DISTRIBUTION = {
  CREATOR_SHARE: parseFloat(process.env.CREATOR_SHARE) || 0.60,
  PLATFORM_SHARE: parseFloat(process.env.PLATFORM_SHARE) || 0.15,
  AI_POOL_SHARE: parseFloat(process.env.AI_POOL_SHARE) || 0.25
};

export const USER_ROLES = {
  STUDENT: 'student',
  CREATOR: 'creator',
  ADMIN: 'admin'
};

export const CONTENT_TYPES = {
  VIDEO: 'video',
  PDF: 'pdf',
  NOTES: 'notes'
};

export const DEFAULT_TOKEN_BALANCE = 100;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};
