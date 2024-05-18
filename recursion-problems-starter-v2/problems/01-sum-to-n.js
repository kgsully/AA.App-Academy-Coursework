/***********************************************************************
Write a recursive function called `sumToN` that takes in a number and returns
the sum of all the numbers from 0 to that number. Return null for any input
number below 0.

Examples:

sumToN(5) // returns 15
sumToN(1)  // returns 1
sumToN(9)  // returns 45
sumToN(-8)  // returns null
***********************************************************************/

// your code here

function sumToN(num) {

  if (num < 0) {
    return null;
  } else if (num === 0) {   // base case, no more numbers to add, return the value of num;
    return num;
  } else {                  // recursive case, num > 0
    return num + sumToN(num - 1);         // recursive step, num - 1
  }

}

console.log(sumToN(5)); // returns 15
console.log(sumToN(1));  // returns 1
console.log(sumToN(9));  // returns 45
console.log(sumToN(-8));  // returns null

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = sumToN;
} catch (e) {
  module.exports = null;
}
