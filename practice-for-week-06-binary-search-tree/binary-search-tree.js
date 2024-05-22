const { Queue } = require('../data-structures-linked-lists-queue-starter/implementation/03-queue.js');

// Do not change this
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {

  constructor() {
    // Your code here
    this.root = null;

  }

  insert(val, currentNode=this.root) {
    // Your code here
    let newNode = new TreeNode(val);

    if (!this.root) {
      this.root = newNode;
    } else {
      while(currentNode) {
        if (newNode.val < currentNode.val) {
          if (!currentNode.left) {
            currentNode.left = newNode;
            break;
          } else {
            currentNode = currentNode.left;
          }
        } else if (newNode.val > currentNode.val) {
          if (!currentNode.right) {
            currentNode.right = newNode;
            break;
          } else {
            currentNode = currentNode.right;
          }
        }
      }
    }

  }

  search(val) {
    // Your code here
    let currentNode = this.root;

    while(currentNode !== null) {

      if (currentNode.val === val) return true;

      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }


  preOrderTraversal(currentNode = this.root) {
    // Your code here

    // Base case - return if current node is = null
    // Steps:
    //    1. Print the current node value
    //    2. Recursively call the left subtree
    //    2. Recursively call the right subtree

    if (currentNode === null) return;               // base case

    console.log(currentNode.val);                   // step 1

    this.preOrderTraversal(currentNode.left)        // step 2

    this.preOrderTraversal(currentNode.right);      // step 3

  }


  inOrderTraversal(currentNode = this.root) {
    // Your code here

    // Base case - return if current node is = null
    // Steps:
    //    1. Recursively call the left subtree
    //    2. Print the current node value
    //    2. Recursively call the right subtree

    if (currentNode === null) return;               // base case

    this.inOrderTraversal(currentNode.left)         // step 1

    console.log(currentNode.val);                   // step 2

    this.inOrderTraversal(currentNode.right);       // step 3

  }


  postOrderTraversal(currentNode = this.root) {
    // Your code here

    // Base case - return if current node is = null
    // Steps:
    //    1. Recursively call the left subtree
    //    2. Print the current node value
    //    2. Recursively call the right subtree

    if (currentNode === null) return;               // base case

    this.postOrderTraversal(currentNode.left)       // step 1

    this.postOrderTraversal(currentNode.right);     // step 2

    console.log(currentNode.val);                   // step 3

  }

    // Breadth First Traversal - Iterative
  breadthFirstTraversal() {
    // your code here

    const queue = new Queue();                // note that this behavior could also be implemented with an array, then using push and shift
    // Put the starting node in a queue
    queue.enqueue(this.root);

    // While the queue is not empty
    while (queue.length > 0) {
      // Dequeue a node and print it
      let node = queue.dequeue();
      console.log(node.val);

      // Put all of the node's children in the back of the queue (if they are not null)
      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);

    }

  }

  // Depth First Traversal - Iterative
  depthFirstTraversal() {
    // your code here

    const stack = [];

    // Put the starting node on a stack
    stack.push(this.root);

    // While the stack is not empty
    while (stack.length > 0) {
      // Pop a node and print it
      let node = stack.pop();
      console.log(node.val);

      // Put all of the node's children on the top of the stack (if they are not null)
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }




  }
}

module.exports = { BinarySearchTree, TreeNode };
