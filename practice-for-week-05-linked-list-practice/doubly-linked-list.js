class DoublyLinkedListNode {
  constructor(val) {
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    // Your code here
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addToHead(val) {
    // Your code here

    // Multi-line implementation - uses provided LinkedListNode constructor that initializes next to null and does not accept a next argument
    let newNode = new DoublyLinkedListNode(val);
    newNode.next = this.head;

    if (this.head) this.head.prev = newNode;
    this.head = newNode;

    //
    if(!this.tail) {
      this.tail = this.head;
    }

    this.length++;

  }

  addToTail(val) {
    // Your code here
    let newNode = new DoublyLinkedListNode(val);
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

  }

  // You can use this function to help debug
  print() {
    let current = this.head;

    while (current) {
      // process.stdout.write(`${current.value} <-> `);
      console.log(current);
      console.log("");
      current = current.next;
    }

    console.log("NULL");
  }
}

// let doublyLinkedList = new DoublyLinkedList();

// doublyLinkedList.addToTail(1);
// doublyLinkedList.addToTail(2);
// doublyLinkedList.addToTail(3);

// doublyLinkedList.print();



module.exports = DoublyLinkedList;
