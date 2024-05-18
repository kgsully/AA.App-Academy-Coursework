const [addNums, addManyNums] = require("./phase-1");

// Runs `addNums` in 10 increasing increments
function addNums10(increment) {
  // Fill this in
  let retArr = [];
  for (let i = 1; i <= 10; i++) {
    retArr.push(addNums(i * increment));

  }
  return retArr;

}

// Runs `addManyNums` in 10 increasing increments
function addManyNums10(increment) {
  // Fill this in
  let retArr = [];
  for (let i = 1; i <= 10; i++) {
    retArr.push(addManyNums(i * increment));

  }
  return retArr;

}

module.exports = [addNums10, addManyNums10];
