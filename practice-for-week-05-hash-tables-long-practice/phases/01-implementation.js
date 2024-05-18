class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }

  insert(key, value) {
    // Your code here
    const loadFactor = 0.7
    if ((this.count / this.capacity) > loadFactor) this.resize();

    let bucketLoc = this.hashMod(key);
    let element = this.data[bucketLoc];
    while (element !== null && element.key !== key) {
      element = element.next;
    }
    if (element !== null) {
      element.value = value;
    } else {
      let newKeyValuePair = new KeyValuePair(key, value);
      newKeyValuePair.next = this.data[bucketLoc];
      this.data[bucketLoc] = newKeyValuePair;
      this.count++;
    }
  }

  read(key) {
    // Your code here
    let readLoc = this.hashMod(key);
    let element = this.data[readLoc];

    while (element !== null && element.key !== key)  {
      element = element.next
    }
    if (element !== null) {
      return element.value;
    } else {
      return undefined;
    }
  }

  resize() {
    // Your code here

    let dataBuffer = this.data;
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;

    for (let i = 0; i < dataBuffer.length; i++) {
      let element = dataBuffer[i];
      while (element !== null) {
        this.insert(element.key, element.value);
        element = element.next;
      }
    }

  }

  delete(key) {
    // Your code here

    // Scenarios -
    // 1. KV pair at bucket root, next pointer null
    // 2. KV pair at bucket root, next pointer to KV pair
    // 3. KV pair in the middle of linked list chain

    let deleteLoc = this.hashMod(key);
    let element = this.data[deleteLoc];
    let prevElement = null;

    while (element !== null && element.key !== key) {
      prevElement = element;
      element = element.next;
    }

    if (element === null) return "Key not found";

    if (prevElement !== null) {
      prevElement.next = element.next;
    } else {
      this.data[deleteLoc] = element.next;
    }
    this.count--;
  }
}

module.exports = HashTable;
