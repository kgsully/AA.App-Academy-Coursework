function myMap(inputArray, callback) {
  // Your code here
  let retArr = [];
  for(let i = 0; i < inputArray.length; i++) {
    retArr.push(callback(inputArray[i]));
  }
  // This line is for testing if map function was used
  // retArr = inputArray.map(callback);
  return retArr;
}

module.exports = myMap;
