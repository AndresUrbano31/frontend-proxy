import { useState, useEffect, useCallback } from 'react';
import { aiService } from '../services/api';

export const useQuotaStatus = (userId = 'default-user') => {
  const [status, setStatus] = useState({
    tokensUsed: 0,
    tokensTotal: 1000,
    requestsRemaining: 5,
    plan: 'FREE',
    loading: true,
    error: null,
  });

  const [history, setHistory] = useState([]);

  const fetchStatus = useCallback(async () => {
    try {
      setStatus(prev => ({ ...prev, loading: true }));
      const response = await aiService.getQuotaStatus(userId);
      setStatus({
        ...response.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.warn('Backend not available, using mock data for status');
      // Mock data for demo purposes
      setStatus({
        tokensUsed: 450,
        tokensTotal: 1000,
        requestsRemaining: 3,
        plan: 'FREE',
        loading: false,
        error: null,
      });
    }
  }, [userId]);

  const fetchHistory = useCallback(async () => {
    try {
      const response = await aiService.getUsageHistory(userId);
      setHistory(response.data);
    } catch (err) {
      console.warn('Backend not available, using mock data for history');
      // Mock 7 days
      setHistory([
        { date: '2023-11-01', tokens: 120 },
        { date: '2023-11-02', tokens: 250 },
        { date: '2023-11-03', tokens: 180 },
        { date: '2023-11-04', tokens: 300 },
        { date: '2023-11-05', tokens: 420 },
        { date: '2023-11-06', tokens: 150 },
        { date: '2023-11-07', tokens: 380 },
      ]);
    }
  }, [userId]);

  useEffect(() => {
    fetchStatus();
    fetchHistory();
  }, [fetchStatus, fetchHistory]);

  return { status, history, refresh: () => { fetchStatus(); fetchHistory(); } };
};
