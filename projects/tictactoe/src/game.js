const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

const AI_PRIORITY = [4, 0, 2, 6, 8, 1, 3, 5, 7];

export function createBoard() {
  return Array(9).fill(null);
}

function cloneBoard(board) {
  return [...board];
}

export function makeMove(board, index, player) {
  if (index < 0 || index > 8) {
    return { ok: false, error: `Illegal move: index ${index} out of bounds` };
  }
  if (board[index] !== null) {
    return { ok: false, error: `Illegal move: cell ${index} occupied` };
  }
  const nextBoard = cloneBoard(board);
  nextBoard[index] = player;
  return { ok: true, board: nextBoard };
}

export function getEmptyCells(board) {
  const cells = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      cells.push(i);
    }
  }
  return cells;
}

export function checkWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

export function isDraw(board) {
  return getEmptyCells(board).length === 0 && checkWinner(board) === null;
}

export function isGameOver(board) {
  return checkWinner(board) !== null || isDraw(board);
}

export function aiMove(board) {
  for (const i of AI_PRIORITY) {
    if (board[i] === null) {
      return i;
    }
  }
  return -1;
}
