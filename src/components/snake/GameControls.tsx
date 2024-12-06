import React, { useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Direction } from './types';

interface GameControlsProps {
  direction: Direction;
  setDirection: (direction: Direction) => void;
  gameStarted: boolean;
  gameOver: boolean;
}

export function GameControls({
  direction,
  setDirection,
  gameStarted,
  gameOver,
}: GameControlsProps) {
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, setDirection, gameStarted, gameOver]);

  const controls = [
    { key: 'UP', icon: ArrowUp },
    { key: 'LEFT', icon: ArrowLeft },
    { key: 'DOWN', icon: ArrowDown },
    { key: 'RIGHT', icon: ArrowRight },
  ];

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 grid grid-cols-3 gap-2">
      {controls.map(({ key, icon: Icon }) => (
        <button
          key={key}
          className={`p-3 ${
            key === 'UP' ? 'col-start-2' : ''
          } bg-gray-700 rounded-lg text-white hover:bg-gray-600 disabled:opacity-50`}
          onClick={() => setDirection(key as Direction)}
          disabled={!gameStarted || gameOver}
        >
          <Icon size={24} />
        </button>
      ))}
    </div>
  );
}