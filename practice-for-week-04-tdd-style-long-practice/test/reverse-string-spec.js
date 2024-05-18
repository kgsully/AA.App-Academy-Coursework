// Your code here
const { expect } = require('chai');
const reverseString = require('../problems/reverse-string.js');

describe('reverseString Function', function () {

    it('should reverse the order of the characters in a string', function () {
        let reverseTest = reverseString('fun');
        expect(reverseTest).to.equal('nuf');
    });

    it('should throw a TypeError if argument passed is not a string', function () {
       expect(() => {
        reverseString(123);
       }).to.throw();;
    });
});
