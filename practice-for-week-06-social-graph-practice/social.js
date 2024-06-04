// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    this.currentID += 1;

    let newUser = {id: this.currentID, name: name};
    let newUserFollows = new Set();

    this.users[newUser.id] = newUser;
    this.follows[newUser.id] = newUserFollows;

    return newUser.id;
  }

  getUser(userID) {
    // Your code here

    if (this.users[userID]) {
      return this.users[userID];
    }
    return null;

  }

  follow(userID1, userID2) {
    // Your code here
    if (this.users[userID1] && this.users[userID2]) {
      this.follows[userID1].add(userID2);
      return true;
    }
    return false;
  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID];
  }

  getFollowers(userID) {
    // Your code here
    let followers = new Set();

    for (let key in this.follows) {
      if (this.follows[key].has(userID)) {
        followers.add(Number(key));
      }
    }

    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    // Create a queue and enqueue a path to the starting node
    const queue = [[userID]];

    // Create a set to store visited nodes
    const visited = new Set();

    let recommendedFollows = [];

    // While the queue is not empty ->
    while(queue.length > 0) {
      // Dequeue the first path
      let path = queue.shift();

      // Grab the last node from the path
      let currentNode = path[path.length - 1];

      // Check if it has been visited
      if (!visited.has(currentNode)) {
        visited.add(currentNode);


        // Add to the recommended follows array if the path is within the number of degrees
        // node the length - 1 is due to not recommending users that the user already follows
        if(path.length - 1 > 1 && path.length - 1 <= degrees + 1) {
          recommendedFollows.push(currentNode);
        }

        // Put paths to all its neighbors in the back of the queue
        let neighbors = this.follows[currentNode];

        for (let el of neighbors) {
          let pathCopy = [...path];
          pathCopy.push(el);
          queue.push(pathCopy);
        }

      }
    }

    return recommendedFollows;
  }
}

module.exports = SocialNetwork;
