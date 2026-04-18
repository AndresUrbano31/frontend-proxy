import axios from 'axios';

const USER_EMAIL = 'user@example.com';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

export const aiService = {
  generateResponse: (prompt) =>
    api.post('/api/ai/generate', { prompt }),

  getQuotaStatus: (email = USER_EMAIL) =>
    api.get(`/api/ai/user/${email}/quota`),

  getUsageHistory: (email = USER_EMAIL) =>
    api.get(`/api/admin/users/${email}/usage`),

  upgradePlan: (newPlanName, email = USER_EMAIL) =>
    api.put(`/api/admin/users/${email}/upgrade`, { newPlanName }),
};

export default api;
