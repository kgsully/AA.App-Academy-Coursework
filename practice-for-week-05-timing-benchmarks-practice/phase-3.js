const [addNums, addManyNums] = require("./phase-1");

function addNums10Timing(increment) {
  // Copy your `addNums10` code here
  // Then, add timing code

  // Your code here

  let retArr = [];
  let startTime = 0;
  let endTime = 0;


  for (let i = 1; i <= 10; i++) {
    startTime = Date.now();
    console.time("addNums");
    retArr.push(addNums(i * increment));
    console.timeLog("addNums");
    console.timeEnd("addNums");
    endTime = Date.now()
    console.log(`${endTime - startTime}`);
  }

}


function addManyNums10Timing(increment) {
// Copy your `addManyNums10` code here
// Then, add timing code

  // Your code here

  let retArr = [];
  let startTime = 0;
  let endTime = 0;

  for (let i = 1; i <= 10; i++) {
    startTime = Date.now();
    console.time("addManyNums");
    retArr.push(addManyNums(i * increment));
    console.timeLog("addManyNums");
    console.timeEnd("addManyNums");
    endTime = Date.now()
    console.log(`${endTime - startTime}`);
  }

}


n = 1000000
console.log(`addNums(${n}): `);
addNums10Timing(1000000);

console.log("\n***********\n");

n = 1000
console.log(`addManyNums(${n}): `);
addManyNums10Timing(5000);
