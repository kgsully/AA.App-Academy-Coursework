function ageSort(users) {
  // Your code here

  return users.sort((a, b) => a.age - b.age);

}

// // TEST CONDITIONS - ageSort
// const users = [
//   {
//       id: 1,
//       firstName: 'John',
//       lastName: 'Doe',
//       age: 30,
//       occupation: 'Software Engineer',
//       friends: [2, 3, 4]
//   },
//   {
//       id: 2,
//       firstName: 'Jane',
//       lastName: 'Doe',
//       age: 25,
//       occupation: 'Data Scientist',
//       friends: [1, 4]
//   },
//   {
//       id: 3,
//       firstName: 'Mary',
//       lastName: 'Smith',
//       age: 32,
//       occupation: 'UX Designer',
//       friends: [2, 4]
//   },
//   {
//       id: 4,
//       firstName: 'James',
//       lastName: 'Johnson',
//       age: 55,
//       occupation: 'CTO',
//       friends: [1, 2, 3]
//   }
// ];

// console.log(ageSort(users));         // => Jane, John, Mary, James


function oddEvenSort(arr) {
  // Your code here

  return arr.sort((a, b) => {

    if((a % 2 === 0) && (b % 2 === 1)) return 1;
    if((a % 2 === 1) && (b % 2 === 0)) return -1;
    return a - b;
  });

}

// // TEST CONDITIONS - oddEvenSort
// const arr1 = [5, 4, 7, 2, 9, 8, 1, 6, 3];
// const arr2 = [5, 8, 13, 6, 22, 14, 9];

// console.log(oddEvenSort(arr1));           // => [1, 3, 5, 7, 9, 2, 4, 6, 8]
// console.log(oddEvenSort(arr2));           // => [5, 9, 13, 6, 8, 14, 22]

function validAnagrams(s, t) {
  // Your code here
  return(s.split('').sort().join('') === t.split('').sort().join(''));

}

// // TEST CONDITIONS - validAnagrams
// let s = "anagram";
// let t = "nagaram";

// console.log(validAnagrams(s, t));            // => true

function reverseBaseSort(arr) {
  // Your code here
  return arr.sort((a, b) => {
    if(((a / 10) >= 10 && (b / 10) < 10) || ((a / 10) >= 1 && (b / 10) < 1)) return -1;
    if(((a / 10) < 10 && (b / 10) >= 10) || ((a / 10) < 1 && (b / 10) >= 1)) return 1;
    return a - b;

  });

}

// const arr1 = [11, 1, 101, 0, 10, 100];
// const arr2 = [1, 45, 164, 6, 31, 90, 671];

// console.log(reverseBaseSort(arr1));      // => [100, 101, 10, 11, 0, 1]
// console.log(reverseBaseSort(arr2));      // => [164, 671, 31, 45, 90, 1, 6]

function frequencySort(arr) {
  // Your code here
  let freqObj = {};
  for (let item of arr) {         // store array element and frequency it occurs in an object for sorting
    if (freqObj[item]) {
      freqObj[item] += 1;
    } else {
      freqObj[item] = 1;
    }

  }

  return arr.sort((a, b) => {
    let freqCompare = freqObj[a] - freqObj[b];

    if (freqCompare === 0) return b - a;

    return freqCompare;
  });

}

// const arr1 = [1, 1, 2, 2, 2, 3];
// const arr2 = [2, 3, 1, 3, 2];
// const arr3 = [-1, 1, -6, 4, 5, -6, 1, 4, 1]

// console.log(frequencySort(arr1));        // => [3, 1, 1, 2, 2, 2]
// console.log(frequencySort(arr2));        // => [1, 3, 3, 2, 2]
// console.log(frequencySort(arr3));        // => [5, -1, 4, 4, -6, -6, 1, 1, 1]

module.exports = [
  oddEvenSort,
  validAnagrams,
  reverseBaseSort,
  frequencySort,
  ageSort,
];
