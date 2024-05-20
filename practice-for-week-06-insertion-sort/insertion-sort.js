// Insertion Sort out-of-place
// Do not modify the original array
function insertionSort(arr) {
  /*
  Pseudocode:

  Copy the original array
  Create an array to store the sorted values
  While the array is not empty:
  - make sure you have a console.log(sorted.join(',')) as your first line in the while loop
  - Pop a value from the array
  - Create a new spot at the end of the array with null to help with comparisons
  - Walk through the sorted array in reverse order
  - Check if the value to the left is smaller than the new value
  - If so, you've reached the insertion point so exit the loop
  - If not shift the value to the right by 1 and continue
  - Insert the unsorted value at the break point
  Return the sorted array
  */

  // Your code here
  let unsorted = [];
  let sorted = [];

  // copy the original array
  for (let i = 0; i < arr.length; i++) {
    unsorted.push(arr[i]);
  }

  while (unsorted.length > 0) {
    console.log(sorted.join(','));

    let val = unsorted.pop();
    sorted.push(null);

    for(let i = sorted.length - 1; i >= 0; i--) {
      if (!sorted[i - 1] || sorted[i - 1] < val) {
        sorted[i] = val;
        break;
      } else {
        sorted[i] = sorted[i - 1];
        // [sorted[i], sorted[i - 1]] = [sorted[i - 1], sorted[i]];
      }
    }
  }

  return sorted;
}

// let arr = [2,4,6,8,1,3,5,7,9];
// insertionSort(arr);

// In-place Insertion Sort
// Mutates the original array
function insertionSortInPlace(arr) {
  /*
  Pseudocode:

  Set a pointer dividing the array into sorted and unsorted halves
  Repeat while the unsorted half is not empty:
  - make sure you have a console.log(sorted.join(',')) as your first line in the while loop ---> dont' think this is correct...
  - Grab the first value from the unsorted half
  - For each value starting from the divider,
  - Check if the value to the left is smaller than the unsorted value
  - If so, you've reached the insertion point so exit the loop
  - If not shift the value to the right by 1 and continue
  - Insert the unsorted value at the break point
  - Increment the dividing pointer and repeat
  Return the mutated array
  */

  // Your code here
  let divider = 0;  // initialize pointer to 0 position in the array to start

  while(divider < arr.length - 1) {

    let val = arr[divider];

    for (let i = divider; i >= 0; i--) {
      if (!arr[i - 1] || arr[i - 1] < val) {
        arr[i] = val;
        break;
      } else {
        arr[i] = arr[i - 1];
      }
    }
    divider++;

    console.log(arr.join(','));
  }
  return arr;
}

// let arr = [2,4,6,8,1,3,5,7,9];
// console.log(insertionSortInPlace(arr));

module.exports = [insertionSort, insertionSortInPlace];
