/***********************************************************************
Write a recursive function called `flatten` that takes a single array with
any number of nested arrays and returns and array with all the nested
contents on one level.

Examples:

flatten([]); // []
flatten([1, 2]); // [1, 2]
flatten([1, [2, [3]]]); // [1, 2, 3]
***********************************************************************/

// your code here
function flatten(array) {
  let outputArray = [];

  function recurse(i, inpArr, outArr) {
    if (i >= inpArr.length) {
      return;
    } else if (Array.isArray(inpArr[i])) {
      recurse(0, inpArr[i], outArr);
    } else {
      outArr.push(inpArr[i]);
    }

    recurse(i + 1, inpArr, outArr);
  }

  recurse(0, array, outputArray);
  return outputArray;

}

console.log("1", flatten([]));
console.log("2", flatten([1, 2]));
console.log("3", flatten([1, [2, [3]]]));
console.log("4", flatten([[[[]]]]));
console.log("5", flatten([[1, 2], [3, [4, 5]]]));
console.log("6", flatten([[[1, 2]], [[3, 4]]]));

/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = flatten;
} catch (e) {
  module.exports = null;
}
