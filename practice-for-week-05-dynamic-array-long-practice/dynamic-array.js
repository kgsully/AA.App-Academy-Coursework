class DynamicArray {

  constructor(defaultSize = 4) {

    // Your code here
    this.capacity = defaultSize;
    this.data = new Array(this.capacity);
    this.length = 0;
  }

  read(index) {

    // Your code here
    return this.data[index];
  }

  push(val) {

    // Your code here
    if (this.data[this.capacity - 1] !== undefined) {
      this.resize();
    }

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === undefined) {
        this.data[i] = val;
        this.length++;
        return;
      }
    }
  }

  pop() {

    // Your code here
    let tempVal = this.data[this.length - 1];
    this.data[this.length - 1] = undefined;
    if (this.length > 0) {
      this.length--;
    }
    return tempVal;
  }

  shift() {

    // Your code here
    let tempVal = this.data[0];
    for (let i = 0; i < this.length; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.data[this.length - 1] = undefined;
    if (this.length > 0) {
      this.length--;
    }

    return tempVal;
  }

  unshift(val) {

    // Your code here
    if (this.data[this.capacity - 1] !== undefined) {
      this.resize();
    }

    for (let i = this.data.length - 1; i > 0; i--) {
      if (this.data[i - 1] !== undefined) {
        this.data[i] = this.data[i - 1];
      }
    }
    this.data[0] = val;
    this.length++
  }

  indexOf(val) {

    // Your code here
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === val) {
        return i;
      }
    }
    return -1;
  }

  resize() {

    // Your code here
    this.capacity *= 2;
    let tempArr = new Array(this.capacity);
    for (let i = 0; i < this.length; i++) {
      tempArr[i] = this.data[i];
    }
    this.data = tempArr;

  }

}


module.exports = DynamicArray;
