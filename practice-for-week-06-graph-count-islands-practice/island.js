function getNeighbors(row, col, matrix) {

  // Check top
  const top = [row - 1, col];

  // Check top right
  const topRight = [row - 1, col + 1];

  // Check right
  const right = [row, col + 1];

  // Check bottom right
  const bottomRight = [row + 1, col + 1];

  // Check bottom
  const bottom = [row + 1, col];

  // Check bottom left
  const bottomLeft = [row + 1, col - 1];

  // Check left
  const left = [row, col - 1];

  // Check top left
  const topLeft = [row - 1, col - 1];

  let neighbors = [top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft];
  let validNeighbors = [];

  neighbors.forEach((el) => {
    let elRow = el[0];
    let elCol = el[1];
    if(isValidIndex(el, matrix) && matrix[elRow][elCol] >= 1) validNeighbors.push(el);
  });

  // Return neighbors
  return validNeighbors;

}

function isValidIndex (node, matrix) {
  const row = node[0];
  const col = node[1];
  if ((row >= 0 && row < matrix.length) && (col >= 0 && col < matrix[row].length)) return true;
  return false;
}

function countIslands(matrix) {

  // Create a visited set to store visited nodes
  const visited = new Set();

  // Initialize count to 0
  let count = 0;

  // Iterate through all indices in matrix
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      // If an index contains a 1 and has not been visited,
      // increment island count and start traversing neighbors
      if (matrix[i][j] === 1 && !visited.has(`${i},${j}`)) {
        // DO THE THING (increment island count by 1)
        count++;

        // Initialize a stack with current index
        let stack = [[i, j]];

        // Add stringified version of current index to the visited set
        visited.add(`${i},${j}`);

        // While stack contains elements
        while (stack.length > 0) {
          // Pop element from stack
          let currentNode = stack.pop();
          let currRow = currentNode[0];
          let currCol = currentNode[1];

          // Get valid neighbors of current element
          let neighbors = getNeighbors(currRow, currCol, matrix);
          // Iterate over neigbors
          neighbors.forEach((neighbor) => {
            // If neighbor has not been visited
                // Add neighbor to stack
                // Mark neighbor as visited
            if (!visited.has(neighbor.toString())) {
              stack.push(neighbor);
              visited.add(neighbor.toString());
            }
          });
        }
      }
    }
  }
  // Return island count
  return count;
}

// Uncomment the lines below for local testing
// const matrix = [
//                 [1,1,1,0,0],
//                 [0,1,1,0,1],
//                 [0,1,1,0,1]
//               ]

// console.log(getNeighbors(1, 1, matrix)); // [[0, 0], [0, 1], [0, 2], [1, 2], [2, 1], [2, 2]]
// console.log(getNeighbors(2,4, matrix)) // [[1,4]]

// const matrix2 = [
//                     [1,1,1,0,1],
//                     [0,0,0,0,1],
//                     [1,0,0,1,0],
//                 ]

// console.log(countIslands(matrix)) // 2
// console.log(countIslands(matrix2)); // 3

module.exports = [countIslands, getNeighbors];
