// Your code here
const { expect } = require('chai');

const numberFun = require('../problems/number-fun.js');
const returnsThree = numberFun.returnsThree;
const reciprocal = numberFun.reciprocal;

describe('number-fun: returnsThree function', function () {

    it('should return 3', function () {
        expect(returnsThree()).to.equal(3);
    });
});

describe('number-fun: reciprocal function', function () {

    it('should only allow inputs between 1 and 1000000', function () {
        expect(() =>{
            reciprocal(-1);
        }).to.throw();

        expect(() =>{
            reciprocal(1000002);
        }).to.throw();

        expect(() =>{
            reciprocal('one');
        }).to.throw();

    })

    it('should return the reciprocal of the given input', function () {
        expect(reciprocal(2)).to.equal(0.5);
        expect(reciprocal(4)).to.equal(0.25);
        expect(reciprocal(10)).to.equal(0.1);

    });


});
