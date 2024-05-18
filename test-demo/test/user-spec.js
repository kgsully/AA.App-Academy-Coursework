const { expect } = require('chai');

const User = require("../class/user.js");

let user;

beforeEach(() => {
    user = new User("john_doe");
});

describe ('User class', function() {

    it('should create successfully', function () {
        expect(user).to.exist;
    });

    it('should set username on creation', function () {
        expect(user.username).to.equal("john_doe");
    });

});
