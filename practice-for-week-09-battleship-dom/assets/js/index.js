import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here

// wait until the DOM content has loaded before adding items / elements / events
window.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------------------------------------------
    // Generate board HTML & CSS
    // ------------------------------------------------------------------------------

    // create reset button
    const btnResetHTML = document.createElement('button');
    btnResetHTML.innerText = "Reset Game";
    btnResetHTML.id = "btn-reset";
    btnResetHTML.setAttribute("type", "button");
    document.body.appendChild(btnResetHTML);

    // create game over message header
    const gameOverH2 = document.createElement('h2');
    gameOverH2.innerText = "You Win!";
    gameOverH2.className = "game-over-msg";
    document.body.appendChild(gameOverH2);

    // create container div for grid
    console.log("Generating dynamic grid HTML");
    const boardGrid = document.createElement("div");
    boardGrid.id = "grid-container";

    // dynamically determine # of rows / cols to generate individual grid elements
    const numGridRows = board.grid.length;
    const numGridCols = board.grid[0].length;
    let gridStyleRows = "";
    let gridStyleCols = "";

    // dynamically generate individual grid elements based upon length of rows and colunns
    for(let i = 0; i < numGridRows; i++) {
        for (let j = 0; j < numGridCols; j++) {
            const position = document.createElement("div");
            position.classList.add("grid-element", "hover-enabled");
            position.setAttribute("data-row", i);
            position.setAttribute("data-col", j);
            boardGrid.appendChild(position);

            // only add positions for columns based upon length of 1st row. assume that all subsequente rows
            // have the same # of columns
            if (i === 0) {
                gridStyleCols += " 1fr";
            }
        }
        gridStyleRows += " 1fr"
    }

    // dynamically generate grid style for template rows / columns
    console.log("Generating dynamic grid styles")
    boardGrid.style.display = "grid";
    boardGrid.style.gridTemplateRows = gridStyleRows;
    boardGrid.style.gridTemplateColumns = gridStyleCols;
    boardGrid.style.width = `${((numGridRows + 1) * 3)}rem`;

    document.body.appendChild(boardGrid);

    // ------------------------------------------------------------------------------
    // Event Listeners
    // ------------------------------------------------------------------------------
    const grid = document.getElementById("grid-container");
    const btnReset = document.getElementById("btn-reset");
    const remainingGridElements = document.querySelectorAll(".grid-element");

    // callback to check whether the selected element is a hit or a miss (do not run the check if the target is not one of the elements)
    function checkSelection(event) {
        if (event.target.dataset.row && event.target.dataset.col) {

            console.log(`Player clicked on position: ${event.target.dataset.row}, ${event.target.dataset.col}`);

            let selection = board.makeHit(event.target.dataset.row, event.target.dataset.col);
            if (selection) {
                console.log("HIT!");
                event.target.innerText = selection;
                event.target.classList.remove("hover-enabled");
                event.target.classList.add("hit");
            } else {
                console.log("MISS!");
                event.target.classList.remove("hover-enabled");
                event.target.classList.add("miss");
            }
        }

        if (board.isGameOver()) {
            console.log("Game Over!");
            const gameOverMsg = document.querySelector(".game-over-msg");
            gameOverMsg.style.visibility = "visible";
            remainingGridElements.forEach(el => {
                el.classList.remove("hover-enabled");
            });
            grid.removeEventListener("click", checkSelection);

        }
    }

    // callback to reset the game board
    function resetGame() {
        console.clear();
        console.log("New Game:")
        board = new Board();
        console.log(board.grid);

        remainingGridElements.forEach(el => {
            el.classList = "grid-element hover-enabled"; // re-initialize class list for all grid elements
            el.innerText = "";
        });

        grid.addEventListener("click", checkSelection);
    }

    grid.addEventListener("click", checkSelection);     // grid element selection event listener
    btnReset.addEventListener("click", resetGame);      // reset button event listener

});
