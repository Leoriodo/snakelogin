import React from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface GameOverlayProps {
  type: 'start' | 'gameOver';
  score?: number;
  onStart: () => void;
}

export function GameOverlay({ type, score, onStart }: GameOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center z-10">
      {type === 'start' ? (
        <>
          <h2 className="text-4xl font-bold text-white mb-8">Snake Game</h2>
          <p className="text-gray-300 mb-8">Use arrow keys or on-screen controls to play</p>
        </>
      ) : (
        <>
          <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
          <p className="text-2xl text-gray-300 mb-8">Final Score: {score}</p>
        </>
      )}
      
      <button
        onClick={onStart}
        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        {type === 'start' ? (
          <>
            <Play size={24} />
            Start Game
          </>
        ) : (
          <>
            <RotateCcw size={24} />
            Play Again
          </>
        )}
      </button>
    </div>
  );
}