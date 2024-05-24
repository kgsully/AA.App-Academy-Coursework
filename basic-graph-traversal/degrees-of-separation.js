const adjList = {
    1: [2, 5],
    2: [1, 3, 5],
    3: [2, 4],
    4: [3, 5],
    5: [1, 2, 4],
    6: []
}

function degreesOfSeparation(start, end) {
  // your code here
  const queue = [];
    const visited = new Set();

    queue.push(start);
    visited.add(start);

    while (queue.length > 0) {

        let currentPath = [];
        currentPath = currentPath.concat(queue.shift());

        let currentNode = currentPath[currentPath.length - 1];

        if (currentNode === end) return currentPath.length - 1;

        adjList[currentNode].forEach((el) => {
            if (!visited.has(el)) {
                visited.add(el);
                let copyPath = currentPath.concat(el);
                queue.push(copyPath);
            }
        });
    }

    return false;
}

console.log("First Test:");
console.log(degreesOfSeparation(1, 3)); // -> 2
console.log("Second Test:");
console.log(degreesOfSeparation(5, 2)); // -> 1
console.log("Third Test:");
console.log(degreesOfSeparation(6, 1)); // -> false
