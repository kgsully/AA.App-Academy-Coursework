const findMinimum = arr => {

  // Your code here
  // O(n)
  let min = arr[0];

  arr.forEach((el) => {
    if (el < min) {
      min = el;
    }
  });
  return min;

};

// const arr = [1,2,3,4];
// console.log(runningSum(arr)); // => [1,3,6,10]

const runningSum = arr => {

  // Your code here
  // O(n)
  let sumArr = [];
  let total = 0;

  arr.forEach((el) => {
    total += el
    sumArr.push(total);
  });
  return sumArr;
};

// const arr = [1,2,3,4];
// console.log(runningSum(arr)); // => [1,3,6,10]

const evenNumOfChars = arr => {

  // Your code here
  // O(n)
  let count = 0;
  arr.forEach((el) => {
    if(el.length % 2 === 0) {
      count++;
    }
  });
  return count;
};

// const arr = ['ab', 'abc', 'a', 'abcd'];
// evenNumOfChars(arr); // => 2

const smallerThanCurr = arr => {

  // Your code here
  // Using map / forEach
  let retArr = arr.map((outerEl) => {
    let count = 0;
    arr.forEach((innerEl) => {
      if (innerEl < outerEl) {
        count++;
      }
    });
    return count;
  });
  return retArr;

  // Using nested for loops
  // let retArr = [];
  // for (let i = 0; i < arr.length; i++) {
  //  for (let j = 0; j < arr.length; j++) {
  //    if (arr[j] < arr[i]) {
  //      count ++
  //    }
  //  }
  //  retArr.push(count);
  // }
  // return retArr;
};

// const arr = [8,1,2,2,3];
// console.log(smallerThanCurr(arr)); // => [4,0,1,1,3]

const twoSum = (arr, target) => {

  // Your code here
  // Compare only unique pairs - Less than O(n2) but greater than O(n)...?
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return true;
      }
    }
  }
  return false;
};

// const arr = [4, 2, 3, 6, 9];
// console.log("twoSum w/ array " + arr + " and target: 10 - " + twoSum(arr, 10)); // => True

// const arr2 = [4, 2, 3, 6, 9];
// console.log("twoSum w/ array " + arr2 + " and target: 16 - " + twoSum(arr2, 16)); // => False

const secondLargest = arr => {

  // Your code here
  let largest = arr[0];

  if (arr.length > 1) {
    // determine largest value:
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > largest) {
        largest = arr[i];
      }
    }

    // determine smallest value
    let smallest = largest;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < smallest) {
        smallest = arr[i];
      }
    }

    // determine second largest
    let nextLargest = smallest;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] < largest && arr[j] > nextLargest) {
        nextLargest = arr[j];
      }
    }
    return nextLargest;
  } else {
    return;
  }
};

// const arr = [4, 2, 3, 6, 8];
// console.log(secondLargest(arr)); // => 6

// console.log(secondLargest([])) // => undefined
// console.log(secondLargest([4])) // => undefined
// console.log(secondLargest([4, 4])) // => 4
// console.log(secondLargest([1, 2, 3, 4])) // => 3
// console.log(secondLargest([4, 3, 2, 1])) // => 3
// console.log(secondLargest([4, 2])) // => 2
// console.log(secondLargest([4, 2, 3, 6, 8])) // => 6

const shuffle = (arr) => {

  // Your code here
  let retArr = [];
  let tempArr = arr;

  for (let i = 0; i < arr.length; i++) {

    let randIdx = Math.floor(Math.random() * (tempArr.length));
    retArr.push(tempArr[randIdx]);
    tempArr = [...tempArr.slice(0 , randIdx), ...tempArr.slice(randIdx + 1)];
  }

  return retArr;
};

// const arr = [2, 5, 1, 3, 4, 7];
// console.log(shuffle(arr)); // => [2, 3, 5, 4, 1, 7]

module.exports = [findMinimum, runningSum, evenNumOfChars, smallerThanCurr, twoSum, secondLargest, shuffle];
