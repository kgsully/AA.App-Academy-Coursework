const { SinglyLinkedNode } = require("./01-singly-linked-list");

class Queue {

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    enqueue(val) {
        // Add node to end of queue (linked list)
        let newNode = new SinglyLinkedNode(val);
        let current = this.head;

        if (!current) {
            newNode.next = this.head;
            this.head = newNode;
            this.tail = this.head;
            this.length++;

        } else {
            this.tail.next = newNode;
            this.tail = newNode;
            this.length++;
        }

        return this.length;

        // Write your hypothesis on the time complexity of this method here
        // O(1)
    }

    dequeue() {
        // Remove node from front of queue (linked list)
        if (!this.head) return null;

        let currentHeadVal = this.head.value;

        if (this.head.next) {
            this.head = this.head.next;
            this.head.prev = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        if (this.length > 0) this.length--;
        return currentHeadVal;
        // Write your hypothesis on the time complexity of this method here
        // No traversal required due to tail pointer. O(1)
    }

}

module.exports = {
    Queue,
    SinglyLinkedNode
}
