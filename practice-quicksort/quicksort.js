function quicksort(arr) {

  // Check if the input is length 1 or less
    // If so, it's already sorted: return
  if (arr.length <= 1) return arr;

  // Pick the first value as the pivot

  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];

  // Orient the pivot so that...
      // every number smaller than the pivot is to the left
      // every number larger (or equal) than the pivot is to the right

  for (let i = 0; i < arr.length; i++) {
      if(arr[i] < pivot) {
        leftArr.push(arr[i]);
      } else if (arr[i] > pivot) {
        rightArr.push(arr[i]);
      }
  }

  // Recursively sort the left
  leftArr = quicksort(leftArr);

  // Recursively sort the right
  rightArr = quicksort(rightArr);

  // Return the left, pivot and right in sorted order
  arr = [...leftArr, pivot, ...rightArr];
  return arr;
}

// const arr = [2,4,6,8,1,3,5,7,9];
// const arr = [5,4,6,8,1,3,2,7,9];
// console.log(quicksort(arr));

module.exports = [quicksort];
