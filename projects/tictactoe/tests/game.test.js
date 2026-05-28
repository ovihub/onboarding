import {
  createBoard,
  makeMove,
  checkWinner,
  isDraw,
  isGameOver,
  getEmptyCells,
  aiMove,
} from '../src/game.js';

describe('Board Creation', () => {
  test('creates flat array of 9 null cells', () => {
    const board = createBoard();
    expect(board.length).toBe(9);
    expect(board.every(cell => cell === null)).toBe(true);
  });
});

describe('Making Moves', () => {
  test('places player mark at given index', () => {
    const board = createBoard();
    const result = makeMove(board, 0, 'X');
    expect(result.ok).toBe(true);
    expect(result.board[0]).toBe('X');
    expect(board[0]).toBe(null); // original unchanged
  });

  test('rejects move on occupied cell', () => {
    const board = createBoard();
    const result1 = makeMove(board, 4, 'X');
    expect(result1.ok).toBe(true);
    const result2 = makeMove(result1.board, 4, 'O');
    expect(result2.ok).toBe(false);
    expect(result2.error).toBeDefined();
  });

  test('rejects move on out-of-bounds index', () => {
    const board = createBoard();
    expect(makeMove(board, -1, 'X').ok).toBe(false);
    expect(makeMove(board, 9, 'X').ok).toBe(false);
  });
});

describe('Win Detection', () => {
  const WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  test.each(WIN_LINES)('detects win for line %#', (a, b, c) => {
    const board = createBoard();
    board[a] = 'X';
    board[b] = 'X';
    board[c] = 'X';
    const result = checkWinner(board);
    expect(result.winner).toBe('X');
    expect(result.line).toEqual([a, b, c]);
  });

  test('returns null on empty board', () => {
    const board = createBoard();
    expect(checkWinner(board)).toBeNull();
  });

  test('returns null on incomplete line', () => {
    const board = createBoard();
    board[0] = 'X';
    board[1] = 'X';
    expect(checkWinner(board)).toBeNull();
  });

  test('detects O win', () => {
    const board = createBoard();
    board[0] = 'O';
    board[1] = 'O';
    board[2] = 'O';
    expect(checkWinner(board).winner).toBe('O');
  });
});

describe('Draw Detection', () => {
  test('detects draw when all cells filled with no winner', () => {
    const board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'];
    expect(isDraw(board)).toBe(true);
  });

  test('returns false when game ongoing', () => {
    const board = createBoard();
    board[0] = 'X';
    expect(isDraw(board)).toBe(false);
  });

  test('returns false when there is a winner', () => {
    const board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    expect(isDraw(board)).toBe(false);
  });
});

describe('Game Over Detection', () => {
  test('returns true when there is a winner', () => {
    const board = createBoard();
    board[0] = 'X';
    board[1] = 'X';
    board[2] = 'X';
    expect(isGameOver(board)).toBe(true);
  });

  test('returns true on draw', () => {
    const board = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'];
    expect(isGameOver(board)).toBe(true);
  });

  test('returns false when game ongoing', () => {
    const board = createBoard();
    board[0] = 'X';
    expect(isGameOver(board)).toBe(false);
  });
});

describe('Empty Cells', () => {
  test('returns all 9 indices on new board', () => {
    const board = createBoard();
    const empty = getEmptyCells(board);
    expect(empty.length).toBe(9);
    expect(empty).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  test('returns remaining indices after moves', () => {
    const board = createBoard();
    const result = makeMove(board, 4, 'X');
    const empty = getEmptyCells(result.board);
    expect(empty.length).toBe(8);
    expect(empty).not.toContain(4);
  });
});

describe('AI Move', () => {
  const PRIORITY = [4, 0, 2, 6, 8, 1, 3, 5, 7];

  test('chooses center (index 4) on empty board', () => {
    const board = createBoard();
    expect(aiMove(board)).toBe(4);
  });

  test('chooses first available corner if center taken', () => {
    const board = createBoard();
    board[4] = 'X';
    expect(aiMove(board)).toBe(0);
  });

  test('skips occupied corners, picks next available', () => {
    const board = createBoard();
    board[4] = 'X';
    board[0] = 'O';
    board[2] = 'X';
    expect(aiMove(board)).toBe(6);
  });

  test('picks edge when center and corners are taken', () => {
    const board = createBoard();
    board[4] = 'X';
    board[0] = 'O';
    board[2] = 'X';
    board[6] = 'O';
    board[8] = 'X';
    const move = aiMove(board);
    expect([1, 3, 5, 7]).toContain(move);
  });

  test('returns -1 when board is full', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    expect(aiMove(board)).toBe(-1);
  });

  test('follows exact priority order [4,0,2,6,8,1,3,5,7]', () => {
    const board = createBoard();
    // First call: center
    expect(aiMove(board)).toBe(4);
    board[4] = 'O';
    // Second call: first corner
    expect(aiMove(board)).toBe(0);
    board[0] = 'X';
    // Third call: second corner
    expect(aiMove(board)).toBe(2);
    board[2] = 'O';
    // Fourth call: third corner
    expect(aiMove(board)).toBe(6);
  });
});
