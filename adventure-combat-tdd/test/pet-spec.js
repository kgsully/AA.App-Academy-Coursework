const { expect } = require('chai');


const {Character} = require("../class/character.js");
const {Pet} = require("../class/pet.js");
const {Player} = require("../class/player.js");
const {Enemy} = require("../class/enemy.js");

const {Item} = require("../class/item.js");




describe('Pet Class', function () {

    let testPlayer;
    let testPet;
    let testEnemy;
    let treat;
    let rooms;

    beforeEach(() => {
        rooms = [
            {
                id: 1,
                name: "Crossroad",
                description: "You are standing at a crossroad. To the north, east, south and west you see empty space, waiting to be filled.",
                exits: {n: 2, e: 3, w: 4, s: 5}
              },
              {
                id: 2,
                name: "Northern point",
                description: "You are standing at the north point of a crossroad. To the south, you see an empty intersection.",
                exits: {s: 1}
              }
        ]

        testPet = new Pet("TestPet", "A Friendly Looking Dog", rooms[0]);
        testPlayer = new Player("TestPlayer", rooms[0]);
        testEnemy = new Enemy("TesetEnemy", rooms[0]);
        treat = {
            name: "treat",
            description: "A tasty looking pet treat",
            room: 1,
            isFood: true
        }
    });

    it('should be an instance of the pet class', function () {
        expect(testPet).to.be.an.instanceof(Pet);
    });

    it('should inherit from the Character class', function () {
        expect(testPet).to.be.an.instanceof(Character);
    });

    it('should be able to receive / eat a treat', function () {
        expect(testPet.receiveTreat(treat, testPlayer)).to.be.equal("TestPet has eaten the treat: treat");
    });

    it('should be owned by player after being fed a treat', function () {

        testPet.receiveTreat(treat, testPlayer);

        expect(testPet.owner).to.deep.equal(testPlayer);
    });

    it('should follow its owner', function () {
        testPet.receiveTreat(treat, testPlayer);
        testPlayer.currentRoom = rooms[1];
        setTimeout(() => {
            expect(testPet.currentRoom).to.deep.equal(testPlayer.currentRoom);
        }, 3000);

    });

});
