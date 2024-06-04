const adjList = {
    1: [2, 5],
    2: [1, 3, 5],
    3: [2, 4],
    4: [3, 5],
    5: [1, 2, 4],
    6: []
}

function aShortestPath(start, end) {
    // your code here
    const queue = [];
    const visited = new Set();

    queue.push(start);
    visited.add(start);

    while (queue.length > 0) {

        let currentPath = [];
        currentPath = currentPath.concat(queue.shift());

        let currentNode = currentPath[currentPath.length - 1];

        if (currentNode === end) return currentPath;

        adjList[currentNode].forEach((el) => {
            if (!visited.has(el)) {
                visited.add(el);
                let copyPath = currentPath.concat(el);
                queue.push(copyPath);
            }
        });
        console.log("current path");
        console.log(currentPath);
        console.log("queue");
        console.log(queue);
    }

    return false;
}

console.log("First Test:");
console.log(aShortestPath(1, 3)); // -> [ 1, 2, 3 ] (One possible solution)
console.log("Second Test:");
console.log(aShortestPath(4, 1)); // -> [ 4, 5, 1 ] (One possible solution)
console.log("Third Test:");
console.log(aShortestPath(6, 1)); // -> false
