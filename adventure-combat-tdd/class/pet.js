const {Character} = require('./character');
const {Player} = require('./player');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Pet extends Character{
    constructor(name, description, startingRoom) {
        super(name, description, startingRoom);
        this.owner = null;
    }

    receiveTreat(item, player) {
        this.owner = player;
        setInterval( () => {
            this.currentRoom = this.owner.currentRoom;
        }, 1000);
        return `${this.name} has eaten the treat: ${item.name}`;
    }


}

module.exports = {
    Pet
};
