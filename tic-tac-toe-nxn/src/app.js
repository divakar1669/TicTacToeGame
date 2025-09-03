const N = 3; // Change this value to set the size of the board (NxN)
let board = [];
let currentPlayer = 'X';
let gameActive = true;

const statusDisplay = document.querySelector('.status');
const gameContainer = document.querySelector('.game-container');

function initializeBoard() {
    board = Array.from(Array(N), () => Array(N).fill(''));
    gameContainer.innerHTML = '';
    for (let i = 0; i < N; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < N; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.cellIndex = `${i}-${j}`;
            cell.addEventListener('click', handleCellClick);
            row.appendChild(cell);
        }
        gameContainer.appendChild(row);
    }
    updateStatus();
}

function handleCellClick(event) {
    const cell = event.target;
    const [row, col] = cell.dataset.cellIndex.split('-').map(Number);

    if (board[row][col] !== '' || !gameActive) {
        return;
    }

    board[row][col] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinConditions();
}

function checkWinConditions() {
    const winConditions = [];

    // Rows
    for (let i = 0; i < N; i++) {
        winConditions.push(board[i]);
    }

    // Columns
    for (let j = 0; j < N; j++) {
        const column = [];
        for (let i = 0; i < N; i++) {
            column.push(board[i][j]);
        }
        winConditions.push(column);
    }

    // Diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < N; i++) {
        diagonal1.push(board[i][i]);
        diagonal2.push(board[i][N - 1 - i]);
    }
    winConditions.push(diagonal1);
    winConditions.push(diagonal2);

    for (const condition of winConditions) {
        if (condition.every(cell => cell === currentPlayer)) {
            gameActive = false;
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            return;
        }
    }

    if (board.flat().every(cell => cell !== '')) {
        gameActive = false;
        statusDisplay.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function updateStatus() {
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
});