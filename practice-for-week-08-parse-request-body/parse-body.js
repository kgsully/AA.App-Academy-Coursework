function firstStep(input) {
  // Your code here
  return input.split('&');

}

function secondStep(input) {
  // Your code here
  return input.map((el) => el.split('='));

}

function thirdStep(input) {
  // Your code here
  return input.map(el => {
    return el.map(str => {
      return str.replace(/\+/g, " ");
    });
  });

}

function fourthStep(input) {
  // Your code here
  return input.map(el => {
    return el.map(str => decodeURIComponent(str));
  });
}

function fifthStep(input) {
  // Your code here

  // Array.reduce initial value is an empty object
  return input.reduce((acc, curVal) => {
    acc[curVal[0]] = curVal[1];
    return acc;
  }, {});
}

function parseBody(str) {
  // Your code here
  const keyValPairs = firstStep(str);
  const separateKeyValPairs = secondStep(keyValPairs);
  const plusRemoved = thirdStep(separateKeyValPairs);
  const percentRemoved = fourthStep(plusRemoved);
  const keyValPairObj = fifthStep(percentRemoved);
  return keyValPairObj;
}

// // LOCAL TEST CONDITIONS
// let string = "username=azure+green&password=password%21";

// let firstStepVal = firstStep(string);
// console.log(firstStepVal);
// let secondStepVal = secondStep(firstStepVal);
// console.log(secondStepVal);
// let thirdStepVal = thirdStep(secondStepVal);
// console.log(thirdStepVal);
// let fourthStepVal = fourthStep(thirdStepVal);
// console.log(fourthStepVal);
// let fifthStepVal = fifthStep(fourthStepVal);
// console.log(fifthStepVal);

// console.log(parseBody(string));


/******************************************************************************/
/******************* DO NOT CHANGE THE CODE BELOW THIS LINE *******************/

module.exports = {
  firstStep,
  secondStep,
  thirdStep,
  fourthStep,
  fifthStep,
  parseBody
};
