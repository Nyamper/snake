import { Schema } from 'mongoose';

import { modelMixIn } from '../utils/mixins';

import { TLeaderboard } from '../types/types';

const leaderboardSchema = new Schema<TLeaderboard>(
  {
    username: { type: String, required: true },
    time: { type: Number, required: true },
    score: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

export class Leaderboard extends modelMixIn<TLeaderboard>(
  'leaderboard',
  leaderboardSchema
) {
  async getBoard() {
    return await this.model.find({});
  }
}
