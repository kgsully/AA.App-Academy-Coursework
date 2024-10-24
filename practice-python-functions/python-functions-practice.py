# ---------------------------------------------------------------------------------------------------------------------------------------
# Fun With Functions
# ---------------------------------------------------------------------------------------------------------------------------------------
# Next create a couple simple functions in Python to practice your skills. Follow the 3 steps in the code to complete this exercise.

print('\n------------------------------------------------')
print('Fun with Functions')
print('------------------------------------------------')

# STEP 1 - Write a function named `welcome` that prints a welcome message
welcome = lambda: print("Hello and Welcome!")

# Step 2 - Write a function named `calc_sum` that
#   - takes in two numbers and
#   - returns their sum
def calc_sum(first, second):
    return first + second

# DO NOT EDIT - The guts of the program
welcome()
print(calc_sum(1,2), 'is 3?', calc_sum(1,2) == 3)
print(calc_sum(-10,-2), 'is -12?', calc_sum(-10,-2) == -12)
print(calc_sum(1.1,-2.2), 'is -1.1?', calc_sum(1.1,-2.2) == -1.1)
print(calc_sum('a','b'), 'is ab?', calc_sum('a','b') == 'ab')
print(calc_sum([1,2],[3,4]), 'is [1,2,3,4]?',
      calc_sum([1,2],[3,4]) == [1,2,3,4])

# ---------------------------------------------------------------------------------------------------------------------------------------
# Function Arguments
# ---------------------------------------------------------------------------------------------------------------------------------------
# In Python, default and keyword arguments are allowed, similar to JavaScript.
# Write a function that accepts at least 2 arguments, with at least one that has a default value.
# Try moving the position of the positional and default arguments' declaration and see what happens!

print('\n------------------------------------------------')
print('Function Arguments')
print('------------------------------------------------')

# Write your code here.
def sample_function(a, b, input="c"):
    print (a, b, input)

# def sample_function(input = "c", a, b):
#     print (a, b, input)

# def sample_function(a, input="c", b):
#     print(a, b, input)
#sample_function(input = "asdf", "a", "b")      # ERROR
#sample_function("asdf", input = "a", "b")      # ERROR
sample_function("asdf", "a", input = "b")      # VALID

# ---------------------------------------------------------------------------------------------------------------------------------------
# Using Lambdas
# ---------------------------------------------------------------------------------------------------------------------------------------
# In Python, lambda functions work as anonymous functions that evaluates to a single expression. You could say it's a little more petite than its JavaScript counterpart.
# Write a function string_multi_print that accepts a string, str, and returns a lambda that prints str i times.

print('\n------------------------------------------------')
print('Using Lambdas')
print('------------------------------------------------')

# Write your code here.
def string_multi_print(str):
    printFunc = lambda qty: print(str * qty)
    return printFunc

# Alternative from solution to print each time on a new line:
# def string_mutli_print_2(str):      # Prints `str` on a new line `i` times
#     return lambda i : print((str + "\n") * i)

string_multi_print('hello ')(2)  # Prints "hello hello "
string_multi_print('wahoo ')(3)  # Prints "wahoo wahoo wahoo "

# ---------------------------------------------------------------------------------------------------------------------------------------
# Merge Helper - Challenge
# ---------------------------------------------------------------------------------------------------------------------------------------
# Recall the merge sort algorithm:

#     1. Find midpoint to divide list in half
#     2. Call merge_sort recursively on the first half
#     3. Call merge_sort recursively on the second half
#     4. Merge the two sorted halves with merge

# Implement the merge_sort function with the merge helper function.

print('\n------------------------------------------------')
print('Merge Helper - Challenge')
print('------------------------------------------------')

def merge_sort(lst):
    # Call merge somewhere in here
    sortedLst = [*lst]

    # Base condition: if input is length 1 or less the list is already sorted by convention: return it
    if len(sortedLst) <= 1: return sortedLst

    # Divide the list in half
    splitIdx = len(lst) // 2
    leftLst = sortedLst[:splitIdx]
    rightLst = sortedLst[splitIdx:]

    # Recursively sort the left half
    leftLst = merge_sort(leftLst)
    # Recursively sort the right half
    rightLst = merge_sort(rightLst)

    # Merge the halves together and return
    sortedLst = merge(leftLst, rightLst)

    return sortedLst

def merge(first_half, second_half):
    # Merge logic goes here
    # Instantiate empty list
    retLst = []

    # Instantiate pointers to the first value in each list
    ptr1 = 0
    ptr2 = 0

    # While there are still values in each list:
      # Compare the first values of each list
      # Add the smaller value to the return array
      # Move the pointer to the next value in that array
    while (ptr1 < len(first_half)) or (ptr2 < len(second_half)):
        if(ptr1 < len(first_half)):
            val1 = first_half[ptr1]
        if(ptr2 < len(second_half)):
            val2 = second_half[ptr2]

        if((ptr2 >= len(second_half)) or (ptr1 < len(first_half) and (val1 < val2))):
            retLst.append(val1)
            ptr1 += 1
        elif((ptr1 >= len(first_half)) or (ptr2 < len(second_half) and (val2 < val1))):
            retLst.append(val2)
            ptr2 += 1
    return retLst


lst = [5, 2, 38, 91, 16, 427]

sorted_lst = merge_sort(lst)        # Out of place solution
print(sorted_lst)

merge_sort(lst)                     # In place solution
print(lst)
