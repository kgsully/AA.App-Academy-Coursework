const Screen = require("./screen");
const Cursor = require("./cursor");

// 🥝 🍓 🥥 🍇 🍊 🍋

class Bejeweled {

  constructor() {

    // declare empty 8 x 8 grid
    this.grid = [[' ',' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ',' ']];

    this.jewelArray = ['🥝', '🍓', '🥥', '🍇', '🍊', '🍋'];

    this.cursor = new Cursor(8, 8);
    this.swapPos = [];


    Screen.initialize(8, 8);
    Screen.setGridlines(false);

    Bejeweled.gridInitialize.call(this, this.grid, this.jewelArray);

    // command bindings
    Screen.addCommand('up', 'move cursor up', Bejeweled.upCommand.bind(this));
    Screen.addCommand('down', 'move cursor down', Bejeweled.downCommand.bind(this));
    Screen.addCommand('left', 'move cursor left', Bejeweled.leftCommand.bind(this));
    Screen.addCommand('right', 'move cursor right', Bejeweled.rightCommand.bind(this));
    Screen.addCommand('space', 'make selection', Bejeweled.swapCommand.bind(this));

    this.cursor.setBackgroundColor();

    Screen.render();

  }

  static updateScreen(grid) {
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        Screen.setGrid(i, j, grid[i][j]);
      }
    }
  }

  static getRandJewel (jewelArray) {
    const maxFloored = Math.floor(jewelArray.length - 1);
    return Math.floor(Math.random() * (maxFloored - 0 + 1) + 0);
  }

  static gridInitialize(grid, jewelArray) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        let randNum = Bejeweled.getRandJewel(jewelArray);
        grid[i][j] = jewelArray[randNum];
        // Screen.setGrid(i, j, jewelArray[randNum]);
      }
    }

    Bejeweled.updateScreen(grid);

    let matches = Bejeweled.checkForMatches.call(this, grid);
    if (matches.length > 0) {
      Bejeweled.handleMatches.call(this, grid, matches);
    }
  }

  // static methods for commands
  static upCommand() {

    if(this.swapPos.length < 1 || (this.cursor.col === this.swapPos[0][1] && this.cursor.row >= this.swapPos[0][0])) {
      this.cursor.up();
      if (this.swapPos.length !== 0) {
        Screen.setBackgroundColor(this.swapPos[0][0], this.swapPos[0][1],'cyan');
      }
      Screen.render();
    }
  }

  static downCommand() {
    if(this.swapPos.length < 1 || (this.cursor.col === this.swapPos[0][1] && this.cursor.row <= this.swapPos[0][0])) {
      this.cursor.down();
      if (this.swapPos.length !== 0) {
        Screen.setBackgroundColor(this.swapPos[0][0], this.swapPos[0][1],'cyan');
      }
      Screen.render();
    }
  }

  static leftCommand() {
    if(this.swapPos.length < 1 || (this.cursor.row === this.swapPos[0][0] && this.cursor.col >= this.swapPos[0][1])) {
      this.cursor.left();
      if (this.swapPos.length !== 0) {
        Screen.setBackgroundColor(this.swapPos[0][0], this.swapPos[0][1],'cyan');
      }
      Screen.render();
    }
  }

  static rightCommand() {
    if(this.swapPos.length < 1 || (this.cursor.row === this.swapPos[0][0] && this.cursor.col <= this.swapPos[0][1])) {
      this.cursor.right();
      if (this.swapPos.length !== 0) {
        Screen.setBackgroundColor(this.swapPos[0][0], this.swapPos[0][1],'cyan');
      }
      Screen.render();
    }
  }

  static swapCommand() {
    let matches = [];

    if(this.swapPos.length < 1) {                             // initial selection

      this.swapPos.push([this.cursor.row, this.cursor.col]);
      // Screen.setMessage(`${this.swapPos}   ${this.grid[this.swapPos[0][0]][this.swapPos[0][1]]}`);
      this.cursor.cursorColor = 'magenta';
      this.cursor.setBackgroundColor();

    } else if (this.swapPos.length > 0 && this.cursor.row === this.swapPos[0][0] && this.cursor.col === this.swapPos[0][1]) { // cancel selection by selecting currently selected cell

      this.swapPos = [];
      // Screen.setMessage(this.swapPos);
      this.cursor.cursorColor = 'white';
      this.cursor.setBackgroundColor();

    } else if (!Bejeweled.checkValidSwap.call(this, this.swapPos)) {
      Screen.setBackgroundColor(this.swapPos[0][0], this.swapPos[0][1], 'black');

      this.swapPos = [];
      // Screen.setMessage(this.swapPos);
      this.cursor.cursorColor = 'red';
      this.cursor.setBackgroundColor();

    } else {

      let swapBuffer = this.grid[this.swapPos[0][0]][this.swapPos[0][1]];

      // Screen.grid[this.swapPos[0][0]][this.swapPos[0][1]] = Screen.grid[this.cursor.row][this.cursor.col];
      this.grid[this.swapPos[0][0]][this.swapPos[0][1]] = this.grid[this.cursor.row][this.cursor.col];

      // Screen.grid[this.cursor.row][this.cursor.col] = swapBuffer;
      this.grid[this.cursor.row][this.cursor.col] = swapBuffer;

      Bejeweled.updateScreen(this.grid);

      Screen.setBackgroundColor(this.swapPos[0][0], this.swapPos[0][1], 'black');

      this.swapPos = [];

      // Screen.setMessage('');
      this.cursor.cursorColor = 'white';
      this.cursor.setBackgroundColor();

      matches = Bejeweled.checkForMatches(this.grid);
      if (matches.length > 0) {
        Bejeweled.handleMatches.call(this, this.grid, matches);
      }
    }

    Screen.render();
  }

  static checkValidSwap(swapPos) {
    // buffer the initially selected item
    let swapBuff = this.grid[swapPos[0][0]][swapPos[0][1]];

    // generate 1D array for row and column replacing the 2nd selected item with the buffered item
    let swapRow = this.grid[this.cursor.row];
    swapRow[swapPos[0][1]] = swapBuff;

    let swapCol = [];
    for (let i = 0; i < this.grid.length; i++) {
      if(i === swapPos[0][1]) {
        swapCol.push(swapBuff);
      } else {
        swapCol.push(this.grid[i][this.cursor.col]);
      }
    }

    Screen.setMessage(`${swapPos}   /   ${swapBuff}   /   ${swapRow}   /   ${swapCol}`);

    // check whether it generates 3 in a row across row / column
    for (let i = 0; i < swapRow.length - 2; i++) {
      if (swapRow[i] === swapRow[i + 1] && swapRow[i] === swapRow[i + 2]) {
        return true;
      }
    }

    // check whether it generates 3 in a row across row / column
    for (let i = 0; i < swapRow.length - 2; i++) {
      if (swapCol[i] === swapCol[i + 1] && swapCol[i] === swapCol[i + 2]) {
        return true;
      }
    }

    // // VERTICAL SWAPS (checking for validitiy across the row)
    // // check valid vertical swap in left direction
    // if (this.cursor.row !== swapPos[0][0]){
    //   if (this.cursor.col >= 2) {
    //     if(this.grid[this.cursor.row][this.cursor.col - 2] === swapBuff && this.grid[this.cursor.row][this.cursor.col - 1] === swapBuff) {
    //     return true;
    //     }
    //   }

    //   // check valid vertical swap in both directions
    //   if(this.cursor.col >= 1 && this.cursor.col <=6) {
    //     if (this.grid[this.cursor.row][this.cursor.col - 1] === swapBuff && this.grid[this.cursor.row][this.cursor.col + 1] === swapBuff) {
    //       return true;
    //     }
    //   }

    //   // check valid vertical swap in right direction
    //   if (this.cursor.col <= 5) {
    //     if (this.grid[this.cursor.row][this.cursor.col + 1] === swapBuff && this.grid[this.cursor.row][this.cursor.col + 2] === swapBuff) {
    //       return true;
    //     }
    //   }
    // }

    // // HORIZONTAL SWAPS (checking for validitiy across the column)
    // // check valid vertical swap in up direction
    // if (this.cursor.col !== swapPos[0][1]){
    //   if(this.cursor.row >= 2){
    //     if (this.grid[this.cursor.row - 2][this.cursor.col] === swapBuff && this.grid[this.cursor.row - 1][this.cursor.col] === swapBuff) {
    //       return true;
    //     }
    //   }

    //   // check valid vertical swap in both directions
    //   if(this.cursor.row >= 1 && this.cursor.row <=6) {
    //     if (this.grid[this.cursor.row - 1][this.cursor.col] === swapBuff && this.grid[this.cursor.row + 1][this.cursor.col] === swapBuff) {
    //       return true;
    //     }
    //   }

    //   // check valid vertical swap in right direction
    //   if (this.cursor.row <= 5){
    //     if (this.grid[this.cursor.row + 1][this.cursor.col] === swapBuff && this.grid[this.cursor.row + 2][this.cursor.col] === swapBuff) {
    //       return true;
    //     }
    //   }
    // }

    return false;

  }

  // Static method for determining matches within the grid
  static checkForMatches(grid) {

    // Check for horizontal matches
    for(let i = 0; i < grid.length; i++) {          // rows is outer loop
      let scratchArray = [];                        // clear / initialize the scratchArray with each row checked
      for(let j = 1; j < grid[i].length; j++) {     // columns is inner loop

        if(grid[i][j] === grid[i][j - 1]) {
          if (scratchArray.length === 0) {
            scratchArray.push([i, j - 1]);
          }
          scratchArray.push([i, j]);
          if (j === grid[i].length -1 && scratchArray.length >= 3){
            return scratchArray;
          }
        } else if ((grid[i][j] !== grid[i][j - 1]) && scratchArray.length >= 3) {
          return scratchArray;
        } else {
          scratchArray = [];
        }

      }
    }

    // Check for vertical matches
    for(let i = 0; i < grid[0].length; i++) {      // columns is outer loop
      let scratchArray = [];                       // clear / initialize the scratchArray with each row checked
      for(let j = 1; j < grid.length; j++) {       // rows is inner loop

        if(grid[j][i] === grid[j - 1][i]) {
          if (scratchArray.length === 0) {
            scratchArray.push([j - 1, i]);
          }
          scratchArray.push([j, i]);
          if (j === grid.length -1 && scratchArray.length >= 3){
            return scratchArray;
          }
        } else if ((grid[j][i] !== grid[j - 1][i]) && scratchArray.length >= 3) {
          return scratchArray;
        } else {
          scratchArray = [];
        }

      }
    }

    // if no matches found return empty array
    return [];

  }

  static handleMatches(grid, matches) {
    // fill all matches with blanks
    matches.forEach((el) => {
      // Screen.grid[el[0]][el[1]] = '  ';
      grid[el[0]][el[1]] = '  ';
    });

    Bejeweled.updateScreen(grid);

    let restartFlag = false;
    for(let i = 0; i < grid.length - 1; i++){
      for(let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] !== '  ' && grid[i + 1][j] == '  ') {
            // Screen.grid[i + 1][j] = Screen.grid[i][j];
            grid[i + 1][j] = grid[i][j];

            // Screen.grid[i][j] = '  ';
            grid[i][j] = '  ';
            restartFlag = true;
          }
      }
      if (restartFlag) {
        i = -1;
        restartFlag = false;
      }
      Bejeweled.updateScreen(grid);
      // Screen.render();    // --------- COMMENT THIS OUT TO STOP SCREEN FLICKER WHEN ROWS ARE MADE ---------
    }


    for(let i = 0; i < grid.length - 1; i++){
      for(let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == '  ') {
          let newJewel = this.jewelArray[Bejeweled.getRandJewel(this.jewelArray)];
          // Screen.grid[i][j] = newJewel;
          grid[i][j] = newJewel;

        }
      }
    }

    Bejeweled.updateScreen(grid);

    let newMatches = Bejeweled.checkForMatches.call(this, grid)
    if(newMatches.length > 0) {
      Bejeweled.handleMatches.call(this, grid, newMatches);
    }
  }

}


module.exports = Bejeweled;
