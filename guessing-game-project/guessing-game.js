// import the readline module
const readline = require("readline");

// create an interface where we can talk to the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let rangeMin = 0;
let rangeMax = 0;
let secretNumber = 0;
let numAttempts = 5;

function randomInRange(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function checkGuess(number) {
    if(number > secretNumber) {
        console.log("Too High");
        return false;
    } else if (number < secretNumber) {
        console.log("Too Low");
        return false;
    } else {
        console.log("Correct!");
        return true;
    }
}

function askGuess() {
    if(numAttempts === 0) {
        console.log(`You Lose... The secret number was: ${secretNumber}`);
        rl.close();
        return;
    }
    rl.question(`Attempts Remaining(${numAttempts}) - Enter a guess: `, guessNum => {
        if(isNaN(guessNum)) {
            console.log("Please enter a number...");
            askGuess();
        } else if (checkGuess(Number(guessNum))) {
            console.log("You Win!");
            rl.close();
        } else {
            numAttempts--;
            askGuess();
        }
    });
}

function askRange() {
    rl.question("Enter a max number: ", handleMaxResponse);
}

let handleMaxResponse = (answerMax) => {
    rangeMax = Math.floor(Number(answerMax));
    rl.question("Enter a min number: ", handleMinResponse);
}

let handleMinResponse = (answerMin) => {
    rangeMin = Math.ceil(Number(answerMin));
    secretNumber = randomInRange(rangeMin, rangeMax);
    console.log(`I'm thinking of a number between ${rangeMin} and ${rangeMax}`);
    // console.log(`shhhh.... the secret number is ${secretNumber}`);
    askGuess();
}

function askLimit() {
    console.log("-----------------------------------------------------");
    console.log("            Number Guessing Game")
    console.log("-----------------------------------------------------");
    console.log("");
    rl.question("Enter number of attempts: ", attemptResponse =>{
        numAttempts = attemptResponse;
        askRange();
    });
}

askLimit();
