const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    // Fill this in
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;

  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // Fill this in
    let currRoomExits = this.currentRoom.getExits();

    const minCeiled = 0;
    const maxFloored = Math.floor(currRoomExits.length - 1);
    let nextRoomIndex = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    let nextRoomDirection = currRoomExits[nextRoomIndex];
    console.log(nextRoomDirection);


    let nextRoom = this.currentRoom.getRoomInDirection(nextRoomDirection);
    console.log(`The ${this.name} has left the room in the ${nextRoomDirection} direction`);
    this.currentRoom = nextRoom;
    this.cooldown += 5000;

  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    this.cooldown += 3000;

    let that = this;
    const resetCooldown = function() {
      that.cooldown = 0;
      that.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
    if (this.player && this.player.currentRoom === this.currentRoom) {
      this.player.applyDamage(10);
      console.clear();
      this.currentRoom.printRoom();
      console.log(`${this.name} attacks you! Your health is now ${this.player.health}`);
      console.log("");
      this.cooldown += 5000;
    } else {
      this.attackTarget = null;
    }

  }

  applyDamage(amount) {
    // Fill this in
    this.attackTarget = this.player;
    super.applyDamage(amount);
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      if (this.attackTarget === null) {
        this.scratchNose();
        this.randomMove();
      } else {
        this.attack();
      }
      this.rest();
    }

    // Fill this in
  }

  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
