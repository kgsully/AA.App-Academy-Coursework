const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Picks up an item from a room into the player's inventory
    // Fill this in
    for(let i = 0; i < this.currentRoom.items.length; i++) {
      if (itemName == this.currentRoom.items[i].name) {
          console.log(`You picked up a(n) ${this.currentRoom.items[i].name}`);
          this.items.push(this.currentRoom.items[i]);
          this.currentRoom.items.splice(i, 1);
          return this.items;
      }
  }

  }

  // MOVED THIS INTO CHARACTER PARENT CLASS
  // dropItem(itemName) {
  //   // Drops an item the player is holding into their current room
  //   // Fill this in
  //   for(let i = 0; i < this.items.length; i++) {
  //     if (itemName == this.items[i].name) {
  //         console.log(`You have dropped ${this.items[i].name}`);
  //         this.currentRoom.items.push(this.items[i]);
  //         this.items.splice(i, 1);
  //     }
  // }

  // }

  eatItem(itemName) {
    // Eats item
    // Fill this in
    for(let i = 0; i < this.items.length; i++) {
      if(itemName == this.items[i].name && this.items[i].isFood) {
          console.log(`You have eaten a ${this.items[i].name}`);
          this.items.splice(i, 1);
          return;
      } else if(itemName == this.items[i].name && !this.items[i].isFood) {
          console.log("This item is not edible...");
          return;
      }
    }
  }

  feedPet(itemName) {
    // feeds item to pet
    let pets = this.currentRoom.getPets();
    if(pets.length > 0) {

      for(let i = 0; i < this.items.length; i++) {
        if(itemName == this.items[i].name && this.items[i].isFood) {
          pets[0](this.items[i], this);
          this.items.splice(i, 1);
          return;
        } else if(itemName == this.items[i].name && !this.items[i].isFood) {
          console.log("This item is not a treat...");
          return;
        }
      }
    } else {
      console.log("There are no pets in the room...");
    }
  }
  getItemByName(name) {
    // Retrieves an item from a player's inventory by name
    // Fill this in
    for(let i = 0; i < this.items.length; i++) {
      if (name == this.items[i].name) {
          return this.items[i];
      }
  }

  }

  hit(name) {

    // Fill this in
    let enemies = this.currentRoom.getEnemies();
    for (let i = 0; i < enemies.length; i++) {
      if (name == enemies[i].name) {
        enemies[i].applyDamage(10);
        console.clear();
        this.currentRoom.printRoom();
        console.log(`You hit ${enemies[i].name}! It's health is now ${enemies[i].health}`)
        console.log("");
      }
    }

  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
