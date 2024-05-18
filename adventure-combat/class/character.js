// const { Player } = require("./player");

class Character {

  constructor(name, description, currentRoom) {
    // Fill this in
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.health = 100;
    this.strength = 10;
    this.items = [];

  }

  dropItem(itemName) {
    // Drops an item the player is holding into their current room
    // Fill this in
    for(let i = 0; i < this.items.length; i++) {
      if (itemName == this.items[i].name) {
          console.log(`You have dropped a(n) ${this.items[i].name}`);
          this.currentRoom.items.push(this.items[i]);
          this.items.splice(i, 1);
      }
    }
  }

  applyDamage(amount) {
    // Fill this in
    this.health -= amount;
    if(this.health <= 0) {
      this.die();
    }
  }

  die() {
    // Fill this in
    this.items.forEach((item) => {
      this.dropItem(item.name);
    });
    this.currentRoom = null;
  }
}

module.exports = {
  Character,
};
