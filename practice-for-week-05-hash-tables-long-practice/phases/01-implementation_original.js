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
    this.count = 0;
    this.data = new Array(this.capacity).fill(null);
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

    // determine load factor and if hash table should be resized before insertion
    // using 0.7 load factor as criteria for requiring resizing -
    let loadFactor = (this.count / this.capacity);
    if (loadFactor >= 0.7) this.resize();

    // Handle insertion w/ update and collision handling via linked list chaining
    let newKeyValuePair = new KeyValuePair(key, value);
    let bucketLoc = this.hashMod(key);
    let updateFlag = false;
    let exitWhile = false;

    // user arrow function to force context                     // recursive solution
    // const checkForUpdate = (element, key, value) => {
    //   if (element['key'] === key) {
    //     element['value'] = value;
    //     updateFlag = true;
    //     return;
    //   }
    //   if (element.next === null) return;
    //   checkForUpdate(element.next, key, value);
    // }

    if (this.data[bucketLoc] !== null) {
      // checkForUpdate(this.data[bucketLoc], key, value);      // recursive solution
      let element = this.data[bucketLoc];
      while (!exitWhile) {
        if (element['key'] === key) {
              element['value'] = value;
              updateFlag = true;
              exitWhile = true;
        }
        if (element.next === null) exitWhile = true;
        element = element.next;
      }

      if (!updateFlag) {
        newKeyValuePair.next = this.data[bucketLoc];
        this.data[bucketLoc] = newKeyValuePair;
        this.count++;
      }
    } else {
      this.data[bucketLoc] = newKeyValuePair;
      this.count++;
    }

  }

  read(key) {
    // Your code here
    let readLoc = this.hashMod(key);
    let exitWhile = false;
    // use arrow function to force context                // recursive solution
    // const readBucket = (element, key) => {
    //   if (element['key'] === key) {
    //     return element['value'];
    //   }
    //   if (element.next === null) return;
    //   return readBucket(element.next, key);
    // }
    if (this.data[readLoc] !== null) {
      // return readBucket(this.data[readLoc], key);      // recursive solution
      let element = this.data[readLoc];
      while (!exitWhile) {

          if (element['key'] === key) {
            return element['value'];
          }
          if (element.next === null) {
            exitWhile = true;
            continue;
          }
          element = element.next;
      }
    } else return undefined;
  }

  resize() {
    // Your code here

    let dataBuffer = new Array(this.capacity).fill(null);

    // create data buffer as reference for remapping. Want to be able to
    // use the insert functions already written against this.data so buffer the current
    // data first
    for(let i = 0; i < this.data.length; i++) {
      dataBuffer[i] = this.data[i];
    }

    // re-initialize the data array to double it's current size
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;

    // use arrow function to force context                    // recursive solution
    // const readAndRemap = (element) => {
    //   if (element === null) return;
    //   this.insert(element['key'], element['value']);
    //   readAndRemap(element.next);
    // }

    for (let i = 0; i < dataBuffer.length; i++) {
      // readAndRemap(dataBuffer[i]);                         // recursive solution
      let element = dataBuffer[i];
      let exitWhile = false;
      while (!exitWhile) {
        if (element === null) {
          exitWhile = true;
          continue;
      }
      this.insert(element['key'], element['value']);
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
    let deleteFlag = false;
    let exitWhile = false;

    // use arrow function to force context
    // const findDelete = (element, key) => {                           // recursive solution
    //   if (element.next['key'] === key) {
    //     element.next = element.next.next;
    //     deleteFlag = true;
    //     this.count--;
    //   }
    //   if (deleteFlag || element.next === null) return;
    //   findDelete(element.next, key);
    // }

    if (this.data[deleteLoc] !== null) {
      if (this.data[deleteLoc]['key'] === key && this.data[deleteLoc].next === null) {          // Scenario 1 - bucket root, .next = null
        this.data[deleteLoc] = null;
        this.count--;
        deleteFlag = true;
      } else if (this.data[deleteLoc]['key'] === key && this.data[deleteLoc].next !== null) {   // Scenario 2 - bucket root, .next != null
        this.data[deleteLoc] = this.data[deleteLoc].next;
        this.count--;
        deleteFlag = true;
      } else if (this.data[deleteLoc].next !== null) {
          // findDelete(this.data[deleteLoc], key);                     // recursive solution
          let element = this.data[deleteLoc];
          while (!exitWhile) {                                                                   // Scenario 3 - KV pair in middle of linked list
            if (element.next['key'] === key) {
              element.next = element.next.next;
              deleteFlag = true;
              this.count--;
            }
            if (deleteFlag || element.next === null) exitWhile = true;
            element = element.next
          }
      }

    }

    if (!deleteFlag) return "Key not found";
  }
}

module.exports = HashTable;
