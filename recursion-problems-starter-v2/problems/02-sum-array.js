/***********************************************************************
Write a recursive function called `sumArray` that takes an array of integers
and returns the value of all the integers added together. Your array may
include a mix of positive and negative integers!

Examples:

sumArray([1, 2, 3]); //  6
sumArray([0, 1, -3]); //  -2
sumArray([1, 2, 3, 4, 5]); // 15
***********************************************************************/

// your code here

const sumArray = (array, sum = 0) => {

  // recursive case: non-empty array
  /*
  if (array.length > 0) {
    return sumArray(array.slice(1), sum += array[0]);   // recrusive step: .slice(1)
  }

  // base case: empty array
  return sum;
*/
debugger
if (array.length === 0) {
  return sum;
}

return sumArray(array.slice(1), sum += array[0]);

}




console.log(sumArray([1, 2, 3])); //  6
console.log(sumArray([0, 1, -3])); //  -2
console.log(sumArray([1, 2, 3, 4, 5])); // 15


/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = sumArray;
} catch (e) {
  module.exports = null;
}
