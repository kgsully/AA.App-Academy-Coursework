# --------------------------------------------------------------------------------------------------------------
# Explore the Range
# --------------------------------------------------------------------------------------------------------------
# It's time to explore the range object and how to use it with loops.
# Follow the instructions in the code comments. Be sure to test your work by running your code!

print('\n--------------------------------------------------------------------------')
print('Explore the Range')
print('--------------------------------------------------------------------------')

print('THREE CASES FOR RANGE')
print('A) End Value')

# STEP 1: Change the zero in the range to 10
#         Notice how "10" is not included in the output
for i in range(10):
    print(i)

print('B) Start & End Values')

# STEP 2: Code a `for` loop to print numbers 5 through 9
for j in range(5, 10):
    print(j)

print('C) Only Even Values')

# STEP 3: Print 0, 2, 4, 6 and 8 using a for loop
#         Hint - range can take a 3rd parameter for the step distance
for k in range(0, 9, 2):
    print(k)

# --------------------------------------------------------------------------------------------------------------
# Range Loops
# --------------------------------------------------------------------------------------------------------------
# It's time to practice writing a for loop with the range in Python.
# As you've seen, the syntax is similar to JavaScript, except using : at the end of the
# loop definition and indentation for the block of code to run with that loop.

print('\n--------------------------------------------------------------------------')
print('Range Loops')
print('--------------------------------------------------------------------------')

# Powers of 2 from 1 to 16
# Write a for loop that uses the range function to
# print the powers of 2 from 2 - 65536, that is
# from 2^1st - 2^16th powers
for i in range(1, 17):
    print(2**i)

# --------------------------------------------------------------------------------------------------------------
# Factorial
# --------------------------------------------------------------------------------------------------------------
# Write the factorial function.
# Remember, for a number n, the factorial is all numbers from 1 to n multiplied together.

print('\n--------------------------------------------------------------------------')
print('Factorial')
print('--------------------------------------------------------------------------')

# Write your function, here.
def factorial(n):
    product = 1
    for i in range(1, n+1):
        product *= i
    return product

print(factorial(1))     #> 1
print(factorial(8))     #> 40320
print(factorial(12))    #> 479001600

# --------------------------------------------------------------------------------------------------------------
# Check Nested Arrays
# --------------------------------------------------------------------------------------------------------------
# Create a function that returns True if the first list can be nested inside the second. list1 can be nested inside list2 if:
#    list1's min is greater than list2's min
#    list1's max is less than list2's max
# You may want to consider writing a couple of functions to organize your thoughts better.

print('\n--------------------------------------------------------------------------')
print('Check Nested Arrays')
print('--------------------------------------------------------------------------')

# Your code, here.
def can_nest(lst1, lst2):
    # Could use min/max functions on the lists, but this is a range practice so using loops
    min1 = max1 = lst1[0]
    for i in range(1, len(lst1)):
        if lst1[i] < min1:
            min1 = lst1[i]
        elif lst1[i] > max1:
            max1 = lst1[i]

    min2 = max2 = lst2[0]
    for i in range(1, len(lst2)):
        if lst2[i] < min2:
            min2 = lst2[i]
        elif lst2[i] > max2:
            max2 = lst2[i]

    return (min1 > min2) and (max1 < max2)

print(can_nest([1, 2, 3, 4], [0, 6]))  #> True
print(can_nest([3, 1], [4, 0]))        #> True
print(can_nest([9, 9, 8], [8, 9]))     #> False
print(can_nest([1, 2, 3, 4], [2, 3]))  #> False

# --------------------------------------------------------------------------------------------------------------
# Maximum Difference
# --------------------------------------------------------------------------------------------------------------
# Given a list of integers, return the difference between the largest and smallest integers in the list.

print('\n--------------------------------------------------------------------------')
print('Maximum Difference')
print('--------------------------------------------------------------------------')

# Write your function, here.
def difference(lst):
    # Could use min/max functions on the list, but this is a range practice so using a loop
    lstMin = lstMax = lst[0]
    for i in range(1, len(lst)):
        if lst[i] < lstMin:
            lstMin = lst[i]
        elif lst[i] > lstMax:
            lstMax = lst[i]
    return lstMax - lstMin


print(difference([10, 15, 20, 2, 10, 6]))
# 20 - 2 = 18

print(difference([-3, 4, -9, -1, -2, 15]))
# 15 - (-9) = 24

print(difference([4, 17, 12, 2, 10, 2]))
# 17 - 2 = 15

# --------------------------------------------------------------------------------------------------------------
# Find The Smallest Number In A List
# --------------------------------------------------------------------------------------------------------------
# Create a function that takes a list of numbers and returns the smallest number in the list.

print('\n--------------------------------------------------------------------------')
print('Find The Smallest Number In A List')
print('--------------------------------------------------------------------------')

# Write your function, here.
def find_smallest_num(lst):
    lstMin = lst[0]
    for i in range(1, len(lst)):
        if lst[i] < lstMin:
            lstMin = lst[i]
    return lstMin

print(find_smallest_num([34, 15, 88, 2]))                   #> 2
print(find_smallest_num([34, -345, -1, 100]))               #> -345
print(find_smallest_num([-76, 1.345, 1, 0]))                #> -76
print(find_smallest_num([0.4356, 0.8795, 0.5435, -0.9999])) #> -0.9999
print(find_smallest_num([7, 7, 7]))                         #> 7

# --------------------------------------------------------------------------------------------------------------
# Range List - Challenge
# --------------------------------------------------------------------------------------------------------------
# Create a function that returns a list of 100 randomly generated numbers.

print('\n--------------------------------------------------------------------------')
print('Find The Smallest Number In A List')
print('--------------------------------------------------------------------------')

# Write your function, here.
import random

def rng(lst):
    for i in range(100):
        lst.append(random.randint(1, 100))
    return lst


print(rng([]))
