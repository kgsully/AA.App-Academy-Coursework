const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.capacity = numBuckets;
    this.count = 0;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    // Your code here
    let hash = 0;                                     // initialize hash value
    let hexArr = sha256(key).slice(0, 8).split('');   // extract 1st 8 chars of SHA256 key (hex encoded, provided as string)
    let hexVals = {
      a: 10,
      b: 11,
      c: 12,
      d: 13,
      e: 14,
      f: 15
    }

    // convert hext string output to decimal value to assign hash
    let val = 0;
    for(let i = 0; i < hexArr.length; i++) {
      if (hexVals[hexArr[i]] !== undefined) {
        val = hexVals[hexArr[i]];
      } else {
        val = Number(hexArr[i]);
      }

      hash += val * 16 ** (hexArr.length - 1 - i);
    }
    return hash;
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    // Your code here
    let newKeyValPair = new KeyValuePair(key, value);
    let bucketLoc = this.hashMod(key);

    if (this.data[bucketLoc] !== null) { // hash collision
      throw new Error('hash collision or same key/value pair already exists!');
    } else {
      this.data[bucketLoc] = newKeyValPair;
      this.count++
    }
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    let newKeyValPair = new KeyValuePair(key, value);
    let bucketLoc = this.hashMod(key);

    if (this.data[bucketLoc] !== null) { // hash collision
      newKeyValPair.next = this.data[bucketLoc];
      this.data[bucketLoc] = newKeyValPair;
      this.count++
    } else {
      this.data[bucketLoc] = newKeyValPair;
      this.count++
    }
  }

  insert(key, value) {
    // Your code here
    let newKeyValPair = new KeyValuePair(key, value);
    let bucketLoc = this.hashMod(key);
    let updatedFlag = false;

    function checkBucket(element, key, value) {   // function to check / update the key / value in the bucket. traverse linked list if necessary

      if (element['key'] === key) {
        element['value'] = value;
        updatedFlag = true;
        return;
      }

      if (element.next === null) return;

      checkBucket(element.next, key, value);
    }

    if (this.count > 0) {
      for (let i = 0; i < this.data.length; i++) {  // check each bucket in the hash table for same key and update the value
        if(this.data[i] !== null) {
          checkBucket(this.data[i], key, value);
          if (updatedFlag) return;
          }
        }
      }

    if (!updatedFlag) {
      if (this.data[bucketLoc] !== null) { // hash collision
        newKeyValPair.next = this.data[bucketLoc];
        this.data[bucketLoc] = newKeyValPair;
        this.count++
      } else {
        this.data[bucketLoc] = newKeyValPair;
        this.count++
      }
    }
  }

}

module.exports = HashTable;
