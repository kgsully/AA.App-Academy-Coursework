# --------------------------------------------------------------------------------------------------------
# Create Set from List
# --------------------------------------------------------------------------------------------------------
# Given a list of items, create a set from the list. Note the differences with performing the same action in JavaScript.

print('\n--------------------------------------------------------------------------------')
print('Create Set from List')
print('--------------------------------------------------------------------------------')

# Write your code here.
# (Hint: Does declaring a new set require any keywords like `new`?) ---> No, it does not

lst = ['a', 'b', 'c', 'd']
setLst = set(lst)

print(lst)
print(setLst)

# --------------------------------------------------------------------------------------------------------
# Add to Set from List
# --------------------------------------------------------------------------------------------------------
# Given a set, st, and a list, lst, write a function, add_to_set, that merges the st to lst and returns the result.

print('\n--------------------------------------------------------------------------------')
print('Add to Set from List')
print('--------------------------------------------------------------------------------')

# Write your code here.
def add_to_set(st, lst):
    return (st | set(lst))
    # can alternatively use the .update() function
    # st.update(lst)
    # return st

st = { 1, 2, 3, 4 }
lst = [12, 4, 42, 93, 2, 85]

print(add_to_set(st, lst))    # { 1, 2, 3, 4, 42, 12, 85, 93 }

# --------------------------------------------------------------------------------------------------------
# Left Difference
# --------------------------------------------------------------------------------------------------------
# Given two sets, write a function, left_diff, that returns the "left" difference of the two sets,
# where the left difference refers to all elements that are in the first set, but not in the second set.

print('\n--------------------------------------------------------------------------------')
print('Left Difference')
print('--------------------------------------------------------------------------------')

# Write your code here.
def left_diff(set1, set2):
    return set1 - set2

set1 = { 1, 2, 5, 10 }
set2 = { 2, 6, 10, 12 }

print(left_diff(set1, set2))    # { 1, 5 }

# --------------------------------------------------------------------------------------------------------
# Remove Repeats
# --------------------------------------------------------------------------------------------------------
# Given two strings, write a function, remove_repeats that returns a set of the uncommon
# characters from both strings. Do NOT use the ^ operator.

print('\n--------------------------------------------------------------------------------')
print('Remove Repeats')
print('--------------------------------------------------------------------------------')

# Write your code here.
def remove_repeats(str1, str2):
    diff1 = set(str1) - set(str2)
    diff2 = set(str2) - set(str1)
    return diff1 | diff2

str1 = 'aloha'
str2 = 'bonjour'

print(remove_repeats(str1, str2))    # {'r', 'a', 'l', 'h', 'n', 'b', 'j', 'u'}

# --------------------------------------------------------------------------------------------------------
# Check Binary
# --------------------------------------------------------------------------------------------------------
# Given a string, str, write a function, check_binary, that returns whether or not str is a valid binary string.
# While there are many ways to solve this, try to implement a solution using a set.

print('\n--------------------------------------------------------------------------------')
print('Check Binary')
print('--------------------------------------------------------------------------------')

# Write your code here.
def check_binary(str):
    strSet = set(str)
    return strSet == {'0', '1'} or strSet == {'0'} or strSet == {'1'}


str1 = '1010001010010100101'
str2 = '1010010015010101010'

print(check_binary(str1))       # True
print(check_binary(str2))       # False
