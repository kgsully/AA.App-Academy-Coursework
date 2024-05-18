const chai = require("chai");
const expect = chai.expect;

const { Word } = require("../class");

describe("Word", function () {
  describe("Word constructor function", function () {

    let word;

    this.beforeEach(() => {
      word = new Word("test");
    });

    it('should have a "word" property', function () {
      expect(word).to.have.property('word');
    });

    it('should set the "word" property when a new word is created', function () {
      expect(word.word).to.equal('test');
    });
  });

  describe("removeVowels function", function () {

    let word;

    this.beforeEach(() => {
      word = new Word("super");
    });

    it("should return a the word with all vowels removed", function () {
      let noVowels = word.removeVowels();
      expect(noVowels).to.equal('spr');
    });
  });

  describe("removeConsonants function", function () {

    let word;

    this.beforeEach(() => {
      word = new Word("super");
    });

    it("should return the word with the consonants removed", function () {
      let noConsonants = word.removeConsonants();
      expect(noConsonants).to.equal('ue');
    });
  });

  describe("pigLatin function", function () {

    let word;

    this.beforeEach(() => {
      word = new Word("super");
    });


    it("should return the word converted to pig latin", function () {

      let ordway = word.pigLatin();

      expect(ordway).to.equal('upersay');
    });
  });
});
