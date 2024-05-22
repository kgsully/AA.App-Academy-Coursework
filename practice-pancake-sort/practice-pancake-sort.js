const pancakeSort = function(arr) {
    let retArr = [];
    let endIndex = arr.length - 1;

    while (endIndex > 0) {
        let max = arr[0];

        console.log("End Index: " + endIndex);
        console.log("");

        for (let i = 0; i <= endIndex; i++) {
            if (arr[i] > max) max = arr[i];
        }

        let maxIndex = arr.indexOf(max);
        retArr.push(maxIndex);
        console.log("Max Index: " + maxIndex);
        console.log("");

        let tempArr = [...arr.slice(0, maxIndex + 1).reverse(), ...arr.slice(maxIndex + 1)];
        console.log("Temp Arr: ");
        console.log(tempArr);
        console.log("");

        arr = [...tempArr.slice(0, endIndex + 1).reverse(), ...tempArr.slice(endIndex + 1)];

        endIndex--;


        console.log("Arr: ")
        console.log(arr);
        console.log("----------")
        console.log("");
    }

    return retArr;
};

let arr = [3, 2, 4, 1];
console.log(pancakeSort(arr));
