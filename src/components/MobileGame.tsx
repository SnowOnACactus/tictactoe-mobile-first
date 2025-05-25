import React, { useState, useEffect } from 'react';
import { Board } from './Board';
import { MobileSidebar } from './MobileSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileHeader } from './MobileHeader';
import { calculateWinner, isGameOver } from '../utils/gameLogic';
import '../styles/MobileGame.css';

export function MobileGame() {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xColor, setXColor] = useState('#ff4f4f');
  const [oColor, setOColor] = useState('#4f9eff');
  const [xSymbol, setXSymbol] = useState('X');
  const [oSymbol, setOSymbol] = useState('O');
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const gameOver = isGameOver(currentSquares);

  // Haptic feedback function
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (hapticEnabled && 'vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[type]);
    }
  };

  // Handle play with haptic feedback
  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
    triggerHaptic('light');

    // Check for winner after each move
    const winner = calculateWinner(nextSquares);
    if (winner) {
      if (winner === xSymbol) setXWins(prev => prev + 1);
      if (winner === oSymbol) setOWins(prev => prev + 1);
      triggerHaptic('heavy'); // Stronger feedback for win
    }
  }

  function handleUndo() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
      triggerHaptic('medium');
    }
  }

  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    triggerHaptic('medium');
  }

  function handleXSymbolChange(newSymbol: string) {
    setXSymbol(newSymbol);
    const updatedHistory = history.map(squares => 
      squares.map(square => square === xSymbol ? newSymbol : square)
    );
    setHistory(updatedHistory);
  }

  function handleOSymbolChange(newSymbol: string) {
    setOSymbol(newSymbol);
    const updatedHistory = history.map(squares => 
      squares.map(square => square === oSymbol ? newSymbol : square)
    );
    setHistory(updatedHistory);
  }

  // Close sidebars when clicking outside
  const closeSidebars = () => {
    setLeftSidebarOpen(false);
    setRightSidebarOpen(false);
  };

  // Swipe gesture handlers
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentMove > 0) {
      handleUndo(); // Swipe left to undo
    }
    if (isRightSwipe && gameOver) {
      handleRestart(); // Swipe right to restart when game is over
    }
  };

  return (
    <div className={`mobile-app ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <MobileHeader 
        currentPlayer={xIsNext ? xSymbol : oSymbol}
        currentColor={xIsNext ? xColor : oColor}
        winner={winner}
        gameOver={gameOver}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isDarkMode={isDarkMode}
      />

      {/* Main Game Area */}
      <main 
        className="mobile-main"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={closeSidebars}
      >
        {/* Left Sidebar */}
        <MobileSidebar
          player="X"
          position="left"
          isOpen={leftSidebarOpen}
          currentColor={xColor}
          currentSymbol={xSymbol}
          wins={xWins}
          onColorChange={setXColor}
          onSymbolChange={handleXSymbolChange}
          onClose={() => setLeftSidebarOpen(false)}
        />

        {/* Game Board */}
        <div className="mobile-game-container">
          <Board 
            xIsNext={xIsNext} 
            squares={currentSquares} 
            onPlay={handlePlay}
            xSymbol={xSymbol}
            oSymbol={oSymbol}
            xColor={xColor}
            oColor={oColor}
            isMobile={true}
          />
          
          {/* Game Status */}
          <div className="mobile-game-status">
            {!winner && !gameOver && (
              <div className="turn-indicator">
                <span style={{ color: xIsNext ? xColor : oColor }}>
                  {xIsNext ? xSymbol : oSymbol}'s Turn
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <MobileSidebar
          player="O"
          position="right"
          isOpen={rightSidebarOpen}
          currentColor={oColor}
          currentSymbol={oSymbol}
          wins={oWins}
          onColorChange={setOColor}
          onSymbolChange={handleOSymbolChange}
          onClose={() => setRightSidebarOpen(false)}
        />
      </main>

      {/* Bottom Navigation */}
      <MobileBottomNav
        onUndo={handleUndo}
        onRestart={handleRestart}
        onOpenLeftSidebar={() => setLeftSidebarOpen(true)}
        onOpenRightSidebar={() => setRightSidebarOpen(true)}
        canUndo={currentMove > 0}
        gameOver={gameOver}
        xSymbol={xSymbol}
        oSymbol={oSymbol}
        xColor={xColor}
        oColor={oColor}
      />

      {/* Overlay for sidebars */}
      {(leftSidebarOpen || rightSidebarOpen) && (
        <div className="sidebar-overlay" onClick={closeSidebars} />
      )}

      {/* Victory Overlay */}
      {(winner || gameOver) && (
        <div className="victory-overlay" onClick={handleRestart}>
          <div className="victory-message">
            {winner ? (
              <>
                <div 
                  className="victory-text"
                  style={{ color: winner === xSymbol ? xColor : oColor }}
                >
                  {winner === xSymbol ? 'Player 1' : 'Player 2'} Wins!
                </div>
                <div 
                  className="victory-emoji"
                  style={{ color: winner === xSymbol ? xColor : oColor }}
                >
                  {winner}
                </div>
                <div className="victory-subtext" style={{ fontSize: '1rem', marginTop: '30px', opacity: 0.7 }}>
                  Tap to play again
                </div>
              </>
            ) : (
              <>
                <div className="victory-text">
                  It's a Tie!
                </div>
                <div className="victory-emoji">🤝</div>
                <div className="victory-subtext">
                  Great game!
                </div>
                <div className="victory-subtext" style={{ fontSize: '1rem', marginTop: '30px', opacity: 0.7 }}>
                  Tap to play again
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 