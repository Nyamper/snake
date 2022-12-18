export type TLeaderboard = {
  _id: string;
  username: string;
  time: number;
  score: number;
  createdAt: string;
  updatedAt: string;
};

export type PartialLeaderboard = Pick<
  TLeaderboard,
  'username' | 'time' | 'score'
>;
