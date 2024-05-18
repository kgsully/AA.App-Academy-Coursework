const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, salary, title, manager, employees = []) {
        super(name, salary, title, manager);
        this.employees = employees;
    }

    addEmployee(employee) {
        this.employees.push(employee);
    }

    _totalSubSalary(employees) {
        if (employees.length === 0) {
            return 0;
        } else if (employees[0] instanceof Manager) {
            return employees[0].salary + this._totalSubSalary(employees[0].employees);
        } else if (employees[0] instanceof Employee) {
            return employees[0].salary + this._totalSubSalary(employees.slice(1))
        }
    }

     calculateBonus(multiplier) {

        return (this.salary + this._totalSubSalary(this.employees)) * multiplier;

    }

}

module.exports = Manager;




// const splinter = new Manager('Splinter', 100000, 'Sensei');
// const leo = new Manager('Leonardo', 90000, 'Ninja', splinter);
// const raph = new Manager('Raphael', 90000, 'Ninja', leo);
// const mikey = new Employee('Michelangelo', 85000, 'Grasshopper', raph);
// const donnie = new Employee('Donatello', 85000, 'Grasshopper', raph);

// console.log(splinter.calculateBonus(0.05)); // => 22500
// console.log(leo.calculateBonus(0.05)); // => 17500
// console.log(raph.calculateBonus(0.05)); // => 13000
