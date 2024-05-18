// cache = {};

// function fibMemoPrint(n) {
//   console.log(`Running fibMemoPrint(${n})`);
//   console.log(cache);
//   if (n === 1) return 0;
//   if (n === 2) return 1;

//   if (cache[n] === undefined) {
//     cache[n] = fibMemoPrint(n-1) + fibMemoPrint(n-2);
//   }
//   console.log(cache);
//   return cache[n];
// }

// console.log(fibMemoPrint(6));

function fib(n) {
    if (n === 1 || n === 2) return 1;
    return fib(n - 1) + fib(n - 2);
  }

  console.log(fib(6));     // => 8
