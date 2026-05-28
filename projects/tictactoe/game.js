const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const AI_PRIORITY = [4, 0, 2, 6, 8, 1, 3, 5, 7];

let board = Array(9).fill(null);
let gameOver = false;
let winLine = null;

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');

function checkWinner() {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every(cell => cell !== null)) {
    return { winner: 'draw', line: null };
  }
  return null;
}

function aiMove() {
  for (const i of AI_PRIORITY) {
    if (board[i] === null) return i;
  }
  return -1;
}

function render() {
  boardEl.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('button');
    const value = board[i];
    cell.textContent = value || '';
    cell.className = 'cell';
    if (value === 'X') cell.classList.add('X');
    if (value === 'O') cell.classList.add('O');
    if (winLine && winLine.includes(i)) cell.classList.add('win');
    if (gameOver || value) cell.classList.add('disabled');
    cell.setAttribute('aria-label', `Cell ${i + 1}, ${value || 'empty'}`);
    cell.addEventListener('click', () => handleCellClick(i));
    boardEl.appendChild(cell);
  }
}

function handleCellClick(index) {
  if (gameOver) return;
  if (board[index] !== null) return;

  board[index] = 'X';
  render();

  const result = checkWinner();
  if (result) {
    handleGameOver(result);
    return;
  }

  statusEl.textContent = 'AI is thinking...';
  setTimeout(() => {
    if (gameOver) return;
    const move = aiMove();
    if (move === -1) return;
    board[move] = 'O';
    render();

    const aiResult = checkWinner();
    if (aiResult) {
      handleGameOver(aiResult);
    } else {
      statusEl.textContent = 'Your turn (X)';
    }
  }, 300);
}

function handleGameOver(result) {
  gameOver = true;
  if (result.winner === 'draw') {
    statusEl.textContent = 'Draw!';
  } else if (result.winner === 'X') {
    statusEl.textContent = 'You win! 🎉';
    winLine = result.line;
  } else {
    statusEl.textContent = 'AI wins. Try again!';
    winLine = result.line;
  }
  render();
}

function reset() {
  board = Array(9).fill(null);
  gameOver = false;
  winLine = null;
  statusEl.textContent = 'Your turn (X)';
  render();
}

resetBtn.addEventListener('click', reset);

// Initial render
render();