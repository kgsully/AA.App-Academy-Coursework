

function selectionSort(arr) {

  // Copy the original array
  let unsorted = [...arr];

  // Create an array to store the sorted values
  let sorted = [];

  // While the array is not empty...
  // Do not move this console.log
  while (unsorted.length > 0){
    console.log(sorted.join(","));
    let index = 0;
    // Find the index of the minimum value in the unsorted half
    for (let i = 0; i < unsorted.length; i++) {
      if (unsorted[i] < unsorted[index]) index = i;
    }
    // Save and remove the value at the min index
    let val = unsorted[index];
    unsorted.splice(index, 1);
    // Add the min value to the end of the sorted array
    sorted.push(val);
  }
  return sorted;

}

// let arr = [2,4,6,8,1,3,5,7,9];
// console.log(selectionSort(arr));

function selectionSortInPlace(arr) {

  // Set a pointer at zero diving the array into sorted and unsorted halves
  let divider = 0;
  // Repeat while the unsorted half is not empty:
  while (divider < arr.length){

    // Do not move this console.log
    console.log(arr.join(","));
    let index = divider;
    // Find the index of the minimum value in the unsorted half
    for(let i = divider; i < arr.length; i++)  {
      if(arr[i] < arr[index]) index = i;
    }
    // Save the min value
    let val = arr[index];

    // Shift every unsorted value to the left of the min value to the right by 1
    for (let i = index; i >= divider; i--){
      arr[i] = arr[i - 1];
    }

    // Put the min value at the divider
    arr[divider] = val;

    // Increment the divider and repeat
    divider++;
  }
  return arr;
}

// let arr = [2,4,6,8,1,3,5,7,9];
// console.log(selectionSortInPlace(arr));


module.exports = [selectionSort, selectionSortInPlace];
