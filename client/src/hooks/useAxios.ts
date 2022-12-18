import { useState, useEffect } from 'react';

import { getLeaderboard } from '../api/leaderboard';
import { TLeaderboard } from '../types/types';

export const useAxios = () => {
  const [board, setBoard] = useState<TLeaderboard[]>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const leaderboard = await getLeaderboard();
      setBoard(leaderboard);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { board, error, isLoading };
};
