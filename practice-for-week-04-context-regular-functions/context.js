function eat() {
  console.log(`${this.name} eats fish food`);
}

class Fish {
  constructor(name) {
    this.name = name;
  }

  swim() {
    console.log(`${this.name} swimming in the water`);
  }
}

const nemo = new Fish('Nemo');

/********************************* Scenario 1 *********************************/
eat(); // ?
// prints undefined eats fish food


/********************************* Scenario 2 *********************************/
nemo.eat = eat;
nemo.eat(); // ?
// prints 'nemo eats fish food'


/********************************* Scenario 3 *********************************/
nemo.eat = eat;
eat(); // ?
// prints undefined eats fish food


/********************************* Scenario 4 *********************************/
nemo.swim(); // ?
// prints nemo swimming in the water


/********************************* Scenario 5 *********************************/
const swim = nemo.swim;
swim(); // ?
// throws error
