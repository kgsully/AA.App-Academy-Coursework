// Your code here
const { expect } = require('chai');
const chai = require('chai');
const spies = require('chai-spies')
chai.use(spies);

const Person = require('../problems/person.js');

describe('Person Class Tests', function () {

    let john;
    let jane;

    this.beforeEach(() => {
        john = new Person("John", 35);
        jane = new Person("Jane", 32);
        steve = {name: "Steve", age: 28};
    });

    it('should create a new instance of Person', function () {
        expect(john).to.be.an.instanceof(Person);
    })

    it('should intake a name and age and set them as properties on an instance', function () {
        expect(john).to.have.all.keys('name', 'age');
        expect(john.name).to.equal('John');
        expect(john.age).to.equal(35);
    });

    it("sayHello method - should return a string of the person's name and a greeting message", function () {
        expect(john.sayHello()).to.equal("John says hello!");
    });

    it('visit method - should return a string stating that this instance visited the passed in person instance', function () {
        expect(john.visit(jane)).to.equal("John visited Jane");
    });

    it('switchVisit method - should return a string based upon invoking the visit function of the other person', function () {
        expect(john.switchVisit(jane)).to.equal("Jane visited John");
    });

    it('update method - should throw a new TypeError if the incoming argument is not an object', function () {
        expect(() => john.update("Steve")).to.throw(TypeError)
        expect(() => john.update(123)).to.throw(TypeError);
    });

    it('update method - should throw a TypeError if the incoming object does not have a name and an age property', function () {
        expect(() => john.update({name: "Larry"})).to.throw(TypeError);
        expect(() => john.update({age: 100})).to.throw(TypeError);
    });

    it('update method - should update the instance properties to match passed-in object values', function () {
        expect(john.update(steve)).to.deep.equal({name: "Steve", age: 28});
    });

    it('tryUpdate method - should return true if update is successfuly invoked', function () {
        expect(john.tryUpdate(steve)).to.equal(true);
    });

    it('tryUpdate method - should return false if update is not successfully invoked', function () {
        expect(john.tryUpdate({name: "Pasqual"})).to.equal(false);
    });

    it('greetAll method - should return an array with sayHello strings with an element for each passed in Person instance', function () {
        let sandra = new Person("Sandra", 25);
        let joel = new Person("Joel", 52);
        expect(Person.greetAll([john,jane,sandra,joel])).to.deep.equal(['John says hello!','Jane says hello!', 'Sandra says hello!', 'Joel says hello!'])
    });

});
