import client from './client';
import { TLeaderboard } from '../types/types';

type PartialLeaderboard = Pick<TLeaderboard, 'username' | 'time' | 'score'>;

export const postLeaderboard = async (leaderboard: PartialLeaderboard) => {
  try {
    return await client.post<never, PartialLeaderboard>(
      '/leaderboard',
      leaderboard
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getLeaderboard = async () => {
  try {
    return await client.get<never, TLeaderboard[]>('/leaderboard');
  } catch (error) {
    return Promise.reject(error);
  }
};
