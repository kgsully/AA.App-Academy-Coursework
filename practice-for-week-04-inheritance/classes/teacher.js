const Person = require('./person');

// Your code here

class Teacher extends Person {

  constructor(firstName, lastName, subject, yearsOfExperience) {
    super(firstName, lastName);
    this.subject = subject;
    this.yearsOfExperience = yearsOfExperience;
  }

  static combinedYearsOfExperience(teacherArray) {
    // single expression arrow function
    return teacherArray.reduce((accum, currVal) => accum + currVal.yearsOfExperience, 0);

  }
}

let teacher1 = new Teacher("susan", "jones", "biology", 5);
let teacher2 = new Teacher("bobby", "roberts", "math", 15);

console.log(Teacher.combinedYearsOfExperience([teacher1, teacher2]));

/****************************************************************************/
/******************* DO NOT EDIT CODE BELOW THIS LINE ***********************/

try {
  module.exports = Teacher;
} catch {
  module.exports = null;
}
