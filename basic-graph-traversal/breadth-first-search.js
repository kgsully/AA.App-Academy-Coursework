const adjList = {
    1: [2, 5],
    2: [1, 3, 5],
    3: [2, 4],
    4: [3, 5],
    5: [1, 2, 4],
    6: []
}

function breadthFirstSearch(start, end) {
    // your code here

    const queue = [];
    const visited = new Set();

    queue.push(start);
    visited.add(start);

    while (queue.length > 0) {

        let currentNode = queue.shift();

        if (currentNode === end) return true;

        adjList[currentNode].forEach((el) => {
            if (!visited.has(el)) {
                queue.push(el);
                visited.add(el);
            }
        });
    }

    return false;
}

console.log("First Test:");
console.log(breadthFirstSearch(1, 3)); // -> true
console.log("Second Test:");
console.log(breadthFirstSearch(4, 1)); // -> true
console.log("Third Test:");
console.log(breadthFirstSearch(6, 1)); // -> false
