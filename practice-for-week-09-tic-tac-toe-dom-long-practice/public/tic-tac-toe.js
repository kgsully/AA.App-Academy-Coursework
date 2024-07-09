// Your code here

// Variable Declarations:
let gameState = {
    tttGrid: [],
    isGameOver: false,
    winner: "",
    playerTurn: ""
};

function initGame() {
    console.clear();

    // Initialize event listeners
    const grid = document.getElementById("grid-container");
    grid.addEventListener("click", handleClick);

    const btnGiveUp = document.getElementById("btn-give-up");
    btnGiveUp.addEventListener("click", giveUp);

    const btnNewGame = document.getElementById("btn-new-game");
    btnNewGame.addEventListener("click", newGame);

    // Initialize Button States
    btnNewGame.disabled = true;
    btnGiveUp.disabled = false;

    // Clear and hide the winner text:
    const divWinner = document.getElementById("div-winner");
    divWinner.innerText = "Winner:";
    divWinner.style.visibility = "hidden";

    // Check for stored game state
    if (localStorage.getItem("ttt-game-state")) {
        console.log("Previous Game State Found - Loading Game State...")

        gameState = JSON.parse(localStorage.getItem("ttt-game-state"));
        console.log(`Current Player Turn: ${gameState.playerTurn}`);

        // Populate game board
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                if (gameState.tttGrid[i][j] !== " ") {
                    const targetCell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                    targetCell.innerHTML = `<img src="./img/player-${gameState.tttGrid[i][j].toLowerCase()}.svg" alt="${gameState.tttGrid[i][j]}">`
                    if (!gameState.isGameOver) targetCell.classList.remove("cell__hover-enabled");
                }
            }
        }

        // call the game over function if game is currently over
        if (gameState.isGameOver) gameOver(gameState.winner);

    } else {
        console.log("Initializing New Game...");

        gameState.isGameOver = false;
        gameState.winner = "";

        // clear the grid
        gameState.tttGrid = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
        ];
        console.log("Initializing Grid:", gameState.tttGrid);

        // clear all img children for all cells within the grid
        console.log("Clearing grid images...");
        const gridCells = document.querySelectorAll(".cell");
        gridCells.forEach(el => {
            if (!el.classList.contains("cell__hover-enabled")) {
                el.classList.add("cell__hover-enabled");
            }
            el.innerHTML = "";
        });

        // reset player turn to default and then call update function to set to the programmed default player turn
        gameState.playerTurn = "";
        updatePlayerTurn();
    }
}

function updatePlayerTurn() {
    switch(gameState.playerTurn) {
        case "X":
            gameState.playerTurn = "O";
            break;
        case "O":
            gameState.playerTurn = "X";
            break;
        default:
            gameState.playerTurn = "X";
            break;
    }
    console.log(`Current Player Turn: ${gameState.playerTurn}`);
}

function checkGrid() {
    let result;

    // Check Rows
    for(let i = 0; i < gameState.tttGrid.length; i++) {
        let testVal = gameState.tttGrid[i][0];
        if(gameState.tttGrid[i][0] !== ' ' && gameState.tttGrid[i][1] === testVal && gameState.tttGrid[i][2] === testVal) {
          result = testVal;
        }
      }

    // Check Columns
    for(let i = 0; i < gameState.tttGrid.length; i++) {
        let testVal = gameState.tttGrid[0][i];
        if(gameState.tttGrid[0][i] !== ' ' && gameState.tttGrid[1][i] === testVal && gameState.tttGrid[2][i] === testVal) {
            result = testVal;
        }
      }

    // Check Diagonals
    let diagTestVal = gameState.tttGrid[1][1];
    if (diagTestVal !== ' ') {
      if(diagTestVal === gameState.tttGrid[0][0] && diagTestVal === gameState.tttGrid[2][2]) {
        result = diagTestVal;
      } else if (diagTestVal === gameState.tttGrid[0][2] && diagTestVal === gameState.tttGrid[2][0]) {
        result = diagTestVal;
      }
    }

    // check Tie
    let tieCheck = gameState.tttGrid.map((el) => el.includes(' '));
    if(!tieCheck.includes(true)) {
        result = 'Tie';
    }

    if (result) {
        gameOver(result);
    }

}

function newGame() {
    localStorage.removeItem("ttt-game-state");
    initGame();
}

function giveUp() {
    updatePlayerTurn();
    gameOver(gameState.playerTurn);
}

function gameOver(result) {
    console.log(`Winner: ${result}`);
    gameState.isGameOver = true;
    gameState.winner = result;

    localStorage.setItem("ttt-game-state", JSON.stringify(gameState));

    // remove appropriate event listeners
    const grid = document.getElementById("grid-container");
    grid.removeEventListener("click", handleClick);

    // appropriately enable / disable buttons
    const btnGiveUp = document.getElementById("btn-give-up");
    btnGiveUp.disabled = true;

    const btnNewGame = document.getElementById("btn-new-game");
    btnNewGame.disabled = false;

    // remove hover effects from cells
    const gridCells = document.querySelectorAll(".cell");
    gridCells.forEach(el => {
        if (el.classList.contains("cell__hover-enabled")) {
            el.classList.remove("cell__hover-enabled");
        }
    });

    // Set winner text and set visibility property to visible
    const divWinner = document.getElementById("div-winner");
    divWinner.innerText = "Winner: " + result;
    divWinner.style.visibility = "visible";
}

function handleClick(event) {
    const cellRow = event.target.dataset.row;
    const cellCol = event.target.dataset.col;

    if (cellRow && cellCol) {
        console.log(`Selected Cell: ${cellRow}, ${cellCol}`);

        // enter player selection into array
        gameState.tttGrid[cellRow][cellCol] = gameState.playerTurn;
        console.log("Current Grid:", gameState.tttGrid);

        // handle display of appropriate image within selected cell
        event.target.innerHTML = `<img src="./img/player-${gameState.playerTurn.toLowerCase()}.svg" alt="${gameState.playerTurn}">`
        event.target.classList.remove("cell__hover-enabled");

        // check for win or tie
        checkGrid();

        // update the player turn for the next player
        updatePlayerTurn();

        localStorage.setItem("ttt-game-state", JSON.stringify(gameState));

    }
}

window.onload = initGame;
