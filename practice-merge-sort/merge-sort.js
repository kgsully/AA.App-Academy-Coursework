// Merge Sort out-of-place
// Do not modify the original array
function mergeSort(arr) {

  let sorted = [...arr];

  // Check if the input is length 1 or less
  // If so, it's already sorted: return
  if (sorted.length <= 1) return sorted;

  // Divide the array in half
  let mid = Math.floor(arr.length / 2);
  let leftArr = sorted.slice(0, mid);
  let rightArr = sorted.slice(mid);

  // Recursively sort the left half
  leftArr = mergeSort(leftArr);

  // Recursively sort the right half
  rightArr = mergeSort(rightArr);

  // Merge the halves together and return

  sorted = merge(leftArr, rightArr);
  return sorted;
}

// let arr = [8, 5, 7, 2, 4, 1, 6, 3, 10, 9];
// mergeSort(arr);

// Takes in two sorted arrays and returns them merged into one
function merge(arrA, arrB) {

  // Create an empty return array
  let retArr = [];

  // Point to the first value of each array
  let ptrA = 0;
  let ptrB = 0;

  // While there are still values in each array...
    // Compare the first values of each array
    // Add the smaller value to the return array
    // Move the pointer to the next value in that array

  while (ptrA < arrA.length || ptrB < arrB.length) {
    let valA = arrA[ptrA];
    let valB = arrB[ptrB];

    if (!valB || valA < valB) {
      retArr.push(valA);
      ptrA++;
    } else if (!valA || valB < valA) {
      retArr.push(valB);
      ptrB++;
    }
  }

  // Return the return array
  return retArr;
}

// const arr2 = [1, 3, 5, 7, 9];
// const arr1 = [2, 4, 6, 8, 10];
// const arr1 = [2, 4];
// const arr2 = [1, 3];

// const merged = merge(arr1, arr2);

// console.log(merged) // 1,2,3,4,5,6,7,8,9,10


module.exports = [merge, mergeSort];
