# LeetCode 976 - Largest Perimeter Triangle

# Given an integer array nums, return the largest perimeter of a triangle with a non-zero area, formed from three of these lengths. If it is impossible to form any triangle of a non-zero area, return 0.

# Example 1:

# Input: nums = [2,1,2]
# Output: 5
# Explanation: You can form a triangle with three side lengths: 1, 2, and 2.

# Example 2:

# Input: nums = [1,2,1,10]
# Output: 0
# Explanation:
# You cannot use the side lengths 1, 1, and 2 to form a triangle.
# You cannot use the side lengths 1, 1, and 10 to form a triangle.
# You cannot use the side lengths 1, 2, and 10 to form a triangle.
# As we cannot use any three side lengths to form a triangle of non-zero area, we return 0.

# Constraints:

#     3 <= nums.length <= 104
#     1 <= nums[i] <= 106


# Solution:
# 1. Determine if any combination of the values in the argument to the function can create a triangle
#        - Use the triangle inequality theorem - the sum of 2 sides of a triangle must be greater than the 3rd side.
#          If this is true for all 3 combinations, you have a valid triangle
# 2. If there is a valid triangle, calculate the perimeter
# 3. Do this for all valid combinations and return the largest value

def largestPerimeter(nums):
    # If there are fewer than 3 values in the nums list, it can't be a triangle so return 0
    if(len(nums) < 3):
        return 0

    # Initialize perimeter to 0
    longestPerimeter = 0

    for i in range(len(nums)-2):
        num1 = nums[i]
        for j in range(i+1, len(nums)-1):
            num2 = nums[j]
            for k in range(j+1, len(nums)):
                num3 = nums[k]
                # Triangle inequality theorem tests conditional statement
                if((num1 + num2 > num3) and (num1 + num3 > num2) and (num2 + num3 > num1)):
                    perimeter = num1 + num2 + num3
                    if(perimeter > longestPerimeter):
                        longestPerimeter = perimeter
    return longestPerimeter

print()

print('Test Case 1:')
print('Input: [2 ,1, 2]  --> Expected Result: 5')
print(f'Result: {largestPerimeter([2,1,2])}')

print()

print('Test Case 2:')
print('Input: [1,2,1,10]  --> Expected Result: 0 (no 3 side length combinations form a triangle)')
print(f'Result: {largestPerimeter([1,2,1,10])}')
