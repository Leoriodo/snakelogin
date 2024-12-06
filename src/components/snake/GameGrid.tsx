import React from 'react';
import { Position } from './types';

interface GameGridProps {
  snake: Position[];
  food: Position;
  gameStarted: boolean;
  gameOver: boolean;
}

export function GameGrid({ snake, food, gameStarted, gameOver }: GameGridProps) {
  const gridSize = 20;
  const cells = Array.from({ length: gridSize * gridSize });

  const isSnake = (index: number) => {
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);
    return snake.some(pos => pos.x === x && pos.y === y);
  };

  const isFood = (index: number) => {
    const x = index % gridSize;
    const y = Math.floor(index / gridSize);
    return food.x === x && food.y === y;
  };

  return (
    <div 
      className={`grid gap-px transition-opacity duration-200 ${
        (!gameStarted || gameOver) ? 'opacity-50' : 'opacity-100'
      }`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {cells.map((_, index) => (
        <div
          key={index}
          className={`aspect-square ${
            isSnake(index)
              ? 'bg-green-400'
              : isFood(index)
              ? 'bg-red-400'
              : 'bg-gray-700'
          } rounded-sm transition-colors duration-200`}
        />
      ))}
    </div>
  );
}