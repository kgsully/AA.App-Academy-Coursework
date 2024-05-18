// Convert the integers in the console.logs below to base 2

/******************************************************************************/

const convertToBase2 = element => {
  // Your code here
  let binNum = '0b';
  let binArr = [];
  let num;
  let base = 2;


  let hexVals = {
    letters: 'abcdef',
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
  };


  if (typeof element === 'number') {               // set num variable equal to incoming parameter if it is a valid number
    num = element;
  } else {                                         // check for hexadecimal value. convert to decimal then set num variable equal to decimal equivalent
    let prefix = element.slice(0, 2);              // retrieve prefix
    if (prefix === '0x') {
      let numArr = element.split('').splice(2);    // generate number portion only array
      let decVal = 0;                              // initialize decimal return value

      let val = 0;

      for(let i = 0; i < numArr.length; i++) {

        if (hexVals.letters.includes(numArr[i])) {
          val = hexVals[numArr[i]];
        } else {
          val = Number(numArr[i]);
        }

        decVal += val * 16 ** (numArr.length - 1 - i);
      }

      num = decVal;

    } else {
      return "Invalid Argument - must be either a decimal (number format) or hexadecimal value (string with prefix 0x)";
    }
  }

  // convert decimal value to binary
  while (num >= 1) {
    let rem = num % base;
    binArr.push(rem);
    num = (num - rem) / base;
  }

  while (binArr.length > 0) {
    binNum += binArr.pop();
  }

  return binNum;
};

module.exports = convertToBase2;

/******************************************************************************/

console.log(convertToBase2(4)); // 0b100
console.log(convertToBase2(65)); // 0b1000001
console.log(convertToBase2(233)); // 0b11101001
console.log(convertToBase2(256)); // 0b100000000
console.log(convertToBase2(123)); // 0b1111011
console.log(convertToBase2(1000)); // 0b1111101000

console.log('––––––');

console.log(convertToBase2('0xf')); // 0b1111
console.log(convertToBase2('0xfa')); // 0b11111010
console.log(convertToBase2('0x1234')); // 0b1001000110100
console.log(convertToBase2('0xc9a1')); // 0b1100100110100001
console.log(convertToBase2('0xbf12')); // 0b1011111100010010
