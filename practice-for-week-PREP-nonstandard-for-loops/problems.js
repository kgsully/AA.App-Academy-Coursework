function oddIndices(arr) {
    // Return an array containing all the odd indices in the array
    // Your code here
    let retArr = [];
    for (let i = 1; i < arr.length; i += 2) {
        retArr.push(arr[i]);
    }
    return retArr;
}

function oddReverse(arr) {
    // Return an array containing all the odd indices starting from the end
    // Your code here
    let retArr = [];
    let startIndex = 0;
    if (arr.length % 2 === 0) {
        startIndex = arr.length - 1;
    } else {
        startIndex = arr.length -2;
    }
    for (let i = startIndex; i > 0; i -= 2) {
        retArr.push(arr[i]);
    }
    return retArr;
}

function secondPower(arr) {
    // Return an array containing all indices that are powers of 2
    // Your code here
    let retArr = [];
    for (let i = 1; i < arr.length; i *= 2) {
        retArr.push(arr[i]);
    }
    return retArr;
}

function nthPower(arr, n) {
    // Return an array containing all indices that are powers of n
    // Your code here
    let retArr = [];
    for (let i = 1; i < arr.length; i *= n) {
        retArr.push(arr[i]);
    }
    return retArr;
}

function firstHalf(arr) {
    // Return an array containing the first half of an array
    // Include middle index on odd length arr
    // Your code here
    let retArr = [];
    for (let i = 0; i < arr.length / 2; i++) {
        retArr.push(arr[i]);
    }
    return retArr;
}

function secondHalf(arr) {
    // Return an array containing the second half of an array
    // Exclude middle index on odd length arr
    // Your code here
    let retArr = [];
    for (let i = arr.length -1; i >= arr.length / 2; i--) {
        retArr.push(arr[i]);
    }
    return retArr;
}

module.exports = {
    oddIndices,
    oddReverse,
    secondPower,
    nthPower,
    firstHalf,
    secondHalf
}
