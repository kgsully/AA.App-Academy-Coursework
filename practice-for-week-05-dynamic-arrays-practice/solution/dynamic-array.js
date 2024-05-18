class DynamicArray{

  constructor(defaultSize=4) {
    // Your code here
    this.capacity = defaultSize;
    this.data = new Array(this.capacity);
    this.length = 0;
  }

  read(index) {

    // Your code here

    return this.data[index];
  }

  unshift(val) {

    // Your code here
    for (let i = this.data.length - 1; i > 0; i--) {
      if (this.data[i - 1] !== undefined) {
        this.data[i] = this.data[i - 1];
      }
    }
    this.data[0] = val;
    this.length++
  }

}


module.exports = DynamicArray;
