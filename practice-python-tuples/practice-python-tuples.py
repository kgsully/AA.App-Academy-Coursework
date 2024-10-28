# ---------------------------------------------------------------------------------------------------
# Explore the Tuple
# ---------------------------------------------------------------------------------------------------
# It's time to explore the tuple object and how to use it.
# Follow the instructions in the code comments. Be sure to test your work by running your code!
# For the bonus, remember you can split a returned tuple to variables: (a,b,c) = myfunc()

print('\n--------------------------------------------------------------------')
print('Explore the Tuple')
print('--------------------------------------------------------------------')

# DO NOT EDIT
odds = 1,3,5,7,9
evens = 2,4,6,8

# Step 1: Print out the result of adding evens to odds
print(evens + odds)

# Step 2: Print out the result of multiplying odds by three
print(odds * 3)

# Step 3A: Use print to find out if odds is less than evens
print(odds < evens)

# Step 3B: Print out your explanation of why 3A has that result
print("")

# Step 4: Print out the average of the numbers in evens using one line of code
print(sum(evens) / len(evens))

# Step 5A: Write a function 'minmaxmean' that accepts an iterable and
#         returns the minimum value, the maximum value and the average (mean)
def minmaxmean(nums):
    return min(nums), max(nums), sum(nums) / len(nums)

# Step 5B: Use print to confirm you function is working on evens and odds
print(minmaxmean(evens))
print(minmaxmean(odds))

# BONUS: Call your function with a new tuple of your own creation
#        And print the results in a pretty way
(min, max, mean) = minmaxmean((1, 2, 3, 4, 5, 6, 7, 8, 9))
print(f'min: {min} / max: {max} / mean: {mean}')

# ---------------------------------------------------------------------------------------------------
# Sort Tuple
# ---------------------------------------------------------------------------------------------------
# Create a function that returns a tuple with sorted values.

print('\n--------------------------------------------------------------------')
print('Sort Tuple')
print('--------------------------------------------------------------------')

# Write your function, here.
def sort_tuple(tup):
    return tuple(sorted(tup))

print(sort_tuple((5, 8, 9, 2, 3, 1, 4, 2))) #> (1, 2, 2, 3, 4, 5, 8, 9)
print(sort_tuple((5.2, 5, 1, 2.0, 3, 9.5, 8))) #> (1, 2.0, 3, 5, 5.2, 8, 9.5)
print(sort_tuple(("t", "a", "f", "p", "l", "b"))) #> ('a', 'b', 'f', 'l', 'p', 't')
print(sort_tuple(("app", "academy", "is", "great"))) #> ('academy', 'app', 'great', 'is')

# ---------------------------------------------------------------------------------------------------
# Add Value
# ---------------------------------------------------------------------------------------------------
# Create a function that takes in a tuple, tup and a value, val.
# The function should return a tuple with the given value added to the end of the tuple.

print('\n--------------------------------------------------------------------')
print('Add Value')
print('--------------------------------------------------------------------')

# Write your function, here.
def add_value(tup, val):
    # tuples are immutable, so must convert to a data structure that is mutable first
    list = [*tup]
    list.append(val)

    #return the mutable casted to a tuple
    return tuple(list)

print(add_value((1,2,3,4), 5)) #> (1, 2, 3, 4, 5)
print(add_value(("a", "b", "c"), "d")) #> ('a', 'b', 'c', 'd')
print(add_value((8, 9, "d", 6), "a")) #> (8, 9, 'd', 6, 'a')

# ---------------------------------------------------------------------------------------------------
# Concat Tuple
# ---------------------------------------------------------------------------------------------------
# Create a function that returns a concatenated tuple.

print('\n--------------------------------------------------------------------')
print('Concat Tuple')
print('--------------------------------------------------------------------')
# Write your function, here.
def concat_tuple(tup1, tup2):
    concatList = [*tup1, *tup2]
    return tuple(concatList)
    # NOTE: In the same way that you can add 2 lists together and concatenate them, you can do this with a tuple as well -
    # Per the solution:
    # return tup1 + tup2


print(concat_tuple((5, 8, 9, 2, 3, 1, 4, 2), (5, 8, 9, 2, 3, 1, 4, 2))) #> (5, 8, 9, 2, 3, 1, 4, 2, 5, 8, 9, 2, 3, 1, 4, 2)
print(concat_tuple((5, 8, 9), ("a", "b"))) #> (5, 8, 9, 'a', 'b')
print(concat_tuple(("a", "b", "c"), (8.0, 5.7, 9))) #> ('a', 'b', 'c', 8.0, 5.7, 9)

# ---------------------------------------------------------------------------------------------------
# Big Words
# ---------------------------------------------------------------------------------------------------
# Create a function that takes in a tuple of strings.
# It should return a tuple including only the strings that are greater than 8 letters in length.
# Bonus: This can be solved in a single line of code.

print('\n--------------------------------------------------------------------')
print('Big Words')
print('--------------------------------------------------------------------')

# Write your function, here.
def big_words(words):
    return tuple([word for word in words if len(word) > 8])

print(big_words(('earth', 'jupiter', 'mars', 'neptune'))) #> ()
print(big_words(('wakanda', 'melbourne', 'london', 'france'))) #> ('melbourne',)
print(big_words(('app', 'academy', 'app academy', 'xylophone'))) #> ('app academy', 'xylophone')

# ---------------------------------------------------------------------------------------------------
# Recursive Add
# ---------------------------------------------------------------------------------------------------
# Create a recursive function that takes a tuple as an argument and returns the summed values in the tuple.

print('\n--------------------------------------------------------------------')
print('Recursive Add')
print('--------------------------------------------------------------------')
# Write your function, here.
def recursive_add(tuple):
    # base condition - tuple length = 1, only 1 value left in the tuple
    if len(tuple) == 1:
        return tuple[0]

    # recursive case
    val = tuple[0]
    newTuple = tuple[1:]
    return val + recursive_add(newTuple)

print(recursive_add((2, )))               #> 2
print(recursive_add((2, 4, 6, 8, 10)))    #> 30
print(recursive_add((25, 50, 75, 100)))   #> 250

# ---------------------------------------------------------------------------------------------------
# Index Sort
# ---------------------------------------------------------------------------------------------------
# Create a function that returns a list of tuples sorted by the value of the second index in the tuple.

print('\n--------------------------------------------------------------------')
print('Index Sort')
print('--------------------------------------------------------------------')
# Write your function, here.
def index_sort(list):
    list.sort(key = lambda x: x[1])
    return list

print(index_sort([(1, 2, 3), (6, 8, 9), (0, 5, 0), (2, 0, 4)])) #> [(2, 0, 4), (1, 2, 3), (0, 5, 0), (6, 8, 9)]
print(index_sort([(9, 55, 11), (7, 14, 5), (32, 41, 12), (8, 5, 2)])) #> [(8, 5, 2), (7, 14, 5), (32, 41, 12), (9, 55, 11)]
print(index_sort([(0, 9, 1), (4, 3, 0), (6, 5, 14), (64, 32, 28)])) #> [(4, 3, 0), (6, 5, 14), (0, 9, 1), (64, 32, 28)]

# ---------------------------------------------------------------------------------------------------
# Fill Tuple
# ---------------------------------------------------------------------------------------------------
# Create a function that takes in a tuple of tuples with varying lengths, a given value, and a given length.
# The function should return a copy of tuple where each nested tuple has the specified length.
# To increase a tuple's length, the function should append the value the necessary number of times.
# (You may assume that all tuples originally in the tuple have a length <= length.)

print('\n--------------------------------------------------------------------')
print('Fill Tuple')
print('--------------------------------------------------------------------')

# Write your function, here.
def fill_tuple(tup, value, length):
    retList = []
    for el in tup:
        elList = [*el]
        elList += (length - len(elList)) * [value]
        retList.append(tuple(elList))
    return tuple(retList)


print(fill_tuple(((58, 1, 5), (0, 3), (45, ), (24, 23)), 2, 3))    #> ((58, 1, 5), (0, 3, 2), (45, 2, 2), (24, 23, 2))
print(fill_tuple(((1, ), (5, 7), (55, 22), (80, 52, 20)), 5, 4))   #> ((1, 5, 5, 5), (5, 7, 5, 5), (55, 22, 5, 5), (80, 52, 20, 5))
print(fill_tuple(((), (0, 14), (5, 2, 8), (2, 4, 2, 3)), 0, 5))    #> ((0, 0, 0, 0, 0), (0, 14, 0, 0, 0), (5, 2, 8, 0, 0), (2, 4, 2, 3, 0))

# ---------------------------------------------------------------------------------------------------
# Bubble Sum - Challenge
# ---------------------------------------------------------------------------------------------------
# Create a function that returns a list of tuples that are sorted by the sum of the tuples.
# Hint: use the built-in range function

print('\n--------------------------------------------------------------------')
print('Bubble Sum - Challenge')
print('--------------------------------------------------------------------')
# Write your function, here.
def bubble_sum(lst):
    for i in range(len(lst) - 1):
        if sum(lst[i]) > sum(lst[i + 1]):
            lst[i], lst[i + 1] = lst[i + 1], lst[i]
    return lst


print(bubble_sum([(3, 5), (1, 3), (6, 5), (2, 8)])) #> [(1, 3), (3, 5), (2, 8), (6, 5)]
print(bubble_sum([(2, 5), (2, 5), (7, 8), (2, 6)])) #> [(2, 5), (2, 5), (2, 6), (7, 8)]
print(bubble_sum([(5, 6), (1, 2), (3, 0), (2, 4)])) #> [(1, 2), (3, 0), (2, 4), (5, 6)]
print(bubble_sum([(5, 4), (1, 0), (2, 1), (4, 1)])) #> [(1, 0), (2, 1), (4, 1), (5, 4)]
