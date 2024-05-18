// Convert the integers in the console.logs below to base 10:

/******************************************************************************/

const convertToBase10 = str => {
  // Your code here
  let strArr = str.split('');       // generate array from string
  let prefix = str.slice(0, 2);     // retrieve prefix
  let numArr = strArr.splice(2);    // generate number portion only array
  let decVal = 0;                   // initialize decimal return value

  let hexVals = {
    letters: 'abcdef',
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
  }

  // handle binary conversion
  if (prefix === '0b') {
    for(let i = 0; i < numArr.length; i++) {
      decVal += Number(numArr[i]) * 2 ** (numArr.length - 1 - i);
    }
  } else if (prefix === '0x') {
    let val = 0;
    for(let i = 0; i < numArr.length; i++) {
      if (hexVals.letters.includes(numArr[i])) {
        val = hexVals[numArr[i]];
      } else {
        val = Number(numArr[i]);
      }

      decVal += val * 16 ** (numArr.length - 1 - i);
    }
  }

  return decVal;
};

/******************************************************************************/

console.log(convertToBase10('0b1100')); // 12
console.log(convertToBase10('0b0101')); // 5
console.log(convertToBase10('0b1000')); // 8
console.log(convertToBase10('0b0111')); // 7

console.log('------');

console.log(convertToBase10('0b10100101')); // 165
console.log(convertToBase10('0b11111111')); // 255
console.log(convertToBase10('0b01010101')); // 85
console.log(convertToBase10('0b00110011')); // 51

console.log('------');

console.log(convertToBase10('0xf')); // 15
console.log(convertToBase10('0xfa')); // 250
console.log(convertToBase10('0x1234')); // 4660
console.log(convertToBase10('0xc9a1')); // 51617
console.log(convertToBase10('0xbf12')); // 48914
