class LinkedListNode {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    // Your code here
    this.head = null;
    this.length = 0;
  }

  addToHead(val) {
    // Your code here

    // Multi-line implementation - uses provided LinkedListNode constructor that initializes next to null and does not accept a next argument
    let newNode = new LinkedListNode(val, null);
    newNode.next = this.head;
    this.head = newNode;

    // Single line implementation - requires the LinkedListNode constructor to accept an argument for 'next'
    // this.head = new LinkedListNode(val, this.head);

    this.length++;
  }

  addToTail(val) {
    // Your code here
    let newNode = new LinkedListNode(val);
    let current = this.head;

    if (!current) {
      this.head = newNode;
      this.length++
      return;
    }

    while (current) {
      if (!current.next) {
        current.next = newNode;
        this.length++
        return;
      } else {
        current = current.next;
      }
    }

  }

  // You can use this function to help debug
  print() {
    let current = this.head;

    while (current) {
      process.stdout.write(`${current.value} -> `);
      current = current.next;
    }

    console.log("NULL");
  }
}

let linkedList = new LinkedList();

// linkedList.addToHead(1);
// linkedList.addToHead(2);
// linkedList.addToHead(3);

// linkedList.addToTail(1);
// linkedList.addToTail(2);
// linkedList.addToTail(3);

// linkedList.print();

module.exports = LinkedList;
