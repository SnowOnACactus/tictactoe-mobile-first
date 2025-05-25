import React, { useState } from 'react';

interface MobileSidebarProps {
  player: 'X' | 'O';
  position: 'left' | 'right';
  isOpen: boolean;
  currentColor: string;
  currentSymbol: string;
  wins: number;
  onColorChange: (color: string) => void;
  onSymbolChange: (symbol: string) => void;
  onClose: () => void;
}

const colorOptions = [
  '#ff4f4f', '#4f9eff', '#4fff4f', '#ffff4f', 
  '#ff4fff', '#4fffff', '#ff8c4f', '#8c4fff'
];

const symbolOptions = ['X', 'O', '🐱', '🐶', '⭐', '❤️', '🔥', '⚡', '🎯', '🚀'];

export function MobileSidebar({
  player,
  position,
  isOpen,
  currentColor,
  currentSymbol,
  wins,
  onColorChange,
  onSymbolChange,
  onClose
}: MobileSidebarProps) {
  const [activeTab, setActiveTab] = useState<'colors' | 'symbols' | 'stats'>('stats');

  const handleSymbolClick = (symbol: string) => {
    onSymbolChange(symbol);
  };

  const handleSidebarClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling to close the sidebar
  };

  return (
    <div 
      className={`mobile-sidebar ${position} ${isOpen ? 'open' : ''}`}
      onClick={handleSidebarClick}
    >
      <div className="sidebar-header">
        <h3 className="sidebar-title" style={{ color: currentColor }}>
          Player {player === 'X' ? '1' : '2'}
        </h3>
        <button className="sidebar-close" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="sidebar-tabs">
        <button 
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📊
        </button>
        <button 
          className={`tab ${activeTab === 'colors' ? 'active' : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          🎨
        </button>
        <button 
          className={`tab ${activeTab === 'symbols' ? 'active' : ''}`}
          onClick={() => setActiveTab('symbols')}
        >
          {player === 'X' ? 'X' : 'O'}
        </button>
      </div>

      <div className="sidebar-content">
        {activeTab === 'stats' && (
          <div className="stats-tab">
            <div className="current-symbol-display">
              <div 
                className="symbol-preview"
                style={{ color: currentColor }}
              >
                {currentSymbol}
              </div>
              <p>Current Symbol</p>
            </div>
            
            <div className="wins-display">
              <div className="wins-count" style={{ color: currentColor }}>
                {wins}
              </div>
              <p>Wins</p>
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="colors-tab">
            <p className="tab-label">Choose Color</p>
            <div className="color-grid">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  className={`color-option ${currentColor === color ? 'selected' : ''}`}
                  style={{ 
                    backgroundColor: color,
                    color: color
                  }}
                  onClick={() => onColorChange(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'symbols' && (
          <div className="symbols-tab">
            <p className="tab-label">Choose Symbol</p>
            <div className="symbol-grid">
              {symbolOptions.map((symbol) => (
                <button
                  key={symbol}
                  className={`symbol-option ${currentSymbol === symbol ? 'selected' : ''}`}
                  onClick={() => handleSymbolClick(symbol)}
                  style={{ color: currentSymbol === symbol ? currentColor : undefined }}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 