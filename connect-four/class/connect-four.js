const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    // Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);
    Screen.addCommand('left', 'move cursor left', ConnectFour.leftCommand.bind(this));
    Screen.addCommand('right', 'move cursor right', ConnectFour.rightCommand.bind(this));
    Screen.addCommand('space', 'drop token in current column', ConnectFour.dropCommand.bind(this));

    this.cursor.setBackgroundColor();
    Screen.setMessage(`Current Player Turn: ${this.playerTurn}`);
    Screen.render();
  }

  // Remove this
  // static testCommand() {
  //   console.log("TEST COMMAND");
  // }

  static leftCommand() {
    this.cursor.left();
    Screen.render();
  }

  static rightCommand() {
    this.cursor.right();
    Screen.render();
  }

  static dropCommand() {
    let droppedFlag = false;
    if (this.grid[this.cursor.row][this.cursor.col] === ' ') {
      for(let i = this.grid.length - 1; i >= 0; i--) {
        if(this.grid[i][this.cursor.col] === ' ' && !droppedFlag) {
          if (this.playerTurn === 'O') {
            Screen.setTextColor(i, this.cursor.col, "red");
          } else {
            Screen.setTextColor(i, this.cursor.col, "cyan");
          }
          Screen.setGrid(i, this.cursor.col, this.playerTurn);
          this.grid[i][this.cursor.col] = this.playerTurn;
          droppedFlag = true;

          // Check for Win
          let checkWinVal = ConnectFour.checkWin(this.grid);
          if(checkWinVal !== false) {
            this.cursor.resetBackgroundColor();
            ConnectFour.endGame(checkWinVal);
          }
        }
      }

      // Change Player Turn
      if (this.playerTurn === "O") {
        this.playerTurn = "X";
      } else {
        this.playerTurn = "O";
      }

      droppedFlag = false;
      Screen.setMessage(`Current Player Turn: ${this.playerTurn}`);
      Screen.render();
    }
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    // Check horizontal wins:
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length - 3; j++) {
        let testVal = grid[i][j];
        if(grid[i][j] !== ' ' && grid[i][j + 1] === testVal && grid[i][j + 2] === testVal && grid[i][j + 3] === testVal) {
          return testVal;
        }
      }
    }

    // Check vertical wins:
    for(let i = 0; i < grid[0].length; i++) {
      for(let j = 0; j < grid.length - 3; j++) {
        let testVal = grid[j][i];
        if(grid[j][i] !== ' ' && grid[j + 1][i] === testVal && grid[j + 2][i] === testVal && grid[j + 3][i] === testVal) {
          return testVal;
        }
      }
    }

    // check for downward diagonal wins:
    for(let i = 0; i < grid.length - 3; i++) {
      for(let j = 0; j < grid[i].length - 3; j++) {
        let testVal = grid[i][j];
        if(grid[i][j] !== ' ' && grid[i + 1][j + 1] === testVal && grid[i + 2][j + 2] === testVal && grid[i + 3][j + 3] === testVal) {
          return testVal;
        }
      }
    }

    // check for upward diagonal wins:
    for(let i = 0; i < grid.length - 3; i++) {
      for(let j = grid[i].length - 1; j >= 3; j--) {
        let testVal = grid[i][j];
        if(grid[i][j] !== ' ' && grid[i + 1][j - 1] === testVal && grid[i + 2][j - 2] === testVal && grid[i + 3][j - 3] === testVal) {
          return testVal;
        }
      }
    }

    // Check for Tie:
    let tieCheck = grid.map((el) => el.includes(' '));
    if(!tieCheck.includes(true)) {
      return 'T';
    }

    return false;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
