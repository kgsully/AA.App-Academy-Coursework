// Your code here

/****************************************************************************/
/******************* DO NOT EDIT CODE BELOW THIS LINE ***********************/

class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  introduce() {
    console.log(`Hi, I'm ${this.firstName} ${this.lastName}, and I'm ${this.age} years old.`);
  }

  static introducePeople(people) {

    if(!(Array.isArray(people))) {
      throw new Error("introducePeople only takes an array as an argument.");
    }

    people.forEach((element) => {
      if(!(element instanceof Person)) {
        throw new Error("All items in array must be Person class instances.");
      }
    });

    people.forEach(element => {
      element.introduce();
    });

  }
}

try {
  module.exports = Person;
} catch {
  module.exports = null;
}

// let johnDoe = new Person (
//   "John",
//   "Doe",
//   "35"
// );
// let janeDoe = "Jane Doe";
// let array = [johnDoe];

// Person.introducePeople(array);
