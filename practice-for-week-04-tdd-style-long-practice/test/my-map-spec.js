// Your code here
const { expect } = require('chai');
const chai = require('chai');
const spies = require("chai-spies");
chai.use(spies);

const myMap = require('../problems/my-map.js');

describe('myMap function tests', function () {

    this.beforeEach(() => {
        arr = [1, 2, 3];
    });

    it('should function like the built-in map function', function () {
        const callback = (el) => el * 2;
        expect(myMap(arr, callback)).to.deep.equal([2, 4, 6]);
    });

    it('should not mutate the original array', function () {
        const callback = (el) => el * 2;
        const testArr = arr;
        myMap(arr, callback);
        expect(arr).to.deep.equal(testArr);
    });

    it('should not call the built-in Array.map', function () {
        chai.spy.on(arr, 'map');

        myMap(arr, (el) => el * 2);

        expect(arr.map).to.not.have.been.called();

    });

    it('should call the callback for each array element', function () {
        const spy = chai.spy((el) => el * 2);
        myMap(arr, spy);
        expect(spy).to.have.been.called(arr.length);
    });

});
