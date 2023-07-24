const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameEnded = false;

// Function to check if a player has won the game
function checkWin(player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some((pattern) => {
        return pattern.every((index) => gameBoard[index] === player);
    });
}

// Function to check if the game is a draw
function checkDraw() {
    return gameBoard.every((cell) => cell !== "");
}

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameBoard[index] === "" && !gameEnded) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            message.textContent = `Player ${currentPlayer} wins!`;
            gameEnded = true;
            restartButton.style.display = "block";
        } else if (checkDraw()) {
            message.textContent = "It's a draw!";
            gameEnded = true;
            restartButton.style.display = "block";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to restart the game
function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => (cell.textContent = ""));
    currentPlayer = "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
    gameEnded = false;
    restartButton.style.display = "none";
}

// Event listeners for cell clicks
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
