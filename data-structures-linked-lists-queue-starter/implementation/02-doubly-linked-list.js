// Node class is implemented for you, no need to look for bugs here!
class DoublyLinkedNode {
    constructor(val) {
        this.value = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    addToHead(val) {
        // There are bugs in this method! Fix them!!!

        // Add node of val to head of linked list
        let newNode = new DoublyLinkedNode(val);
        newNode.next = this.head;

        if (this.head) this.head.prev = newNode;
        this.head = newNode;

        if(!this.tail) {
        this.tail = this.head;
        }

        this.length++;

        // Write your hypothesis on the time complexity of this method here
        // ---> Does not traverse nodes in the list and simply adds a new node / updates pointers. Therefoere, O(1)
    }

    addToTail(val) {
        // Add node of val to tail of linked list
        let newNode = new DoublyLinkedNode(val);
        let current = this.head;

        if (!current) {
        this.addToHead(val);
        return;

        } else {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
    }

        // Write your hypothesis on the time complexity of this method here
        // ---> Because of tail pointer, does not need to traverse to determine last node in the list. Therefore, O(1)
    }

    removeFromHead() {
        // Remove node at head
        if (!this.head) return undefined;

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
        // ---> no traversal of nodes. O(1)

    }

    removeFromTail() {
        // Remove node at tail
        if (!this.head) return undefined;

        let currentTailVal = this.tail.value;

        if (this.tail.prev) {
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        if (this.length > 0) this.length--;
        return currentTailVal;

        // Write your hypothesis on the time complexity of this method here
        // ---> no traversal required. O(1)
    }

    peekAtHead() {
        // Return value of head node
        if (!this.head) return undefined;
        return this.head.value;
        // Write your hypothesis on the time complexity of this method here
        // ---> No node traversal of the list required. Therefore, O(1)
    }

    peekAtTail() {
        // Return value of tail node
        if (!this.head) return undefined;
        return this.tail.value;
        // Write your hypothesis on the time complexity of this method here
        // ---> No node traversal of the list required. Therefore, O(1)
    }
}


module.exports = {
    DoublyLinkedList,
    DoublyLinkedNode
}
