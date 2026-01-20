import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Clerk session token
api.interceptors.request.use(
  async (config) => {
    try {
      // Get Clerk instance from window
      const clerk = window.Clerk;
      if (clerk?.session) {
        const token = await clerk.session.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Error getting Clerk token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User APIs
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  onboard: (data) => api.post('/user/onboard', data),
};

// Content APIs
export const contentAPI = {
  upload: (formData) => api.post('/content/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getRecommendations: (params) => api.get('/content/recommendations', { params }),
  getContent: (id) => api.get(`/content/${id}`),
  search: (query) => api.get('/content/search', { params: { q: query } }),
  unlock: (contentId) => api.post(`/content/${contentId}/unlock`),
};

// Exam APIs
export const examAPI = {
  predict: (formData) => api.post('/exam/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadSyllabus: (file) => {
    const formData = new FormData();
    formData.append('syllabus', file);
    return api.post('/exam/syllabus', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

// Wallet APIs
export const walletAPI = {
  getBalance: () => api.get('/wallet/balance'),
  getTransactions: () => api.get('/wallet/transactions'),
  transfer: (data) => api.post('/wallet/transfer', data),
};

// Analytics APIs
export const analyticsAPI = {
  getCreatorStats: () => api.get('/analytics/creator'),
  getContentViews: (contentId) => api.get(`/analytics/content/${contentId}`),
};

export default api;
