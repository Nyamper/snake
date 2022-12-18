import { Leaderboard } from '../models/leaderboard.model';
import { TLeaderboard } from '../types/types';

class LeaderboardService {
  constructor(private leaderboard: Leaderboard = new Leaderboard()) {}
  public async getLeaderboard() {
    return await this.leaderboard.getBoard();
  }
  public async addToLeaderboard(player: TLeaderboard) {
    const newPlayer = new this.leaderboard.model(player);
    await newPlayer.save();
    return newPlayer;
  }
}

export default LeaderboardService;
