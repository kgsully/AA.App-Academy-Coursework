const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  // Your code here
  if (!rootNode) return Infinity;

  let nodeVal = findMinBST(rootNode.left);

  // return Math.min(nodeVal, rootNode.val);

  if (rootNode.val < nodeVal) {
    return rootNode.val;
  } else return nodeVal;

}

function findMaxBST (rootNode) {
  // Your code here

  if (!rootNode) return -Infinity;

  let nodeVal = findMaxBST(rootNode.right);

  return Math.max(nodeVal, rootNode.val);

}

function findMinBT (rootNode) {
  // Your code here

  if(!rootNode) return Infinity;

  let leftVal = findMinBT(rootNode.left);
  let rightVal = findMinBT(rootNode.right);

  return Math.min(rootNode.val, leftVal, rightVal);

}

function findMaxBT (rootNode) {
  // Your code here

  if(!rootNode) return -Infinity;

  let leftVal = findMaxBT(rootNode.left);
  let rightVal = findMaxBT(rootNode.right);

  return Math.max(rootNode.val, leftVal, rightVal);

  // Iterative Solution
  // if (!rootNode) return -1;
  //   let max = rootNode.val;
  //   const stack = [rootNode];

  //   while (stack.length > 0) {
  //       let currentNode = stack.pop();
  //       if (currentNode.val > max) max = currentNode.val;

  //       if (currentNode.left) stack.push(currentNode.left);
  //       if (currentNode.right) stack.push(currentNode.right);
  //   }
  //   return max;

}

function getHeight (rootNode) {
  // Your code here

  if(!rootNode) {
    return -1;
  } else if (!rootNode.left && !rootNode.right) {
    return 0;
  }

  const leftSide = getHeight(rootNode.left);
  const rightSide = getHeight(rootNode.right);

  // leftSide / rightSide will eventually evaluate to either -1 or 0
  // taking the max of the 2 values disregards if a node does not exist on that side
  // and will only add based upon levels, not branches as when it unwinds the recursion,
  // it will take the maxinmum value between what is evaluated on the left and right, not add them
  // together.
  return Math.max(leftSide, rightSide) + 1;

}

function balancedTree (rootNode) {
  // Your code here

  if (!rootNode.left && !rootNode.right) return true;

  const leftCount = getHeight(rootNode.left);
  const rightCount = getHeight(rootNode.right);

  if ((rootNode.left && !rootNode.right) || (!rootNode.left && rootNode.right)) {
    if (Math.abs(leftCount - rightCount) <= 1) return true;
    return false;
  }

  return balancedTree(rootNode.left) && balancedTree(rootNode.right);

}

function countNodes (rootNode) {
  // Your code here
  const stack = [];
  let count = 0;

  // Put the starting node on a stack
  stack.push(rootNode);

  // While the stack is not empty
  while (stack.length > 0) {
    // Pop a node and print it
    let node = stack.pop();
    count++;

    // Put all of the node's children on the top of the stack (if they are not null)
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return count;

}

function getParentNode (rootNode, target) {
  // Your code here
  if (target === rootNode.val) return null;

  const stack = [];

  // Put the starting node on a stack
  stack.push(rootNode);

  // While the stack is not empty
  while (stack.length > 0) {
    let node = stack.pop();

    if (node.left) {
      if (target === node.left.val) return node;
      stack.push(node.left);
    }

    if (node.right) {
      if (target === node.right.val) return node;
      stack.push(node.right);
    }
  }
  return undefined;

}

function inOrderPredecessor (rootNode, target) {
  // Your code here
  let inOrderNodes = [];

  function traverseInOrder(currentNode) {
    if(!currentNode) return;
    traverseInOrder(currentNode.left);
    inOrderNodes.push(currentNode.val);
    traverseInOrder(currentNode.right);
  }

  traverseInOrder(rootNode);

  let index = inOrderNodes.indexOf(target) - 1;
  if (index === -1) return null;
  return inOrderNodes[index];
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  let parentNode = getParentNode(rootNode, target);
  let targetNode = null;

  // console.log("----------------------------");
  // console.log("Parent Node: ");
  // console.log(parentNode);

  // Undefined if the target cannot be found
  if (parentNode === undefined) return undefined;

  // Set target based on parent
  if (parentNode === null) {                    // no parent node means that the target is the root
    targetNode = rootNode;
  } else if (parentNode.left && target === parentNode.left.val) {      // left node
    targetNode = parentNode.left;
  } else if (parentNode.right && target === parentNode.right.val) {     // right node
    targetNode = parentNode.right;
  }

  // console.log("");
  // console.log("Target Node: ");
  // console.log(targetNode);
  // console.log("----------------------------");


  if (parentNode === null && targetNode.left === null && targetNode.right === null) {
    // Case 0: Zero children and no parent:
    //   return null

    // console.log("Case 0 Triggered - 0 children, no parent");

    return null;

  } else if (targetNode.left === null && targetNode.right === null) {
    // Case 1: Zero children:
    //   Set the parent that points to it to null

    // console.log("Case 1 Triggered - 0 children");

    if (parentNode.left.val === target) parentNode.left = null;
    if (parentNode.right.val === target) parentNode.right = null;

    // console.log("");
    // console.log("Updated Parent Node:");
    // console.log(parentNode);
    // console.log("----------------------------");

  } else if ((targetNode.left !== null && targetNode.right === null) || (targetNode.left === null && targetNode.right !== null)) {
    // Case 2: One child:
    //   Make the parent point to the child

    // console.log("Case 2 Triggered - 1 child");
    // console.log("");

    // console.log("Parent Node:");
    // console.log(parentNode);
    // console.log("");

    // console.log("Target Value: " + target);
    // console.log("");

    // console.log("Target Node:");
    // console.log(targetNode);
    // console.log("");

    // let targetChild = (targetNode.left || targetNode.right)
    // console.log("Target Child Node:");
    // console.log(targetChild);
    // console.log("");

    if (parentNode.left) {
      if (target === parentNode.left.val) parentNode.left = targetChild;

    }

    if (parentNode.right) {
      if (target === parentNode.right.val) parentNode.right = targetChild;
    }

    // console.log("Updated Parent Node:");
    // console.log(parentNode);
    // console.log("----------------------------");

  }

  else if (targetNode.left !== null && targetNode.right !== null) {
    // Case 3: Two children:
    //  Set the value to its in-order predecessor, then delete the predecessor
    //  Replace target node with the left most child on its right side,
    //  or the right most child on its left side.
    //  Then delete the child that it was replaced with.

    // console.log("Case 3 Triggered - 2 children");
    // console.log("");

    let predecessor = inOrderPredecessor(rootNode, target);
    deleteNodeBST(targetNode, predecessor);
    targetNode.val = predecessor


  }
}




module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
