"""
Integration tests for Tic-Tac-Toe game logic.
Tests full game scenarios end-to-end using the flat-array game engine via Node.js subprocess.
"""

import subprocess
import json
import os
import tempfile

_SRC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src'))

# Write a helper script once to a temp file
_NODE_SCRIPT = None


def _get_node_script():
    """Create a temp Node.js script that reads JSON from stdin and calls game engine."""
    global _NODE_SCRIPT
    if _NODE_SCRIPT is None:
        fd, _NODE_SCRIPT = tempfile.mkstemp(suffix='.mjs')
        script = f"""
import {{ createBoard, makeMove, checkWinner, isGameOver, aiMove, isDraw }} from '{_SRC_DIR.replace(os.sep, '/')}/game.js';
import {{ readFileSync }} from 'fs';

const raw = readFileSync(0, 'utf-8');
const input = JSON.parse(raw);
const board = input.board;
const action = input.action;

let result;
switch (action) {{
  case 'createBoard':
    result = {{ board: createBoard() }};
    break;
  case 'makeMove':
    result = makeMove([...board], input.index, input.player);
    break;
  case 'checkWinner':
    result = checkWinner(board);
    break;
  case 'aiMove':
    result = {{ index: aiMove(board) }};
    break;
  case 'isGameOver':
    result = {{ gameOver: isGameOver(board) }};
    break;
  case 'isDraw':
    result = {{ draw: isDraw(board) }};
    break;
  default:
    result = {{ error: 'Unknown action: ' + action }};
}}

console.log(JSON.stringify(result));
"""
        with open(fd, 'w') as f:
            f.write(script)
    return _NODE_SCRIPT


def _call(action, board=None, index=None, player=None):
    """Run a Node.js subprocess to call the JS game engine."""
    payload = {"action": action}
    if board is not None:
        payload["board"] = board
    if index is not None:
        payload["index"] = index
    if player is not None:
        payload["player"] = player

    payload_str = json.dumps(payload)

    result = subprocess.run(
        ["node", _get_node_script()],
        input=payload_str,
        capture_output=True, text=True, timeout=10
    )
    if result.returncode != 0:
        raise RuntimeError(f"Node error: {result.stderr}")
    return json.loads(result.stdout.strip())


class TestGamePlayIntegration:
    def test_complete_game_runs_to_completion(self):
        """Test a complete game with AI opponent that reaches game over."""
        board = _call('createBoard')['board']

        # Play 5 rounds of human+AI moves = 10 moves max (but game ends earlier)
        for _ in range(5):
            # Human: find first empty cell
            empty_idx = next(i for i in range(9) if board[i] is None)
            result = _call('makeMove', board=board, index=empty_idx, player='X')
            assert result['ok']
            board = result['board']

            if _call('isGameOver', board=board)['gameOver']:
                break

            # AI move
            ai_idx = _call('aiMove', board=board)['index']
            if ai_idx == -1:
                break
            result = _call('makeMove', board=board, index=ai_idx, player='O')
            assert result['ok']
            board = result['board']

            if _call('isGameOver', board=board)['gameOver']:
                break

        assert _call('isGameOver', board=board)['gameOver']

    def test_game_draw(self):
        """Test a specific draw scenario with no winning lines."""
        board = _call('createBoard')['board']

        # Classic draw board:
        # X O O
        # O X X
        # X X O
        draw_moves = [
            (0, 'X'), (1, 'O'), (2, 'O'),
            (3, 'O'), (4, 'X'), (5, 'X'),
            (6, 'X'), (7, 'X'), (8, 'O'),
        ]
        for idx, player in draw_moves:
            result = _call('makeMove', board=board, index=idx, player=player)
            assert result['ok'], f"Failed move at {idx} for {player}"
            board = result['board']

        assert _call('checkWinner', board=board) is None
        assert _call('isDraw', board=board)['draw']
        assert _call('isGameOver', board=board)['gameOver']

    def test_game_completes_within_max_moves(self):
        """Test that a game completes within 9 moves max."""
        board = _call('createBoard')['board']
        moves = 0
        current_player = 'X'

        while not _call('isGameOver', board=board)['gameOver'] and moves < 9:
            if current_player == 'X':
                idx = next(i for i in range(9) if board[i] is None)
            else:
                idx = _call('aiMove', board=board)['index']

            result = _call('makeMove', board=board, index=idx, player=current_player)
            if result['ok']:
                board = result['board']
                moves += 1
                current_player = 'O' if current_player == 'X' else 'X'

        assert _call('isGameOver', board=board)['gameOver']
        assert moves <= 9
