// Node class is implemented for you, no need to look for bugs here!
class SinglyLinkedNode {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    addToHead(val) {
        // Add node of val to head of linked list
        let newNode = new SinglyLinkedNode(val, null);

        newNode.next = this.head;
        this.head = newNode;
        this.length++;

        return this;
        // Write your hypothesis on the time complexity of this method here
        // ---> No traversal, and not dependent on list length, therefore O(1)
    }

    addToTail(val) {
        // There are bugs in this method! Fix them!!!

        // Add node of val to tail of linked list
        let newNode = new SinglyLinkedNode(val);
        let current = this.head;

        if (!current) {
        this.head = newNode;
        this.length++
        return this;
        }

        while (current) {
            if (!current.next) {
                current.next = newNode;
                this.length++
                return this;
            } else {
                current = current.next;
            }
        }
        // Write your hypothesis on the time complexity of this method here
        // ---> This must traverse the entire linked list of n items to determine the last item in the list, therefore O(n)
    }

    removeFromHead() {
        // Remove node at head
        if (!this.head) return undefined;

        let currentHead = this.head;

        this.head = this.head.next;

        if (this.length > 0) this.length--;

        return currentHead;
        // Write your hypothesis on the time complexity of this method here
        // ---> No list traversal required, just head pointer reassignment. Therefore O(1)
    }

    removeFromTail() {
        // Remove node at tail
        if (!this.head) return undefined;

        if (!this.head.next) {
            let retNode = this.head;
            this.head = null;
            this.length--;
            return retNode;
        }

        let current = this.head;
        while (current) {
            if (!current.next.next) {
                let currentTail = current.next;
                current.next = null;
                this.length--;
                return currentTail;
            } else {
                current = current.next;
            }
        }

        // Write your hypothesis on the time complexity of this method here
        // ---> List traversal required to determine the tail node of the list. Therefore O(n)
    }

    peekAtHead() {
        // Return value of head node
        if (!this.head) return undefined;
        return this.head.value;
        // Write your hypothesis on the time complexity of this method here
    }

    print() {
        // Print out the linked list
        let current = this.head;
        if (this.head) {
            while (current) {
                console.log(current.value);
                current = current.next;
            }
        }

        // Write your hypothesis on the time complexity of this method here
        // ---> Traverses the entire linked list for arbitrary number of nodes n, therefoere O(n)
    }
}

module.exports = {
    SinglyLinkedList,
    SinglyLinkedNode
}
