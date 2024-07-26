// Scratch Pad for testing

const Bejeweled = require('./class/bejeweled.js');
const Screen = require('./class/screen.js');

const grid = [[' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' '],
                  [' ',' ',' ',' ',' ',' ',' ',' ']];

const jewelArray = ['🥝', '🍓', '🥥', '🍇', '🍊', '🍋'];

Bejeweled.gridInitialize.call(this, grid, jewelArray);
