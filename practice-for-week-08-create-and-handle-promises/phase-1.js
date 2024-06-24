// function stretch() {
//   // Your code here
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("done stretching");
//       resolve();
//     }, 1000);
//   });
// }

function stretch() {
  // Your code here
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("done stretching"), 1000);
  });
}

// function runOnTreadmill() {
//   // Your code here
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("done running on treadmill");
//       resolve();
//     }, 500);
//   });
// }

function runOnTreadmill() {
  // Your code here
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("done running on treadmill"), 500);
  });
}

// function liftWeights() {
//   // Your code here
//   return new Promise((resolve, reject) => {
//     setTimeout(() =>{
//       console.log("done lifting weights");
//       resolve();
//     }, 2000);
//   });
// }

function liftWeights() {
  // Your code here
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("done lifting weights"), 2000);
  });
}

function workout() {
  // Your code here
  // Refactored to include the console.log statements here - instructions indicate to print when promises resolve
  // (set the message to be printed as the value of the resolve)
  stretch()
    .then((message) => console.log(message))
    .then(() => runOnTreadmill())
    .then((message) => console.log(message))
    .then(() => liftWeights())
    .then((message) => console.log(message))
    .then(() => console.log("done working out"))
    .catch((error) => {
        console.error("An error occured: ", error);
      });
}



/* ============================ TEST YOUR CODE ============================

Run the file (`node phase-1.js`) and check your output against the expected
output.
*/


workout();
  // should print out the following:
    // done stretching
    // done running on treadmill
    // done lifting weights
    // done working out
