/***********************************************************************
Write a recursive function, `range`, that takes a start and an end and returns
an array of all numbers in that range, exclusive. If the end number is less than
the start, return an empty array.

Examples:

range(1, 5); // [1, 2, 3, 4]
range(3, 4); // [3]
range(7, 6); // []
***********************************************************************/

// base case: value at array.length - 1 = end number - 1

// your code here
//debugger

// ---------------------------------
// Parameter Accumulator Method:
// ---------------------------------
function range(start, end, arr = []) {

  if (end < start) {
    return arr;
  }

  if (start === end) {
    return arr;
  }
  arr.push(start);
  return range(start + 1, end, arr);
}

// ---------------------------------
// Internal Loop Method:
// ---------------------------------
// function range(start, end) {
//   let arr = [];

//   if(end < start) {
//     return arr;
//   }

//   function recurse(start, end) {
//     if (start === end) {
//       return;
//     }
//     arr.push(start);
//     recurse(start + 1, end);
//   }
//   recurse(start, end);
//   return arr;

// }

console.log(range(1, 5)); // [1, 2, 3, 4]
console.log(range(3, 4)); // [3])
console.log(range(7, 6)); // []

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = range;
} catch (e) {
  module.exports = null;
}
