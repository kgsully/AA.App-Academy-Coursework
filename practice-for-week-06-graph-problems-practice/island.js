function getNeighbors(row, col, graph) {

  // Check top
  const top = [row - 1, col];

  // Check bottom
  const bottom = [row + 1, col];

  // Check left
  const left = [row, col - 1];

  // Check right
  const right = [row, col + 1];

  let neighbors = [top, bottom, left, right];
  let validNeighbors = [];

  neighbors.forEach((el) => {
    let elRow = el[0];
    let elCol = el[1];
    if(isValidIndex(el, graph) && graph[elRow][elCol] >= 1) validNeighbors.push(el);
  });


  // Return neighbors
  return validNeighbors;

}

function isValidIndex (node, graph) {
  const row = node[0];
  const col = node[1];
  if ((row >= 0 && row < graph.length) && (col >= 0 && col < graph[row].length)) return true;
  return false;
}

function islandSize(row, col, graph) {

  // Create a visited set to store visited nodes
  const visited = new Set();

  // Create a stack, put the starting node in the stack
  const stack = [[row, col]];

  // Put the stringified starting node in visited
  visited.add(`${row},${col}`);

  // Initialize size to 0
  let size = 0;

  // While the stack is not empty,
  while (stack.length > 0) {
    // Pop the first node
    let currentNode = stack.pop();
    let currRow = currentNode[0];
    let currCol = currentNode[1];

    // DO THE THING (increment size by 1)
    size++;

    // Then push all the UNVISITED neighbors on top of the stack
    // and mark them as visited
    // HINT: This is what your helper function `getNeighbors` is for
    // HINT: Remember, you're storing your visited nodes as strings!
    let neighbors = getNeighbors(currRow, currCol, graph);
    neighbors.forEach((el) => {
      if (!visited.has(el.toString())) {
        stack.push(el);
        visited.add(el.toString());
      }
    });
  }
  // return size
  return size;

}

// const matrix = [
//   [1,1,1,0,0],
//   [0,1,1,0,1],
//   [0,1,1,0,1],
// ];

// console.log(islandSize(1, 1, matrix));
// console.log(islandSize(2, 4, matrix));

module.exports = [getNeighbors, islandSize];
