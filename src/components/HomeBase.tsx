import React, { useState } from 'react';

type HomeBaseProps = {
  player: 'X' | 'O';
  position: 'left' | 'right';
  currentColor: string;
  currentSymbol: string;
  wins: number;
  onColorChange: (color: string) => void;
  onSymbolChange: (symbol: string) => void;
}

export function HomeBase({ 
  player, 
  position, 
  currentColor, 
  currentSymbol,
  wins,
  onColorChange, 
  onSymbolChange 
}: HomeBaseProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempSymbol, setTempSymbol] = useState(currentSymbol);

  const colorOptions = [
    '#ff4f4f', // red
    '#4f9eff', // blue
    '#4fff4f', // green
    '#ff4fff', // purple
    '#ffff4f', // yellow
    '#ff9e4f'  // orange
  ];

  function renderTallyMarks(count: number) {
    const tallyGroups = Math.floor(count / 5);
    const remainingTallies = count % 5;
    
    return (
      <div className="tally-container" style={{ color: currentColor }}>
        {[...Array(tallyGroups)].map((_, i) => (
          <div key={i} className="tally-group">
	    <span className="tally">||||</span>
            <span className="tally-cross"></span>
 	  </div>
        ))}
        {remainingTallies > 0 && (
          <div className="tally-group">
            {'|'.repeat(remainingTallies)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`home-base home-base-${position}`}>
      <h2 className="home-base-title" style={{ color: currentColor }}>
        Player {currentSymbol}
      </h2>
      
      <div className="color-picker">
        <label>Choose Color:</label>
        <div className="color-options">
          {colorOptions.map((color) => (
            <button
              key={color}
              className={`color-option ${color === currentColor ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
        </div>
      </div>

      <div className="symbol-picker">
        <label>Choose Symbol:</label>
        {isEditing ? (
          <div className="symbol-edit">
            <input
              type="text"
              maxLength={2}
              value={tempSymbol}
              onChange={(e) => setTempSymbol(e.target.value)}
            />
            <button
              onClick={() => {
                if (tempSymbol.trim()) {
                  onSymbolChange(tempSymbol);
                  setIsEditing(false);
                }
              }}
            >
              ✓
            </button>
          </div>
        ) : (
          <button 
            className="current-symbol"
            onClick={() => setIsEditing(true)}
          >
            {currentSymbol}
          </button>
        )}
      </div>

      <div className="score-section">
        <h3>Wins</h3>
        {renderTallyMarks(wins)}
      </div>
    </div>
  );
}