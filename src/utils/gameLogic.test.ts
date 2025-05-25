import { describe, it, expect } from 'vitest'
import { calculateWinner, isBoardFull, isGameOver } from './gameLogic'

describe('calculateWinner', () => {
  // Test case 1: No winner (empty board)
  it('should return null for an empty board', () => {
    // Arrange
    const emptyBoard = Array(9).fill(null)
    
    // Act
    const result = calculateWinner(emptyBoard)
    
    // Assert
    expect(result).toBe(null)
  })

  // Test case 2: No winner (partial game)
  it('should return null when no winning combination exists', () => {
    // Arrange
    const partialBoard = [
      'X', 'O', 'X',
      'O', 'X', 'O', 
      'O', 'X', null
    ]
    
    // Act
    const result = calculateWinner(partialBoard)
    
    // Assert
    expect(result).toBe(null)
  })

  // Test case 3: Top row winner
  it('should detect winner in top row', () => {
    // Arrange
    const topRowWin = [
      'X', 'X', 'X',  // <- Winning row
      'O', 'O', null,
      null, null, null
    ]
    
    // Act
    const result = calculateWinner(topRowWin)
    
    // Assert
    expect(result).toBe('X')
  })

  // Test case 4: Middle row winner
  it('should detect winner in middle row', () => {
    // Arrange
    const middleRowWin = [
      'X', 'O', 'X',
      'O', 'O', 'O',  // <- Winning row
      'X', null, null
    ]
    
    // Act
    const result = calculateWinner(middleRowWin)
    
    // Assert
    expect(result).toBe('O')
  })

  // Test case 5: Bottom row winner
  it('should detect winner in bottom row', () => {
    // Arrange
    const bottomRowWin = [
      'O', 'X', 'O',
      'X', 'O', 'X',
      'X', 'X', 'X'   // <- Winning row
    ]
    
    // Act
    const result = calculateWinner(bottomRowWin)
    
    // Assert
    expect(result).toBe('X')
  })

  // Test case 6: Left column winner
  it('should detect winner in left column', () => {
    // Arrange
    const leftColumnWin = [
      'O', 'X', 'X',  // O
      'O', 'X', null, // O <- Winning column
      'O', null, 'X'  // O
    ]
    
    // Act
    const result = calculateWinner(leftColumnWin)
    
    // Assert
    expect(result).toBe('O')
  })

  // Test case 7: Middle column winner
  it('should detect winner in middle column', () => {
    // Arrange
    const middleColumnWin = [
      'X', 'O', 'X',
      null, 'O', 'X',  // <- Winning column (middle)
      'X', 'O', null
    ]
    
    // Act
    const result = calculateWinner(middleColumnWin)
    
    // Assert
    expect(result).toBe('O')
  })

  // Test case 8: Right column winner
  it('should detect winner in right column', () => {
    // Arrange
    const rightColumnWin = [
      'O', 'X', 'X',  //     X
      'O', null, 'X', //     X <- Winning column
      null, 'O', 'X'  //     X
    ]
    
    // Act
    const result = calculateWinner(rightColumnWin)
    
    // Assert
    expect(result).toBe('X')
  })

  // Test case 9: Diagonal winner (top-left to bottom-right)
  it('should detect winner in main diagonal', () => {
    // Arrange
    const mainDiagonalWin = [
      'X', 'O', 'O',  // X
      'O', 'X', null, //   X <- Winning diagonal
      null, 'O', 'X'  //     X
    ]
    
    // Act
    const result = calculateWinner(mainDiagonalWin)
    
    // Assert
    expect(result).toBe('X')
  })

  // Test case 10: Diagonal winner (top-right to bottom-left)
  it('should detect winner in anti-diagonal', () => {
    // Arrange
    const antiDiagonalWin = [
      'X', 'X', 'O',  //     O
      'X', 'O', null, //   O   <- Winning diagonal
      'O', null, 'X'  // O
    ]
    
    // Act
    const result = calculateWinner(antiDiagonalWin)
    
    // Assert
    expect(result).toBe('O')
  })

  // Test case 11: Custom symbols
  it('should work with custom symbols', () => {
    // Arrange
    const customSymbolWin = [
      '🐱', '🐶', '🐱',
      '🐶', '🐱', '🐶',
      '🐱', '🐶', '🐱'  // 🐱 wins diagonally
    ]
    
    // Act
    const result = calculateWinner(customSymbolWin)
    
    // Assert
    expect(result).toBe('🐱')
  })
})

describe('isBoardFull', () => {
  it('should return false for empty board', () => {
    // Arrange
    const emptyBoard = Array(9).fill(null)
    
    // Act
    const result = isBoardFull(emptyBoard)
    
    // Assert
    expect(result).toBe(false)
  })

  it('should return false for partially filled board', () => {
    // Arrange
    const partialBoard = ['X', 'O', 'X', null, 'O', null, 'X', null, 'O']
    
    // Act
    const result = isBoardFull(partialBoard)
    
    // Assert
    expect(result).toBe(false)
  })

  it('should return true for completely filled board', () => {
    // Arrange
    const fullBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']
    
    // Act
    const result = isBoardFull(fullBoard)
    
    // Assert
    expect(result).toBe(true)
  })
})

describe('isGameOver', () => {
  it('should return false for ongoing game', () => {
    // Arrange
    const ongoingGame = ['X', 'O', null, null, 'X', null, null, null, 'O']
    
    // Act
    const result = isGameOver(ongoingGame)
    
    // Assert
    expect(result).toBe(false)
  })

  it('should return true when there is a winner', () => {
    // Arrange
    const gameWithWinner = ['X', 'X', 'X', 'O', 'O', null, null, null, null]
    
    // Act
    const result = isGameOver(gameWithWinner)
    
    // Assert
    expect(result).toBe(true)
  })

  it('should return true when board is full (tie game)', () => {
    // Arrange
    const tieGame = ['X', 'O', 'X', 'O', 'O', 'X', 'O', 'X', 'O']
    
    // Act
    const result = isGameOver(tieGame)
    
    // Assert
    expect(result).toBe(true)
  })
}) 