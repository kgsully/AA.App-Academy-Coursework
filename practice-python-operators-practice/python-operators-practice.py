#Is Divisible By 5
#Create a function that returns `True` if an integer is evenly divisible by 5, and `False` otherwise.

def divisible_by_five(n):
    return n%5 == 0

print('\n-----------------------------------------------------------------------------------------------------------')
print('Is Divisible By 5:')
print('Create a function that returns `True` if an integer is evenly divisible by 5, and `False` otherwise.')
print('-----------------------------------------------------------------------------------------------------------')
print(divisible_by_five(5))    #> True
print(divisible_by_five(-55))  #> True
print(divisible_by_five(37))   #> False

# Calculate Exponent
# Create a function that takes a base number and an exponent number and returns the calculation. You should be able to do this with one line in the body of your function.

def calculate_exponent(num, exp):
    return num**exp

print('\n-----------------------------------------------------------------------------------------------------------')
print('Calculate Exponent:')
print('Create a function that takes a base number and an exponent number and returns the calculation.')
print('You should be able to do this with one line in the body of your function.')
print('-----------------------------------------------------------------------------------------------------------')
print(calculate_exponent(5, 5))     #> 3125
print(calculate_exponent(10, 10))   #> 10000000000
print(calculate_exponent(3, 3))     #> 27

# Remainder Of Two Numbers
# There is a single operator in Python, capable of providing the remainder of a division operation.
# Two numbers are passed as parameters. The first parameter divided by the second parameter will have a remainder, possibly zero. Return that value.
# You should be able to do this with one line in the body of your function.

def remainder(n1, n2):
    return n1 % n2

print('\n-----------------------------------------------------------------------------------------------------------')
print('Remainder Of Two Numbers:')
print('There is a single operator in Python, capable of providing the remainder of a division operation.')
print('Two numbers are passed as parameters. The first parameter divided by the second parameter will have a remainder, possibly zero. Return that value.')
print('You should be able to do this with one line in the body of your function.')
print('-----------------------------------------------------------------------------------------------------------')
print(remainder(1, 3))  #> 1
print(remainder(3, 4))  #> 3
print(remainder(5, 5))  #> 0
print(remainder(7, 2))  #> 1

# First Before Second
# You are given three inputs: a string, one letter, and a second letter.
# Write a function that returns `True` if every instance of the first letter occurs before every instance of the second letter.

def first_before_second(str, first, second):
    return not(first in str[str.find(second):])

# Alternative Solutions:
# ------------------------------------------------------
# def first_before_second(s, first, second):
#     return s.rindex(first) < s.index(second)

## Here's another variant, with the while loop
# def first_before_second_while(s, first, second):
#     first_last_index = 0
#     second_first_index = 0
#     i = 0
#     while i < len(s):
#         if s[i] == first:
#             first_last_index = i
#         i += 1
#     i = 0
#     while i < len(s):
#         if s[i] == second:
#             second_first_index = i
#             break
#         i += 1
#     return first_last_index < second_first_index

print('\n-----------------------------------------------------------------------------------------------------------')
print('First Before Second:')
print('You are given three inputs: a string, one letter, and a second letter.')
print('Write a function that returns `True` if every instance of the first letter occurs before every instance of the second letter.')
print('-----------------------------------------------------------------------------------------------------------')
print(first_before_second("a rabbit jumps joyfully", "a", "j"))
#> True
# Every instance of "a" occurs before every instance of "j".

print(first_before_second("knaves knew about waterfalls", "k", "w"))
#> True

print(first_before_second("happy birthday", "a", "y"))
#> False
# The "a" in "birthday" occurs after the "y" in "happy".

print(first_before_second("precarious kangaroos", "k", "a"))
#> False

# Equality in Python
# Try to explore the difference between equality operators in JavaScript and Python. Try comparing primitive data types using `==` and then reference data types.

x = 1
y = '1'
list1 = [1, 2]
list2 = [1, 2]
list3 = [2, 3]

# Use "==" to compare these values and see what gets printed! How does this
# compare with JavaScripts "==="?
print('\n-----------------------------------------------------------------------------------------------------------')
print('Equality in Python:')
print('Try to explore the difference between equality operators in JavaScript and Python.')
print('Try comparing primitive data types using `==` and then reference data types.')
print('-----------------------------------------------------------------------------------------------------------')
# Compare "x" with itself
print(x == x)
# Compare "x" with "y"
print(x == y)
# Compare "list1" with "list2"
print(list1 == list2)
# Compare "list1" with "list3"
print(list1 == list3)

# Comparison in Python
# Try to explore the difference between comparison operators in JavaScript and Python. Mainly, compare variables using `==` and `is` and see how they differ.
# Try using the `not` keyword and the `!` operator as well.

x = 1
y = '1'
list1 = [1, 2]
list2 = [1, 2]

print('\n-----------------------------------------------------------------------------------------------------------')
print('Comparison in Python:')
print('Try to explore the difference between comparison operators in JavaScript and Python.')
print('Mainly, compare variables using `==` and `is` and see how they differ.')
print('Try using the `not` keyword and the `!` operator as well.')
print('-----------------------------------------------------------------------------------------------------------')
# Use the equality and identity comparison operators to compare:
# 1. x with itself
print(x == x)
print(x is x)
# 2. x with y
print(x == y)
print(x is y)
# 3. list1 with list2
print(list1 == list2)
print(list1 != list2)
print(list1 is list2)
print(list1 is not list2)
