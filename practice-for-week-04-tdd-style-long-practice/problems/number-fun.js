function returnsThree() {
  // Your code here
  return 3;
}

function reciprocal(n) {
  // Your code here
  min = 1;
  max = 1000000;
  if(n < min || n > max || typeof n !== 'number') {
    throw new TypeError(`input must be between ${min} and ${max}`);
  }
  return 1 / n;
}

module.exports = {
  returnsThree,
  reciprocal
};
