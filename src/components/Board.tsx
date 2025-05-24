import { Square } from './Square';

type BoardProps = {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
  xSymbol: string;
  oSymbol: string;
  xColor: string;
  oColor: string;
}

export function Board({ xIsNext, squares, onPlay, xSymbol, oSymbol, xColor, oColor }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? xSymbol : oSymbol;
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    const isXWinner = winner === xSymbol;
    status = (
      <span style={{ color: isXWinner ? xColor : oColor }}>
        Winner: {winner}
      </span>
    );
  } else if (squares.every(square => square)) {
    status = "Game is a draw!";
  } else {
    const currentSymbol = xIsNext ? xSymbol : oSymbol;
    const currentColor = xIsNext ? xColor : oColor;
    status = (
      <>
        Next player:{' '}
        <span style={{ color: currentColor }}>
          {currentSymbol}
        </span>
      </>
    );
  }

  const winningLine = getWinningLine(squares, xSymbol, oSymbol);
  let lineStyle = {};
  
  if (winningLine) {
    switch(winningLine.type) {
      case 'horizontal':
        lineStyle = {
          top: `${(winningLine.index * 33.33) + 16.67}%`,
          transform: 'translateY(-50%)'
        };
        break;
      case 'vertical':
        lineStyle = {
          left: `${(winningLine.index * 33.33) + 16.67}%`,
          transform: 'translateX(-50%)'
        };
        break;
      case 'diagonal-1':
        lineStyle = {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)'
        };
        break;
      case 'diagonal-2':
        lineStyle = {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-45deg)'
        };
        break;
    }
  }

  return (
    <div className="game-board">
      <div className="status">{status}</div>
      <div className="board">
        {winningLine && (
          <div 
            className={`winning-line ${winningLine.type}`}
            style={lineStyle}
          />
        )}
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              const value = squares[index];
              const color = value === xSymbol ? xColor : value === oSymbol ? oColor : undefined;
              return (
                <Square
                  key={index}
                  value={value}
                  onSquareClick={() => handleClick(index)}
                  style={{ color }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getWinningLine(squares: (string | null)[], xSymbol: string, oSymbol: string) {
  const lines = [
    { indices: [0, 1, 2], type: 'horizontal', index: 0 },
    { indices: [3, 4, 5], type: 'horizontal', index: 1 },
    { indices: [6, 7, 8], type: 'horizontal', index: 2 },
    { indices: [0, 3, 6], type: 'vertical', index: 0 },
    { indices: [1, 4, 7], type: 'vertical', index: 1 },
    { indices: [2, 5, 8], type: 'vertical', index: 2 },
    { indices: [0, 4, 8], type: 'diagonal-1', index: 0 },
    { indices: [2, 4, 6], type: 'diagonal-2', index: 0 }
  ];

  for (const line of lines) {
    const [a, b, c] = line.indices;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return line;
    }
  }
  return null;
}