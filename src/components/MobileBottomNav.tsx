import React from 'react';

interface MobileBottomNavProps {
  onUndo: () => void;
  onRestart: () => void;
  onOpenLeftSidebar: () => void;
  onOpenRightSidebar: () => void;
  canUndo: boolean;
  gameOver: boolean;
  xSymbol: string;
  oSymbol: string;
  xColor: string;
  oColor: string;
}

export function MobileBottomNav({
  onUndo,
  onRestart,
  onOpenLeftSidebar,
  onOpenRightSidebar,
  canUndo,
  gameOver,
  xSymbol,
  oSymbol,
  xColor,
  oColor
}: MobileBottomNavProps) {
  return (
    <nav className="mobile-bottom-nav">
      <div className="nav-section player-section">
        <button 
          className="player-button left"
          onClick={onOpenLeftSidebar}
          style={{ borderColor: xColor }}
        >
          <span className="player-symbol" style={{ color: xColor }}>
            {xSymbol}
          </span>
          <span className="player-label">Player 1</span>
        </button>
      </div>

      <div className="nav-section controls-section">
        <button 
          className={`control-button undo ${!canUndo ? 'disabled' : ''}`}
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo last move (or swipe left)"
        >
          Undo
        </button>

        <button 
          className="control-button restart"
          onClick={onRestart}
          title={gameOver ? "New game (or swipe right)" : "Restart game"}
        >
          Restart
        </button>
      </div>

      <div className="nav-section player-section">
        <button 
          className="player-button right"
          onClick={onOpenRightSidebar}
          style={{ borderColor: oColor }}
        >
          <span className="player-symbol" style={{ color: oColor }}>
            {oSymbol}
          </span>
          <span className="player-label">Player 2</span>
        </button>
      </div>
    </nav>
  );
} 