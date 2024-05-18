// 1.
function sum(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

try {
  let res = sum(null);
  console.log(res);
} catch (error) {
  if (error instanceof TypeError) {
    console.log(`Error - TypeError: ${error.message}`);
  }
}

// 2.

function sayName(name) {
  if(typeof name !== 'string') {
    throw new Error('Invalid name! Must be a string!');
  }
  console.log(name);
}


// tests
try {
  sayName("Alex");
  sayName(1);
} catch (error) {
  console.log(error.message);
}


// 3.
function greet(greeting) {
  if (!greeting) {
    throw new Error("There was no greeting given.");
  }

  console.log(greeting);
}

try {
  greet(null);
} catch {
  console.log("Hello World!");
}
