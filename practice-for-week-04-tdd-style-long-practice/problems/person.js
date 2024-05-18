class Person {
  // Your code here
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  static greetAll(obj) {
    return obj.map((el) => el.sayHello(el));
  }

  sayHello() {
    return `${this.name} says hello!`;
  }

  visit(otherPerson) {
    return `${this.name} visited ${otherPerson.name}`;
  }

  switchVisit(otherPerson) {
    return `${otherPerson.name} visited ${this.name}`;
  }

  update(obj) {
    if(typeof obj !== 'object' || !(Object.keys(obj).includes('name') && Object.keys(obj).includes('age'))) {
      throw new TypeError('Update requires an object with name and age properties');
    } else {
      this.name = obj.name;
      this.age = obj.age;
    }

    return this;
  }

  tryUpdate(obj) {
    try {
      this.update(obj);
    } catch (error) {
      return false
    }
    return true;
  }

}



// let john = new Person("John", 35);
// console.log(john.update({name: "Steve", age: 28}));

// let sandra = new Person("Sandra", 25);
// let joel = new Person("Joel", 52);
// console.log(Person.greetAll([sandra,joel]));

module.exports = Person;
