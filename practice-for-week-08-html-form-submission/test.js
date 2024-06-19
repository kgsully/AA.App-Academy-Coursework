let cat = {};

let req = {
    name: 'Test Cat',
    pattern: 'striped',
    size: '9',
    description: 'Test Cat Description'
  };

console.log("LOGGING ITEMS IN ORIGINAL OBJECT:\n----------------------------------------");

for(key in req) {
    console.log(`${key}: ${req[key]}`);
}

console.log("\nLOGGING ITEMS IN NEWLY CREATED OBJECT:\n----------------------------------------")

cat = {...req};

console.log("\nTEST MUTATION DUE TO REFERENCE\n----------------------------------------");

cat.name = "Test Cat 2";
cat.pattern = "Tabby";
console.log(cat);
console.log(req);
