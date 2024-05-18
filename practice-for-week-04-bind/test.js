// Your code here
const Employee = require('./employee');

const johnWick = new Employee("John Wick", "Dog Lover");

setTimeout(johnWick.sayName.bind(johnWick), 2000);

let jwSayOcc = johnWick.sayOccupation.bind(johnWick);
setTimeout(jwSayOcc, 3000);
