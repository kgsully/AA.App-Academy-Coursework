function anagrams(str1, str2) {
  // Your code here
  let set1 = new Set(str1);
  let set2 = new Set(str2);

  // check that set1 size = set2 size. If not, they cannot be anagrams
  if (set1.size != set2.size) return false;

  for (let val of set1) {
    if (!set2.has(val)) return false;
  }

  return true;
}

function commonElements(arr1, arr2) {
  // Your code here

  let set1 = new Set(arr1);
  let set2 = new Set(arr2);
  let commonArr = [];

  for (let val of set1) {
    if (set2.has(val)) commonArr.push(val);
  }

  return commonArr;

}

function duplicate(arr) {
  // Your code here
  let set = new Set();

  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) return arr[i];
    set.add(arr[i]);
  }

}

function twoSum(nums, target) {
  // Your code here

  let numsSet = new Set(nums);

  for (let i = 0; i < nums.length; i++) {
    numsSet.delete(nums[i]);
    if (numsSet.has(target - nums[i])) return true;
    numsSet.add(nums[i]);
  }
  return false;
}

function wordPattern(pattern, strings) {
  // Your code here
  // use a set to generate unique values for pattern
  const patternSet = new Set(pattern);
  const stringSet = new Set(strings);

  if (patternSet.size !== stringSet.size) return false;

  let patternMap = {};

  let i = 0;
  while (patternSet.size > 0)  {
    if (patternSet.has(pattern[i])) {
      patternMap[pattern[i]] = strings[i];
      patternSet.delete(pattern[i]);
    }
    i++;
  }

  for (let i = 0; i < strings.length; i++) {
    let expectedVal = patternMap[pattern[i]];
    if (strings[i] !== expectedVal) return false;
  }

  return true;

}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
