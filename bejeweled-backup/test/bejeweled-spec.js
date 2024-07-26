const { expect } = require('chai');

const Cursor = require("../class/cursor.js");
const Screen = require("../class/screen.js");
const Bejeweled = require("../class/bejeweled.js");

// 🥝 🍓 🥥 🍇 🍊 🍋

describe ('Bejeweled', function () {

  // let bejeweled;

  // beforeEach(function() {
  //   bejeweled = new Bejeweled();
  // });

  // Add tests for setting up a basic board
  it('should set up a basic board', function () {

    const grid = [[' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' ']];

    const jewelArray = ['🥝', '🍓', '🥥', '🍇', '🍊', '🍋'];

    Bejeweled.gridInitialize(grid, jewelArray);

    // test that all rows / columns are populated
    for(let i = 0; i < grid.length ; i++) {
      expect(grid[i].includes('  ')).to.equal(false);
    }

  });

  // // Add tests for a valid swap that matches 3
  it('should recognize a valid swap that matches 3 - horizontal', function () {

    let grid = [['🥥','🥝','🍓','🍊','🥝','🥥','🍇','🍊'],
                ['🥝','🍓','🥥','🍓','🍇','🍊','🥥','🥝'],
                ['🥥','🥝','🍓','🍊','🥝','🥥','🍇','🍊'],
                ['🥝','🍓','🥥','🍓','🍇','🍊','🥥','🥝'],
                ['🥥','🥝','🍓','🍊','🥝','🥥','🍇','🍊'],
                ['🥝','🍓','🥥','🍓','🍇','🍊','🥥','🥝'],
                ['🥥','🥝','🍋','🍋','🍋','🍋','🍇','🍊'],
                ['🥝','🍓','🥥','🍓','🍇','🍊','🥥','🥝']];

    expect(Bejeweled.checkForMatches(grid)).to.deep.equal([[6,2],[6,3],[6,4],[6,5]]);

  });

  it('should recognize a valid swap that matches 3 - vertical', function () {

    let grid = [['🍇','🥝','🍓','🍊','🥝','🥥','🍇','🍊'],
                ['🍊','🍓','🥥','🍓','🍇','🍊','🥥','🥝'],
                ['🍓','🥝','🍓','🍊','🥝','🥥','🍇','🍊'],
                ['🍇','🍓','🥥','🍓','🍇','🍊','🥥','🥝'],
                ['🥝','🍊','🍓','🍊','🥝','🥥','🍇','🍊'],
                ['🥝','🍓','🥥','🍓','🍇','🍊','🥥','🥝'],
                ['🥝','🍇','🍓','🍊','🥝','🥥','🍇','🍊'],
                ['🥝','🍓','🥥','🍓','🍇','🍊','🥥','🥝']];

    expect(Bejeweled.checkForMatches(grid)).to.deep.equal([[4,0],[5,0],[6,0],[7,0]]);

  });

  // Add tests for swaps that set up combos
  it('should recognize swaps that set up combos', function () {

    let grid = [['🍇','🥝','🍓','🍊','🥝','🥥','🍇','🍊'],
                ['🍊','🍓','🥥','🍓','🍇','🍊','🥥','🥝'],
                ['🍓','🥝','🍓','🍊','🥝','🥥','🍇','🍊'],
                ['🍇','🍓','🥥','🍓','🍇','🍊','🥥','🥝'],
                ['🍊','🥝','🍓','🍊','🥝','🥥','🍇','🍊'],
                ['🥝','🍓','🥥','🍓','🍇','🍊','🥥','🥝'],
                ['🥝','🥥','🍓','🍊','🥝','🥥','🍇','🍊'],
                ['🥝','🍊','🍊','🍓','🍇','🍊','🥥','🥝']];

    Bejeweled.swapCommand(grid,[6,1]);
    Bejeweled.swapCommand(grid, [6,0]);

    expect(grid[5]).to.deep.equal(['🍊','🥝','🍓','🍓','🍇','🍊','🥥','🥝']);
    expect(grid[6]).to.deep.equal(['🍓','🍓','🥥','🍊','🥝','🥥','🍇','🍊']);
    expect(grid[7]).to.deep.equal(['🍇','🥥','🍓','🍓','🍇','🍊','🥥','🥝']);
  });


  // Add tests to check if there are no possible valid moves
  it('should check if there are no possible valid moves', function () {

    let grid = [['🥝','🥥','🍊','🥝','🥥','🍊','🥝','🥥'],
                ['🍓','🍇','🍋','🍓','🍇','🍋','🍓','🍇'],
                ['🥥','🍊','🥝','🥥','🍊','🥝','🥥','🍊'],
                ['🍇','🍋','🍓','🍇','🍋','🍓','🍇','🍋'],
                ['🍊','🥝','🥥','🍊','🥝','🥥','🍊','🥝'],
                ['🍋','🍓','🍇','🍋','🍓','🍇','🍋','🍓'],
                ['🥝','🥥','🍊','🥝','🥥','🍊','🥝','🥥'],
                ['🍓','🍇','🍋','🍓','🍇','🍋','🍓','🍇']];


    expect(Bejeweled.checkForMatches(grid)).to.deep.equal([]);

  });



});
