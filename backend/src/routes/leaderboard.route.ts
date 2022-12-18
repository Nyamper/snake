import express from 'express';

import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';

const router = express.Router();

const leaderboardController = new LeaderboardController(
  new LeaderboardService()
);

router.get(
  '/',
  leaderboardController.getLeaderboard.bind(leaderboardController)
);
router.post(
  '/',
  leaderboardController.addUserToLeadderboard.bind(leaderboardController)
);

export default router;
