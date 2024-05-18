/*

Fix the `cutestCat` function. Should return the cat with the highest `cuteness`
rating.

*/

debugger;

function cutestCat(cats) {
  let cutest = 0;
  let i = 0;

  while (i < cats.length) {
    const cat = cats[i];
    if (cat.cuteness > cats[cutest].cuteness) {
      cutest = i;
    }
    i++;
  }

  return cats[cutest];
}

const cats = [
  { name: 'Fluffy', cuteness: 9 },
  { name: 'Princess', cuteness: 6 },
  { name: 'Tiger', cuteness: 7 },
  { name: 'Indie', cuteness: 5 },
]
//console.log(cats[2]);
console.log(cutestCat(cats)); // { name: 'Fluffy', cuteness: 9 }
