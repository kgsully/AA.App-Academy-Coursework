const LinkedList = require('./linked-list.js');
const DoublyLinkedList = require('./doubly-linked-list.js');

/*
Construct a timing test to verify the time complexities of `addToHead` and
`addToTail` for both singly and doubly linked lists.
*/

// Your code here

// singly linked list:
// addToHead:

function singleCallAddToHead(num) {
    let linkedList = new LinkedList();

    let startTime = Date.now();
    for (let i = 0; i < num; i++) {
        linkedList.addToHead(i);
    }
    let endTime = Date.now();
    return endTime - startTime;
}

function singleCallAddToTail(num) {
    let linkedList = new LinkedList();

    let startTime = Date.now();
    for (let i = 0; i < num; i++) {
        linkedList.addToTail(i);
    }
    let endTime = Date.now();
    return endTime - startTime;
}

function doubleCallAddToHead(num) {
    let linkedList = new DoublyLinkedList();

    let startTime = Date.now();
    for (let i = 0; i < num; i++) {
        linkedList.addToHead(i);
    }
    let endTime = Date.now();
    return endTime - startTime;
}

function doubleCallAddToTail(num) {
    let linkedList = new DoublyLinkedList();

    let startTime = Date.now();
    for (let i = 0; i < num; i++) {
        linkedList.addToTail(i);
    }
    let endTime = Date.now();
    return endTime - startTime;
}

// console.log("Singly Linked List:");
// console.log("");
// console.log("addToHead ->")
// for (let i = 10000; i < 210000; i += 10000) {
//     console.log(singleCallAddToHead(i));
// }

// console.log("");
// console.log("addToTail ->")
// for (let i = 10000; i < 110000; i += 10000) {
//     console.log(singleCallAddToTail(i));
// }

// console.log("Doubly Linked List:");
// console.log("");
// console.log("addToHead ->")
// for (let i = 10000; i < 210000; i += 10000) {
//     console.log(doubleCallAddToHead(i));
// }

console.log("");
console.log("addToTail ->")
for (let i = 10000; i < 110000; i += 10000) {
    console.log(doubleCallAddToTail(i));
}
