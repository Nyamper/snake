export const initialState = {
  gameStart: false,
  alive: true,
  initialSpeed: 200,
  pointsToSpeedUp: 50,
  speedUpStep: 10,
  canvasScale: 20,
  canvasWidth: 500,
  canvasHeight: 500,
  score: 0,
  time: 0,
  food: [
    { name: 'common', color: 'grey', points: 1, x: 5, y: 5 },
    { name: 'rare', color: 'blue', points: 5, x: 5, y: 5 },
    { name: 'mythical', color: 'purple', points: 10, x: 5, y: 5 },
  ],
  initialSnake: [
    { x: 10, y: 12 },
    { x: 9, y: 12 },
    { x: 8, y: 12 },
  ],
};

export enum Keys {
  Up = 'ArrowUp',
  Right = 'ArrowRight',
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
}
