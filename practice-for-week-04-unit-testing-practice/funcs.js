function isFive(num) {
  // Your code here
  if(num === 5) {
    return true;
  }
  return false;
}

function isOdd(number) {
  // Your code here
  if(typeof number !== 'number') {
    throw new Error('Input needs to be a number!')
  } else if (!(number % 2 === 0)) {
    return true;
  }
  return false;
}

function myRange(min, max, step = 1) {
  // Your code here
  let retArr = [];
  for (let i = min; i <= max; i += step){
    retArr.push(i);
  }
  return retArr;
}

console.log(myRange(0,5));

module.exports = { isFive, isOdd, myRange };
