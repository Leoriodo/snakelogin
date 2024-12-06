import React, { useEffect, useRef, useState } from 'react';
import { useGameLogic } from './useGameLogic';
import { GameOverlay } from './GameOverlay';
import { GameGrid } from './GameGrid';
import { GameControls } from './GameControls';
import { addScore } from '../../lib/db';

interface SnakeGameProps {
  username: string;
}

export function SnakeGame({ username }: SnakeGameProps) {
  const [gameStarted, setGameStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    snake,
    food,
    direction,
    score,
    gameOver,
    setDirection,
    startGame,
    resetGame
  } = useGameLogic();

  useEffect(() => {
    if (gameOver && score > 0) {
      addScore(username, score);
    }
  }, [gameOver, score, username]);

  const handleStart = () => {
    setGameStarted(true);
    startGame();
  };

  const handleReset = () => {
    resetGame();
    setGameStarted(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-2xl aspect-square bg-gray-800 rounded-lg shadow-xl overflow-hidden"
    >
      {!gameStarted && !gameOver && (
        <GameOverlay onStart={handleStart} type="start" />
      )}
      
      {gameOver && (
        <GameOverlay onStart={handleReset} type="gameOver" score={score} />
      )}

      <GameGrid
        snake={snake}
        food={food}
        gameStarted={gameStarted}
        gameOver={gameOver}
      />

      <GameControls
        direction={direction}
        setDirection={setDirection}
        gameStarted={gameStarted}
        gameOver={gameOver}
      />
      
      <div className="absolute top-4 left-4 text-white text-xl font-bold">
        Score: {score}
      </div>
    </div>
  );
}