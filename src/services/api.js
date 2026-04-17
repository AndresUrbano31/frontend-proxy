import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const aiService = {
  generateResponse: (prompt, userId = 'default-user') => 
    api.post('/api/generate', { prompt, userId }),
    
  getQuotaStatus: (userId = 'default-user') => 
    api.get(`/api/quota/status?userId=${userId}`),
    
  getUsageHistory: (userId = 'default-user') => 
    api.get(`/api/quota/history?userId=${userId}`),
    
  upgradePlan: (planType, userId = 'default-user') => 
    api.post('/api/quota/upgrade', { planType, userId }),
};

export default api;
