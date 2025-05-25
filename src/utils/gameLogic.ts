/**
 * Calculates the winner of a tic-tac-toe game
 * @param squares - Array of 9 squares representing the game board
 * @returns The winning symbol (string) or null if no winner
 */
export function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * Checks if the game board is full (no more moves possible)
 * @param squares - Array of 9 squares representing the game board
 * @returns true if board is full, false otherwise
 */
export function isBoardFull(squares: (string | null)[]): boolean {
  return squares.every(square => square !== null);
}

/**
 * Checks if the game is over (either someone won or board is full)
 * @param squares - Array of 9 squares representing the game board
 * @returns true if game is over, false otherwise
 */
export function isGameOver(squares: (string | null)[]): boolean {
  return calculateWinner(squares) !== null || isBoardFull(squares);
} 