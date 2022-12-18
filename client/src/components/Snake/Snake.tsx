import React, { useRef, useEffect, useState, KeyboardEvent } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useAxios } from '../../hooks/useAxios';

import Stats from './Stats';
import Leaderboard from './Leaderboard';
import StartScreen from './StartScreen';

import { postLeaderboard } from '../../api/leaderboard';

import { random, calcTime } from '../../utils/utils';
import { initialState, Keys } from '../../constants';

import { TLeaderboard } from '../../types/types';

import { Box } from '@mui/material';

const Snake: React.FC<{}> = () => {
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: true,
  });
  const {
    canvasScale,
    canvasWidth,
    canvasHeight,
    initialSnake,
    speedUpStep,
    pointsToSpeedUp,
    initialSpeed,
  } = initialState;
  const [gameStart, setGameStart] = useState(initialState.gameStart);
  const [alive, setAlive] = useState(initialState.alive);
  const [currentDirection, setCurrentDirection] = useState<String>(Keys.Right);
  const [food, setFood] = useState(initialState.food[0]);
  const [snake, setSnake] = useState(initialSnake);
  const [score, setScore] = useState(initialState.score);
  const [speed, setSpeed] = useState(initialSpeed);
  const [username, setUsername] = useState<string>('');
  // const { board, isError, isLoading } = useAxiosGet();

  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current;

      ctx!.setTransform(canvasScale, 0, 0, canvasScale, 0, 0);

      ctx!.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx!.fillStyle = 'green'; //snake
      if (snake) {
        snake.forEach(({ x, y }) => ctx!.fillRect(x, y, 1, 1)); //snake
      }

      ctx!.fillStyle = food.color; //food
      ctx!.fillRect(food.x, food.y, 1, 1); //food

      setTimeout(() => {
        handleGame();
      }, speed);
    }
  }, [snake, gameStart]);

  const handleKeys = (event: KeyboardEvent) => {
    const { key } = event;
    if (Object.values<string>(Keys).includes(key)) {
      handlePossibleDirections(key);
    }
  };

  const handlePossibleDirections = (key: string) => {
    if (
      (key === Keys.Up && currentDirection === Keys.Down) ||
      (key === Keys.Down && currentDirection === Keys.Up) ||
      (key === Keys.Left && currentDirection === Keys.Right) ||
      (key === Keys.Right && currentDirection === Keys.Left)
    ) {
      return;
    } else {
      setCurrentDirection(key);
    }
  };

  const handleMove = () => {
    const newSnake = [...snake];

    for (let i = newSnake.length - 1; i > 0; i--) {
      newSnake[i].x = newSnake[i - 1].x;
      newSnake[i].y = newSnake[i - 1].y;
    }

    if (currentDirection === Keys.Right) {
      newSnake[0].x += 1;
    }
    if (currentDirection === Keys.Down) {
      newSnake[0].y += 1;
    }
    if (currentDirection === Keys.Left) {
      newSnake[0].x -= 1;
    }
    if (currentDirection === Keys.Up) {
      newSnake[0].y -= 1;
    }
    setSnake(newSnake);
  };

  const handleGameStart = (name: string) => {
    setGameStart(true);
    setUsername(name);
  };

  const handlePlayGame = () => {
    handleMove();
    if (checkCollisions()) {
      setAlive(false);
      setGameStart(false);
      handleGameEnd();
    }
  };

  const handleGamePause = () => {
    setGameStart((prev) => !prev);
    gameStart ? pause() : start();
  };

  const handleGameEnd = () => {
    const stats = {
      username,
      time: calcTime(hours, minutes, seconds),
      score,
    };
    sendStatistic(stats);
  };

  const bodyCollision = () => {
    const beheadedSnake = snake;
    const head = beheadedSnake.shift();
    const collision = beheadedSnake.some(
      (element) => element.x === head!.x && element.y === head!.y
    );

    if (collision) {
      return true;
    }
  };

  const wallCollision = () => {
    const head = snake[0];
    if (
      head.x >= 0 &&
      head.y >= 0 &&
      head.x < canvasWidth / canvasScale &&
      head.y < canvasHeight / canvasScale
    ) {
    } else {
      return true;
    }
  };

  const foodCollision = () => {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
      const addTail = [...snake];
      addTail.push({ x: food.x, y: food.y });
      setFood(generateFood());
      setSnake(addTail);
      setScore((prev) => prev + food.points);
      calcSpeed();
    }
  };

  const generateFood = () => {
    const food = initialState.food[random(initialState.food.length)];
    food.x = random(canvasWidth / canvasScale);
    food.y = random(canvasHeight / canvasScale);
    return food;
  };

  const calcSpeed = () => {
    const newSpeed =
      initialSpeed - Math.floor(score / pointsToSpeedUp) * speedUpStep;
    if (newSpeed) {
      setSpeed(newSpeed);
    }
  };

  const checkCollisions = () => {
    foodCollision();
    return wallCollision() || bodyCollision() ? true : false;
  };

  const handleGame = () => {
    if (gameStart && alive) {
      handlePlayGame();
    }
  };

  const sendStatistic = (
    stats: Pick<TLeaderboard, 'username' | 'time' | 'score'>
  ) => {
    console.log('first');
    postLeaderboard(stats);
  };

  return (
    <>
      {!gameStart && alive && !username && (
        <StartScreen handleGameStart={handleGameStart} />
      )}
      {!gameStart && !alive && <Leaderboard />}
      {username && alive && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          tabIndex={0}
          onKeyDown={(event: KeyboardEvent) => handleKeys(event)}
        >
          <Stats
            score={score}
            gameStart={gameStart}
            time={{ seconds, minutes, hours }}
            handleGamePause={handleGamePause}
          />
          <canvas
            ref={canvasRef}
            style={{ border: '3px solid black' }}
            width={canvasWidth}
            height={canvasHeight}
          ></canvas>
          <button onClick={handleGameEnd}>send stats</button>
        </Box>
      )}
    </>
  );
};

export default Snake;