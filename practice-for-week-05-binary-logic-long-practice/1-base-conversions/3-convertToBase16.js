// Convert the integers in the console.logs below to base 16:

/******************************************************************************/

const convertToBase16 = element => {
  // Your code here
  const digits = '0123456789abcdef'
  const base = 16;
  let hexNum = '0x';
  let hexArr = [];
  let num;

  if (typeof element === 'number') {               // set num variable equal to incoming parameter if it is a valid number
    num = element;
  } else {                                         // check for hexadecimal value. convert to decimal then set num variable equal to decimal equivalent
    let prefix = element.slice(0, 2);              // retrieve prefix
    if (prefix === '0b') {
      let numArr = element.split('').splice(2);    // generate number portion only array
      let decVal = 0;                              // initialize decimal return value
      for(let i = 0; i < numArr.length; i++) {
        decVal += Number(numArr[i]) * 2 ** (numArr.length - 1 - i);
      }
      num = decVal;
    } else {
      return "Invalid Argument - must be either a decimal (number format) or hexadecimal value (string with prefix 0x)";
    }
  }

  // convert decimal value to hexadecimal
  while (num >= 1) {
    let rem = num % base;
    hexArr.push(digits[rem]);
    num = (num - rem) / base;
  }

  while (hexArr.length > 0) {
    hexNum += hexArr.pop();
  }

  return hexNum;
};

/******************************************************************************/

console.log(convertToBase16(4)); // 0x4
console.log(convertToBase16(15)); // 0xf
console.log(convertToBase16(16)); // 0x10
console.log(convertToBase16(65)); // 0x41
console.log(convertToBase16(256)); // 0x100
console.log(convertToBase16(123)); // 0x7b
console.log(convertToBase16(1000)); // 0x3e8

console.log('––––––');

console.log(convertToBase16('0b1100')); // 0xc
console.log(convertToBase16('0b0101')); // 0x5
console.log(convertToBase16('0b1000')); // 0x8
console.log(convertToBase16('0b0111')); // 0x7

console.log('––––––');

console.log(convertToBase16('0b10100101')); // 0xa5
console.log(convertToBase16('0b11111111')); // 0xff
console.log(convertToBase16('0b01010101')); // 0x55
console.log(convertToBase16('0b00110011')); // 0x33
