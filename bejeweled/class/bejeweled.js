const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor() {

    // declare empty 8 x 8 grid
    this.grid = [['  ','  ','  ','  ','  ','  ','  ','  '],                // UNCOMMENT THIS FOR BLANK GRID
                 ['  ','  ','  ','  ','  ','  ','  ','  '],
                 ['  ','  ','  ','  ','  ','  ','  ','  '],
                 ['  ','  ','  ','  ','  ','  ','  ','  '],
                 ['  ','  ','  ','  ','  ','  ','  ','  '],
                 ['  ','  ','  ','  ','  ','  ','  ','  '],
                 ['  ','  ','  ','  ','  ','  ','  ','  '],
                 ['  ','  ','  ','  ','  ','  ','  ','  ']];
    // this.grid = [['🥝','🥥','🍊','🥝','🥥','🍊','🥝','🥥'],           // 2 valid moves in this grid
    //              ['🍓','🍇','🍋','🍓','🍇','🍋','🥝','🍇'],
    //              ['🍓','🍊','🍇','🍇','🍊','🥝','🥥','🍊'],
    //              ['🥥','🍋','🥝','🥥','🍋','🍓','🍇','🍋'],
    //              ['🍊','🥝','🥥','🍊','🥝','🥥','🍊','🥝'],
    //              ['🍋','🍓','🍊','🍋','🍓','🍇','🍋','🍓'],
    //              ['🥝','🥥','🍇','🥝','🥥','🍊','🥝','🥥'],
    //              ['🍇','🍇','🍋','🍓','🍇','🍋','🍓','🍇']];

    // declare array of possible jewel elements
    this.jewelArray = ['🥝', '🍓', '🥥', '🍇', '🍊', '🍋'];

    this.swapFlag = false;
    this.swapPos = [];

    this.validMoves = {};

    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    Screen.setGridlines(false);

    // call to initialize the grid - if no valid moves are found during initialization, re-initialize the grid until a valid move is found
    while(Object.keys(this.validMoves).length === 0) {
      Bejeweled.gridInitialize(this.grid, this.jewelArray);              // UNCOMMENT THIS TO INITIALIZE THE GRID
      this.validMoves = Bejeweled.determineValidMoves(this.grid);
    }

    Bejeweled.updateScreen(this.grid);


    // command bindings
    Screen.addCommand('up', 'move cursor up', Bejeweled.upCommand.bind(this));
    Screen.addCommand('down', 'move cursor down', Bejeweled.downCommand.bind(this));
    Screen.addCommand('left', 'move cursor left', Bejeweled.leftCommand.bind(this));
    Screen.addCommand('right', 'move cursor right', Bejeweled.rightCommand.bind(this));
    Screen.addCommand('space', 'make selection', Bejeweled.swapCommand.bind(this));

    this.cursor.setBackgroundColor();
    Screen.render();

  }

  // -----------------------------------------------------------------------------------------------------------------
  // STATIC METHODS FOR GRID INITIALIZATION AND SCREEN UPDATING
  // -----------------------------------------------------------------------------------------------------------------

  // static method for initializing the grid
  static gridInitialize(grid, jewelArray) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {

        let randJewel = Bejeweled.getRandJewel(jewelArray);
        grid[i][j] = randJewel;

        // CHECK TO ENSURE NO 3 IN A ROW ARE GENERATED AS PART OF THE BOARD INITIALIZATION

        // check for 3 in a row along the row, re-select a new jewel if a 3 in a row is created
        if (i >= 2) {
          if (grid[i][j] === grid[i - 1][j] && grid[i][j] === grid[i - 2][j]) {
            j = j -1;
          }
        }

        // check for 3 in a row along the column, re-select a new jewel if a 3 in a row is created
        if (j >= 2) {
          if (grid[i][j] === grid[i][j - 1] && grid[i][j] === grid[i][j - 2]) {
            j = j -1;
          }
        }
      }
    }
    Bejeweled.updateScreen(grid);
  }

  // static method for updating the screen object to match the grid
  static updateScreen(grid) {
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        Screen.setGrid(i, j, grid[i][j]);
      }
    }
  }

  // static method for selecting a random jewel from the jewel element array
  static getRandJewel (jewelArray) {
    const maxFloored = Math.floor(jewelArray.length - 1);
    let randNum = Math.floor(Math.random() * (maxFloored - 0 + 1) + 0);
    return jewelArray[randNum];
  }

  // -----------------------------------------------------------------------------------------------------------------
  // STATIC METHODS FOR MOVEMENT COMMANDS
  // -----------------------------------------------------------------------------------------------------------------

  static upCommand() {

    if(this.swapPos.length < 1 || (this.cursor.col === this.swapPos[1] && this.cursor.row >= this.swapPos[0])) {
      this.cursor.up();
      if (this.swapPos.length !== 0) {
        Screen.setBackgroundColor(this.swapPos[0], this.swapPos[1],'cyan');
      }
      Screen.render();
    }
  }

  static downCommand() {
    if(this.swapPos.length < 1 || (this.cursor.col === this.swapPos[1] && this.cursor.row <= this.swapPos[0])) {
      this.cursor.down();
      if (this.swapPos.length !== 0) {
        Screen.setBackgroundColor(this.swapPos[0], this.swapPos[1],'cyan');
      }
      Screen.render();
    }
  }

  static leftCommand() {
    if(this.swapPos.length < 1 || (this.cursor.row === this.swapPos[0] && this.cursor.col >= this.swapPos[1])) {
      this.cursor.left();
      if (this.swapPos.length !== 0) {
        Screen.setBackgroundColor(this.swapPos[0], this.swapPos[1],'cyan');
      }
      Screen.render();
    }
  }

  static rightCommand() {
    if(this.swapPos.length < 1 || (this.cursor.row === this.swapPos[0] && this.cursor.col <= this.swapPos[1])) {
      this.cursor.right();
      if (this.swapPos.length !== 0) {
        Screen.setBackgroundColor(this.swapPos[0], this.swapPos[1],'cyan');
      }
      Screen.render();
    }
  }

  static swapCommand() {

    if (!this.swapFlag) {   // Initial swap selection - set swap flag to true and buffer the selected position. Change cursor color to indicate swap in progress

      this.swapFlag = true;
      this.swapPos = [this.cursor.row, this.cursor.col];

      this.cursor.cursorColor = 'cyan';

    } else if (this.swapFlag) {   // Second swap selection - CURRENTLY JUST CLEAR SWAP
      let currPos = [this.cursor.row, this.cursor.col];
      let moveValid = Bejeweled.checkValidMove(this.swapPos, currPos, this.validMoves);

      if (moveValid) {
        // if move is valid, perform the position swap between the swap position and the current cursor position
        let swapBuffer = this.grid[this.swapPos[0]][this.swapPos[1]];

        this.grid[this.swapPos[0]][this.swapPos[1]] = this.grid[this.cursor.row][this.cursor.col];
        this.grid[this.cursor.row][this.cursor.col] = swapBuffer;

        // check updated grid for matches
        let matches = Bejeweled.checkForMatches(this.grid);

        // handle dropping pieces down if found
        if (matches.length > 0) {
          Bejeweled.handleMatches(this.grid, matches, this.jewelArray);
        }

        Bejeweled.updateScreen(this.grid);

        this.validMoves = Bejeweled.determineValidMoves(this.grid);
        // Screen.setMessage(this.validMoves);
        if (Object.keys(this.validMoves).length === 0) {
          Screen.quit();
        }

      }

      Screen.setBackgroundColor(this.swapPos[0], this.swapPos[1], 'black');

      this.swapFlag = false;
      this.swapPos = [];

      this.cursor.cursorColor = 'white';
    }

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // -----------------------------------------------------------------------------------------------------------------
  // STATIC METHODS FOR GRID CHECKING LOGIC
  // -----------------------------------------------------------------------------------------------------------------

  static determineValidMoves (grid) {
    let validMoves = {};
    let keyCtr = 0;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {

        // check for swapping rows in the UP direction
        if (i > 0) {
          if (j >= 2) {                                     // make 3 with 2 to the left
            if (grid[i][j] === grid[i - 1][j - 2] && grid[i][j] === grid[i - 1][j - 1]) {
                validMoves[keyCtr] = [[i, j] , [i - 1, j]];
                keyCtr++;
                validMoves[keyCtr] = [[i - 1, j] , [i, j]];
                keyCtr++;
            }
          }

          if (j >= 1 && j <= grid[i].length - 2) {          // make 3 with 1 to the left & 1 to the right
            if (grid[i][j] === grid[i - 1][j - 1] && grid[i][j] === grid[i - 1][j + 1]) {
                validMoves[keyCtr] = [[i, j] , [i - 1, j]];
                keyCtr++;
                validMoves[keyCtr] = [[i - 1, j] , [i, j]];
                keyCtr++;
            }
          }

          if (j <= grid[i].length - 3) {                    // make 3 with 1 to the left & 1 to the right
            if (grid[i][j] === grid[i - 1][j + 1] && grid[i][j] === grid[i - 1][j + 2]) {
                validMoves[keyCtr] = [[i, j] , [i - 1, j]];
                keyCtr++;
                validMoves[keyCtr] = [[i - 1, j] , [i, j]];
                keyCtr++;
            }
          }
        }

        // check for swapping rows in the DOWN direction
        if (i < grid.length - 1) {
          if (j >= 2) {                        // make 3 with 2 to the left
            if (grid[i][j] === grid[i + 1][j - 2] && grid[i][j] === grid[i + 1][j - 1]) {
              validMoves[keyCtr] = [[i, j], [i + 1, j]];
              keyCtr++;
              validMoves[keyCtr] = [[i + 1, j], [i, j]];
              keyCtr++;
            }
          }

          if (j >= 1 && j <= grid[i].length - 2) {   // make 3 with 1 to the left & 1 to the right
            if (grid[i][j] === grid[i + 1][j - 1] && grid[i][j] === grid[i + 1][j + 1]) {
                validMoves[keyCtr] = [[i, j], [i + 1, j]];
                keyCtr++;
                validMoves[keyCtr] = [[i + 1, j], [i, j]];
                keyCtr++;
            }
          }

          if (j <= grid[i].length - 3) {   // make 3 with 2 to the right
            if (grid[i][j] === grid[i + 1][j + 1] && grid[i][j] === grid[i + 1][j + 2]) {
                validMoves[keyCtr] = [[i, j], [i + 1, j]];
                keyCtr++;
                validMoves[keyCtr] = [[i + 1, j], [i, j]];
                keyCtr++;
            }
          }
        }

        // check for swapping columns in the LEFT direction
        if (j > 0) {
            if (i >= 2) {                                   // make 3 to the left with 2 upwards
              if (grid[i][j] === grid[i - 2][j - 1] && grid[i][j] === grid[i - 1][j - 1]) {
                validMoves[keyCtr] = [[i, j] , [i, j - 1]];
                keyCtr++;
                validMoves[keyCtr] = [[i, j - 1] , [i, j]];
                keyCtr++;
              }
            }

            if (i >= 1 && i <= grid.length - 2) {          // make 3 to the left with 1 upwards & 1 to the
              if (grid[i][j] === grid[i - 1][j - 1] && grid[i][j] === grid[i + 1][j - 1]) {
                validMoves[keyCtr] = [[i, j] , [i, j - 1]];
                keyCtr++;
                validMoves[keyCtr] = [[i, j - 1] , [i, j]];
                keyCtr++;
              }
            }

            if (i <= grid.length - 3) {                  // make 3 to the left with 2 downwards
              if (grid[i][j] === grid[i + 1][j - 1] && grid[i][j] === grid[i + 2][j - 1]) {
                validMoves[keyCtr] = [[i, j] , [i, j - 1]];
                keyCtr++;
                validMoves[keyCtr] = [[i, j - 1] , [i, j]];
                keyCtr++;
              }
            }
        }

        // check for swapping columns in the RIGHT direction
        if (j <= grid[i].length - 1) {
            if (i >= 2) {                                   // make 3 to the right with 2 upwards
              if (grid[i][j] === grid[i - 2][j + 1] && grid[i][j] === grid[i - 1][j + 1]) {
                validMoves[keyCtr] = [[i, j] , [i, j + 1]];
                keyCtr++;
                validMoves[keyCtr] = [[i, j + 1] , [i, j]];
                keyCtr++;
              }
            }

            if (i >= 1 && i <= grid.length - 2) {          // make 3 to the right with 1 upwards & 1 to the
              if (grid[i][j] === grid[i - 1][j + 1] && grid[i][j] === grid[i + 1][j + 1]) {
                validMoves[keyCtr] = [[i, j] , [i, j + 1]];
                keyCtr++;
                validMoves[keyCtr] = [[i, j + 1] , [i, j]];
                keyCtr++;
              }
            }

            if (i <= grid.length - 3) {                  // make 3 to the right with 2 downwards
              if (grid[i][j] === grid[i + 1][j + 1] && grid[i][j] === grid[i + 2][j + 1]) {
                validMoves[keyCtr] = [[i, j] , [i, j + 1]];
                keyCtr++;
                validMoves[keyCtr] = [[i, j + 1] , [i, j]];
                keyCtr++;
              }
            }
          }

          // check for swapping within the row in the LEFT direction
          if (j >= 3) {
            if (grid[i][j] === grid[i][j - 3] && grid[i][j] === grid[i][j - 2]) {
              validMoves[keyCtr] = [[i, j], [i, j - 1]];
              keyCtr++;
              validMoves[keyCtr] = [[i, j - 1], [i, j]];
              keyCtr++;
            }
          }

          // check for swapping within the row in the RIGHT direction
          if (j <= grid[i].length - 4) {
            if (grid[i][j] === grid[i][j + 2] && grid[i][j] === grid[i][j + 3]) {
              validMoves[keyCtr] = [[i, j], [i, j + 1]];
              keyCtr++;
              validMoves[keyCtr] = [[i, j + 1], [i, j]];
              keyCtr++;
            }
          }

          // check for swapping within the column in the UP direction
          if (i >= 3) {
            if (grid[i][j] === grid[i - 3][j] && grid[i][j] === grid[i - 2][j]) {
              validMoves[keyCtr] = [[i, j], [i - 1, j]];
              keyCtr++;
              validMoves[keyCtr] = [[i - 1, j], [i, j]];
              keyCtr++;
            }
          }

          // check for swapping within the column in the DOWN direction
          if (i <= grid.length - 4) {
            if (grid[i][j] === grid[i + 2][j] && grid[i][j] === grid[i + 3][j]) {
              validMoves[keyCtr] = [[i, j], [i + 1, j]];
              keyCtr++;
              validMoves[keyCtr] = [[i + 1, j], [i, j]];
              keyCtr++;
            }
          }

      }   // inner for loop closing brace
    }  // outer for loop closing brace

    return validMoves;
  } // function closing brace

  static checkValidMove(swapPos, currPos, validMoves) {
    for (let key in validMoves) {
      if (swapPos[0] === validMoves[key][0][0] && swapPos[1] === validMoves[key][0][1] && currPos[0] === validMoves[key][1][0] && currPos[1] === validMoves[key][1][1]) {
        return true;
      }
    }
    return false;
  }

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

  static handleMatches(grid, matches, jewelArray) {

    // fill all matches with blanks
    matches.forEach((el) => {
      grid[el[0]][el[1]] = '  ';
    });

    // drop jewels above the removed match elements down until they reach the next element
    let restartFlag = false;
    for(let i = 0; i < grid.length - 1; i++){
      for(let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] !== '  ' && grid[i + 1][j] == '  ') {
            grid[i + 1][j] = grid[i][j];
            grid[i][j] = '  ';
            restartFlag = true;
          }
      }
      if (restartFlag) {
        i = -1;
        restartFlag = false;
      }

    }

    // replace blank elements from the top
    for(let i = 0; i < grid.length - 1; i++){
      for(let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == '  ') {
          let newJewel = Bejeweled.getRandJewel(jewelArray);
          grid[i][j] = newJewel;
          Bejeweled.updateScreen(grid);
        }
      }
    }


    // once new jewels have populated, check for any new matches, then re-call the function to handle them if any are found
    let newMatches = Bejeweled.checkForMatches(grid)

    if(newMatches.length > 0) {
      Bejeweled.handleMatches(grid, newMatches, jewelArray);
    }
  }

}

module.exports = Bejeweled;
