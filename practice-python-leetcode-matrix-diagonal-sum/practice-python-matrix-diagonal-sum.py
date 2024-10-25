# LeetCode 1572 - Matrix Diagonal Sum

# Given a square matrix mat, return the sum of the matrix diagonals.

# Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.

# Example 1:

# Input: mat = [[1,2,3],
#               [4,5,6],
#               [7,8,9]]
# Output: 25
# Explanation: Diagonals sum: 1 + 5 + 9 + 3 + 7 = 25
# Notice that element mat[1][1] = 5 is counted only once.

# Example 2:

# Input: mat = [[1,1,1,1],
#               [1,1,1,1],
#               [1,1,1,1],
#               [1,1,1,1]]
# Output: 8

# Example 3:

# Input: mat = [[5]]
# Output: 5

def diagonalSum(mat):
    j = 0
    k = len(mat[0]) - 1
    priSum = secSum = 0

    for i in range(len(mat)):
        priSum += mat[i][j]
        if j != k:
            secSum += mat[i][k]
        j += 1
        k -= 1

    return priSum + secSum

print(diagonalSum([[1,2,3],[4,5,6],[7,8,9]]))    #> 25
print(diagonalSum([[1,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,1]]))     #> 8
print(diagonalSum([[5]]))     #> 5
