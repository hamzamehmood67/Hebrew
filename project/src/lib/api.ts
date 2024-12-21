import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add request interceptor to attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface PracticeResult {
  type: 'speaking' | 'writing' | 'reading' | 'conversation';
  score: number;
  timeSpent: number;
  mistakes: string[];
  feedback?: string;
}

export const practiceApi = {
  submitResult: async (result: PracticeResult) => {
    const response = await api.post('/api/practice/submit', result);
    return response.data;
  },
  
  getProgress: async () => {
    const response = await api.get('/api/practice/progress');
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/api/practice/stats');
    return response.data;
  }
};

export default api;