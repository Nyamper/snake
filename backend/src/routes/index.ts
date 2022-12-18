import express from 'express';

import leaderboard from './leaderboard.route';

const router = express.Router();

router.use('/leaderboard', leaderboard);

export default router;
