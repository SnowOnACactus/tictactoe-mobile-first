import React from 'react';

interface MobileHeaderProps {
  currentPlayer: string;
  currentColor: string;
  winner: string | null;
  gameOver: boolean;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

export function MobileHeader({ 
  currentPlayer, 
  currentColor, 
  winner, 
  gameOver, 
  onToggleDarkMode, 
  isDarkMode 
}: MobileHeaderProps) {
  return (
    <header className="mobile-header">
      <div className="header-content">
        <h1 className="game-title">Tic-Tac-Toe</h1>
        
        <div className="header-controls">
          <button 
            className="theme-toggle"
            onClick={onToggleDarkMode}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      
      <div className="game-status-bar">
        {winner ? (
          <div className="status-winner" style={{ color: currentColor }}>
            {winner} Wins! 🎉
          </div>
        ) : gameOver ? (
          <div className="status-tie">
            It's a Tie! 🤝
          </div>
        ) : (
          <div className="status-turn">
            <span style={{ color: currentColor }}>
              {currentPlayer}'s Turn
            </span>
          </div>
        )}
      </div>
    </header>
  );
} 