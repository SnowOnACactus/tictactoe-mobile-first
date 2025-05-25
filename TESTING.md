# Testing Guide for Tic-Tac-Toe

## 🧪 What We've Set Up

This project now includes comprehensive unit tests using **Vitest** - a fast, modern testing framework.

## 📁 Test Structure

```
src/
├── utils/
│   ├── gameLogic.ts          # Game logic functions
│   └── gameLogic.test.ts     # Unit tests for game logic
└── test/
    └── setup.ts              # Test configuration
```

## 🎯 What We're Testing

### `calculateWinner` Function
- ✅ Empty board (no winner)
- ✅ Partial game (no winner yet)
- ✅ All 8 winning combinations:
  - 3 rows (top, middle, bottom)
  - 3 columns (left, middle, right)  
  - 2 diagonals (main, anti)
- ✅ Custom symbols (🐱 vs 🐶)

### `isBoardFull` Function
- ✅ Empty board
- ✅ Partially filled board
- ✅ Completely filled board

### `isGameOver` Function
- ✅ Ongoing game
- ✅ Game with winner
- ✅ Tie game (board full, no winner)

## 🚀 Running Tests

```bash
# Run tests in watch mode (auto-rerun on changes)
npm test

# Run tests once and exit
npm run test:run

# Run tests with UI (if you want a visual interface)
npm run test:ui
```

## 📊 Test Results

All **17 tests** are currently passing! ✅

## 🎓 Key Testing Concepts Demonstrated

1. **AAA Pattern**: Arrange, Act, Assert
2. **Pure Function Testing**: Functions with no side effects
3. **Edge Case Coverage**: Empty boards, full boards, all win conditions
4. **Descriptive Test Names**: Clear what each test is checking
5. **Test Organization**: Grouped by function using `describe` blocks

## 🔍 Example Test Breakdown

```typescript
it('should detect winner in top row', () => {
  // Arrange - Set up test data
  const topRowWin = [
    'X', 'X', 'X',  // <- Winning row
    'O', 'O', null,
    null, null, null
  ]
  
  // Act - Call the function
  const result = calculateWinner(topRowWin)
  
  // Assert - Check the result
  expect(result).toBe('X')
})
```

## 💡 Why These Tests Matter

- **Catch Bugs Early**: Tests run automatically and catch issues before users do
- **Safe Refactoring**: Change code confidently knowing tests will catch breaks
- **Documentation**: Tests show exactly how functions should behave
- **Quality Assurance**: Ensures all game logic works correctly

## 🎯 Next Steps

Consider adding tests for:
- React components (when testing library is properly configured)
- User interactions (clicking squares, game flow)
- Edge cases (invalid moves, game state transitions) 