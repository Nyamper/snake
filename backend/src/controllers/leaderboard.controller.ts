import { Request, Response } from 'express';

import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}
  async addUserToLeadderboard(req: Request, res: Response) {
    try {
      const player = await this.leaderboardService.addToLeaderboard(req.body);
      console.log(req.body);
      return res.status(200).json(player);
    } catch (error: any) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
  async getLeaderboard(req: Request, res: Response) {
    try {
      const leaderboard = await this.leaderboardService.getLeaderboard();
      return res.status(200).json(leaderboard);
    } catch (error: any) {
      return res.status(400).json(error);
      // return res.status(400).json({ message: 'error' });
    }
  }
}

export default LeaderboardController;
