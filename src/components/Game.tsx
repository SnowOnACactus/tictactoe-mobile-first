import React, { useState } from 'react';
import { Board } from './Board';
import { HomeBase } from './HomeBase';
import { calculateWinner } from '../utils/gameLogic';

export function Game() {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xColor, setXColor] = useState('#ff4f4f');
  const [oColor, setOColor] = useState('#4f9eff');
  const [xSymbol, setXSymbol] = useState('X');
  const [oSymbol, setOSymbol] = useState('O');
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    // Check for winner after each move
    const winner = calculateWinner(nextSquares);
    if (winner) {
      if (winner === xSymbol) setXWins(prev => prev + 1);
      if (winner === oSymbol) setOWins(prev => prev + 1);
    }
  }

  function handleUndo() {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
  }

  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
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

  const winner = calculateWinner(currentSquares);

  return (
    <div className="app">
      <div className="game-container">
        <HomeBase
          player="X"
          position="left"
          currentColor={xColor}
          currentSymbol={xSymbol}
          wins={xWins}
          onColorChange={setXColor}
          onSymbolChange={handleXSymbolChange}
        />
        
        <div className="game">
          <Board 
            xIsNext={xIsNext} 
            squares={currentSquares} 
            onPlay={handlePlay}
            xSymbol={xSymbol}
            oSymbol={oSymbol}
            xColor={xColor}
            oColor={oColor}
          />
          <div className="game-info">
            <button className="control-btn" onClick={handleRestart}>Restart</button>
            <button className="control-btn" onClick={handleUndo}>Undo</button>
          </div>
        </div>

        <HomeBase
          player="O"
          position="right"
          currentColor={oColor}
          currentSymbol={oSymbol}
          wins={oWins}
          onColorChange={setOColor}
          onSymbolChange={handleOSymbolChange}
        />
      </div>

      {winner && (
        <div className="victory-banner">
          <span style={{ color: winner === xSymbol ? xColor : oColor }}>
            {winner} wins the game! 🎉
          </span>
          <button className="play-again-btn" onClick={handleRestart}>
            Play Again?
          </button>
        </div>
      )}
    </div>
  );
}

