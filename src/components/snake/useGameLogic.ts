import { useState, useCallback, useEffect } from 'react';
import { Direction, Position } from './types';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const getRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

export function useGameLogic() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(getRandomPosition());
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const moveSnake = useCallback(() => {
    if (gameOver || !isRunning) return;

    setSnake(currentSnake => {
      const head = { ...currentSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return currentSnake;
      }

      // Check self collision
      if (currentSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return currentSnake;
      }

      const newSnake = [head];
      
      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood(getRandomPosition());
        newSnake.push(...currentSnake);
      } else {
        newSnake.push(...currentSnake.slice(0, -1));
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [moveSnake, isRunning]);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(getRandomPosition());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsRunning(true);
  }, []);

  const resetGame = useCallback(() => {
    setIsRunning(false);
    setGameOver(false);
    setScore(0);
    setSnake(INITIAL_SNAKE);
    setDirection('RIGHT');
    setFood(getRandomPosition());
  }, []);

  return {
    snake,
    food,
    direction,
    score,
    gameOver,
    setDirection,
    startGame,
    resetGame,
  };
}