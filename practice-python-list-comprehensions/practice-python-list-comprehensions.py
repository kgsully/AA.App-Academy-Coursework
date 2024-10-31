# -----------------------------------------------------------------------------------------------------------------------
# Vowels
# -----------------------------------------------------------------------------------------------------------------------

# Create a function that takes in a string. Using list comprehension, the function should return all of the vowels from the string.

print('\n---------------------------------------------------------------------------------')
print('Vowels')
print('---------------------------------------------------------------------------------')

# Write your function, here.
def vowels(string):
    return [l for l in string if l.lower() in 'aeiou']


print(vowels("An amazing person")) #> ['A', 'a', 'a', 'i', 'e', 'o']
print(vowels("Coding is cool")) #> ['o', 'i', 'i', 'o', 'o']
print(vowels("People are NICE")) #> ['e', 'o', 'e', 'a', 'e', 'I', 'E']

# -----------------------------------------------------------------------------------------------------------------------
# Third Power
# -----------------------------------------------------------------------------------------------------------------------

# Create a function that takes in a list, lst and returns the values multiplied to the third power.
# Hint: This should be a single line of code by using list comprehensions.

print('\n---------------------------------------------------------------------------------')
print('Third Power')
print('---------------------------------------------------------------------------------')

# Write your function, here.
def third(lst):
    return [num**3 for num in lst]

print(third([2, 4, 8])) #> [8, 64, 512]
print(third([3, 5, 6])) #> [27, 125, 216]
print(third([1, 3, 7])) #> [1, 27, 343]

# -----------------------------------------------------------------------------------------------------------------------
# Gas Prices
# -----------------------------------------------------------------------------------------------------------------------

# Create a function that takes in a list of prices, prices and a given value, val.
# Using list comprehension, return all of the prices that are greater than the given value.
# If the price is less than the given price, replace it with 0.
# Hint: This can be done in a single line of code.

print('\n---------------------------------------------------------------------------------')
print('Gas Prices')
print('---------------------------------------------------------------------------------')

# Write your function, here.
def gas_prices(lst, val):
    return [l if l > val else 0 for l in lst]


print(gas_prices([2.55, -1.45, 10.22, 5.78, -5.92, 6.16], 3.99)) #> [0, 0, 10.22, 5.78, 0, 6.16]
print(gas_prices([5.95, 6.62, 2.22, 6.78, 8.92, 7.03], 2.50)) #> [5.95, 6.62, 0, 6.78, 8.92, 7.03]
print(gas_prices([4.55, 4.15, 2.57, 3.78, 2.92, 0.16], 5.00)) #> [0, 0, 0, 0, 0, 0]

# -----------------------------------------------------------------------------------------------------------------------
# Fizz Buzz
# -----------------------------------------------------------------------------------------------------------------------

# Create a function that takes in a list, lst. The function should return a list including all the values divisible by both 3 and 5.
# Hint: This can be done in a single line of code.

print('\n---------------------------------------------------------------------------------')
print('Fizz Buzz')
print('---------------------------------------------------------------------------------')

# Write your function, here.
def fizzbuzz(lst):
    return [l for l in lst if l % 3 == 0 and l % 5 == 0]

print(fizzbuzz([15, 5, 10, 30])) #> [15, 30]
print(fizzbuzz([60, 20, 90, 20])) #> [60, 90]
print(fizzbuzz([-15, 120, 35, -30])) #> [-15, 120, -30]

# -----------------------------------------------------------------------------------------------------------------------
# Multiply List
# -----------------------------------------------------------------------------------------------------------------------

# Create a function that takes in two lists that returns the results of all the values in the first list multiplied by all the values in the second list.

print('\n---------------------------------------------------------------------------------')
print('Multiply List')
print('---------------------------------------------------------------------------------')

# Write your function, here.
def multiply_lists(lst1, lst2):
    return [val1 * val2 for val1 in lst1 for val2 in lst2]

print(multiply_lists([1, 2 ,3], [1, 5, 7])) #> [1, 5, 7, 2, 10, 14, 3, 15, 21]
print(multiply_lists([5, 6 ,2], [1, 4, 3])) #> [5, 20, 15, 6, 24, 18, 2, 8, 6]
print(multiply_lists([0, 2, 3], [8, 5, 2])) #> [0, 0, 0, 16, 10, 4, 24, 15, 6]

# -----------------------------------------------------------------------------------------------------------------------
# Dictionary Pairs
# -----------------------------------------------------------------------------------------------------------------------

# Create a function that takes in a list of key and list of value argument that returns a dictionary of key/value pairs.

print('\n---------------------------------------------------------------------------------')
print('Dictionary Pairs')
print('---------------------------------------------------------------------------------')

# Write your function, here.
def dictionary_pairs(keys, vals):
    return {key: val for key, val in zip(keys, vals)}

print(dictionary_pairs(["name", "age", "food"], ["James", 24, "steak"])) #> {'Name': 'James', 'Age': 24, 'Food': 'steak'}
print(dictionary_pairs(["name", "age", "food"], ["Vivian", 21, "sushi"])) #> {'Name': 'Vivian', 'Age': 21, 'Food': 'sushi'}
print(dictionary_pairs(["name", "age", "food"], ["Alex", 6, "chocolate"])) #> {'Name': 'Alex', 'Age': 6, 'Food': 'chocolate'}

# -----------------------------------------------------------------------------------------------------------------------
# Transpose Matrix
# -----------------------------------------------------------------------------------------------------------------------

# Create a function that takes in a matrix. The matrix is currently in the structure of columns. The function should return the matrix in the structure of rows.

# Bonus 1: This can be solved in a single line of code.

# Bonus 2: Try changing the matrix from rows back into columns.

print('\n---------------------------------------------------------------------------------')
print('Transpose Matrix')
print('---------------------------------------------------------------------------------')

# Write your function, here.
def matrix_rows(lst):
    # This is a nested list comprehension
    return [[row[i] for row in lst] for i in range(len(lst[0]))]

print(matrix_rows([[8, 2], [6, 3], [3, 7], [1, 2]]))  #> [[8, 6, 3, 1], [2, 3, 7, 2]]
print(matrix_rows([[1, 4], [3, 2], [1, 0], [9, 7]]))  #> [[1, 3, 1, 9], [4, 2, 0, 7]]
print(matrix_rows([[5, 6], [2, 8], [5, 2], [1, 0]]))  #> [[5, 2, 5, 1], [6, 8, 2, 0]]

# column = {
#   [8, 2],
#   [6, 3],
#   [3, 7],
#   [1, 2]
# }

# row = {
#   [8, 6, 3, 1],
#   [2, 3, 7, 2]
# }
