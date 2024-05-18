// Basic implementation of Nodes and Linked List for you to use

class SinglyLinkedNode {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor(head = null) {
        this.head = head;
        this.tail = null;
        this.length = 0;
    }

    addToTail(val) {
        let newNode = new SinglyLinkedNode(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
            this.length++
            return this.head;
        }

        let curr = this.head;
        while (curr.next) {
            curr = curr.next;
        }

        curr.next = newNode;
        this.tail = curr.next;
        this.length++;
        return this.head;
    }

    listLength() {
        // Returns the length of the list
        // Implement in O(n) and in O(1) time complexity

        // O(n) implementation
        // let length = 0;
        // let current = this.head;

        // while(current) {
        //     length ++
        //     if (!current.next) {
        //         return length;
        //     } else {
        //         current = current.next;
        //     }

        // }

        // O(1) implementation
        return this.length;

    }

    sumOfNodes() {
        // Returns the sum of the values of all the nodes
        let sum = 0;
        let current = this.head;

        while(current) {
            if (!current.next) {
                return sum + current.value;
            } else {
                sum+= current.value;
                current = current.next;
            }

        }

        // Write your hypothesis on the time complexity of this method here
        // ---> must traverse every node to add to the sum. O(n)
    }

    averageValue() {
        // Returns the average value of all the nodes
        let length = this.listLength();
        let sum = this.sumOfNodes();
        return sum / length;

        // Write your hypothesis on the time complexity of this method here
        // ---> must  traverse to fund the sum so at least O(n). Could be O(n) -> O(2n), so O(n);
    }

    findNthNode(n) {
        // Returns the node at the nth index from the head
        let current = this.head;

        while(current && n >= 0) {
            if (!current.next && n >= 1) {
                return null;
            } else if (current && n === 0) {
                return current.value;
            } else {
                current = current.next;
                n--
            }
        }

        // Write your hypothesis on the time complexity of this method here
        // may have to traverse the entire list. O(n)
    }

    findMid() {
        // Returns the middle node
        // Implement this as a singly linked list then as a doubly linked list
            // How do the implementation for singly and doubly vary if at all?
        let len = this.listLength();
        let midNode = Math.ceil(len / 2);
        return this.findNthNode(midNode - 1);


        // Write your hypothesis on the time complexity of this method here
        // O(n). O(1/2 n) which ends up being O(n)
    }

    reverse() {
        // Returns a new reversed version of the linked list
        let tempSll = new SinglyLinkedList();

        let current = this.head;
        while(current) {
            let newNode = new SinglyLinkedNode(current.value);
            newNode.next = tempSll.head;
            tempSll.head = newNode;
            tempSll.length++;
            current = current.next;
        }
        return tempSll;

        // Write your hypothesis on the time complexity of this method here
        // O(n)
    }

    reverseInPlace() {
        // Reverses the linked list in-place
        // Iterate through the list once, changing the 'next' pointer of each node to that of the previous node.
        // copy the node.next (pointer) to a temp variable before setting it to previous.
        let current = this.head;
        let previous = null;

        while(current) {
            // save the next value or it is lost
            let temp = current.next;
            // reverse pointer
            current.next = previous;
            // increment previous to current node ALSO - update head pointer to the correct position
            previous = current;
            this.head = current;
            // increment node to next node or null at end of list
            current = temp;
        }

        // Write your hypothesis on the time complexity of this method here
        // O(n)
    }
}


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
    }

    addToTail(val) {
        let newNode = new DoublyLinkedNode(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this.head;
        }

        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;

        return this.head;
    }

    findMid() {
        // Returns the middle node
        // Implement this as a singly linked list then as a doubly linked list
            // How do the implementation for singly and doubly vary if at all?

            let length = 0;
            let current = this.head;
            let midNode = 0;

            while(current) {
                length ++
                current = current.next;
                }

            midNode = Math.ceil(length / 2) - 1;

            current = this.head;
            while(current && midNode >= 0) {
                if (!current.next && midNode >= 1) {
                    return null;
                } else if (current && midNode === 0) {
                    return current.value;
                } else {
                    current = current.next;
                    midNode--
                }
            }


        // Write your hypothesis on the time complexity of this method here
    }

    reverse() {
        // Returns a new reversed version of the linked list
        let tempSll = new DoublyLinkedList();

        let current = this.head;
        while(current) {
            let newNode = new DoublyLinkedNode(current.value);
            newNode.next = tempSll.head;
            tempSll.prev = newNode;
            tempSll.head = newNode;
            tempSll.length++;
            current = current.next;
        }
        return tempSll;

        // Write your hypothesis on the time complexity of this method here
    }

    reverseInPlace() {
        // Reverses the linked list in-place
        // Iterate through the list once, changing the 'next' pointer of each node to that of the previous node.
        // copy the node.next (pointer) to a temp variable before setting it to previous.
        let current = this.head;
        let previous = null;

        while(current) {
            // save the next value or it is lost
            let temp = current.next;
            // reverse pointer
            current.next = previous;
            // increment previous to current node ALSO - update head pointer to the correct position
            previous = current;
            this.head = current;
            // increment node to next node or null at end of list
            current = temp;
            this.tail = current;
        }
        // Write your hypothesis on the time complexity of this method here
        // O(n);
    }
}

let dll = new DoublyLinkedList();




module.exports = {
    SinglyLinkedNode,
    SinglyLinkedList,
    DoublyLinkedNode,
    DoublyLinkedList
}
