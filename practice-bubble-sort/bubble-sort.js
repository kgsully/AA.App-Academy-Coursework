
function bubbleSort(arr) {

  let swapFlag = true;

  while (swapFlag) {
    swapFlag = false;
    // Iterate through the array
    for (let i = 0; i < arr.length - 1; i++) {
      // If the current value is greater than its neighbor to the right
      // Swap those values
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapFlag = true;
        // Do not move this console.log
        console.log(arr.join(","));
      }
    }
  }
}


module.exports = bubbleSort;
