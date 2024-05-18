const addZeros = require('../utils/addZeros');

// Translate the ASCII strings in the console.logs below to 8-bit binary strings
// Implement the imported helper function addZeros()
//    Read the export file for the explanation of how it works

/******************************************************************************/

const char2Bin = str => {
  let binNum = '';
  let binArr = [];
  let num = str;

  // convert decimal value to binary
  while (num >= 1) {
    let rem = num % 2;
    binArr.push(rem);
    num = (num - rem) / 2;
  }

  while (binArr.length > 0) {
    binNum += binArr.pop();
  }
  return binNum;
}

const asciiTo8bit = str => {
  // Your code here
  let binReturn = '';

  for (let i = 0; i < str.length; i++) {
    let asciiVal = str.charCodeAt(i);
    let charBin = char2Bin(asciiVal);
    binReturn += addZeros(charBin, 8);
  }
  return binReturn;
};

/******************************************************************************/

console.log(asciiTo8bit('123'), asciiTo8bit('123') === '001100010011001000110011');
// 001100010011001000110011

console.log(asciiTo8bit('ABC'), asciiTo8bit('ABC') === '010000010100001001000011');
// 010000010100001001000011

console.log(asciiTo8bit('Hello, world!'), asciiTo8bit('Hello, world!') === '01001000011001010110110001101100011011110010110000100000011101110110111101110010011011000110010000100001');
// 01001000011001010110110001101100011011110010110000100000011101110110111101110010011011000110010000100001
