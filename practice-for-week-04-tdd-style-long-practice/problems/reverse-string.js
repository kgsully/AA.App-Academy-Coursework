module.exports = function reverseString(string) {
  // Your code here
  let strArr = string.split('');
  let revArr = [];

  strArr.forEach((el) => revArr.unshift(el));
  return revArr.join('');

};
