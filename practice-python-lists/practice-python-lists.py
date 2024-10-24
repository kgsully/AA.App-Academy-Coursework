# ----------------------------------------------------------------------------------------------
# Explore The List
# ----------------------------------------------------------------------------------------------
# It's time to explore the list object and how to use it.
# Follow the instructions in the code comments. Be sure to test your work by running your code!

print('\n----------------------------------------------------------')
print('Explore The List')
print('----------------------------------------------------------')
# DO NOT EDIT - Starting with a simple lists of colors and numbers
colors = ["blue", "Green", "PURPLE", "blue-green", "sky blue"]
numbers = [2, 34, 8.5, -22.0, 33//4, 2**5]
print ('COLORS', colors)
print ('NUMBERS', numbers)

# 1. Print the total number of colors (length of the list)
print(len(colors))

# 2. Print the first color
print(colors[0])

# 3. Print the second and third colors
print(colors[1:3])

# 4. Print the last two colors
print(colors[-2:])

# 5. Print the smallest number in the numbers list
print(min(numbers))

# 6. Print the largest number in the numbers list
print(max(numbers))

# 7. Sort the numbers
numbers.sort()

# UNCOMMENT WHEN YOU WORK ON #7
print ('SORTED NUMBERS', numbers)

# 8. Sort the colors alphabetically ignoring case
colors.sort(key=str.lower)

# UNCOMMENT WHEN YOU WORK ON #8
print ('SORTED COLORS', colors)

# ----------------------------------------------------------------------------------------------
# Return First Element Of A List
# ----------------------------------------------------------------------------------------------
# Create a function that takes a list and returns the first element.

print('\n----------------------------------------------------------')
print('Return First Element Of A List')
print('----------------------------------------------------------')
# Write your function, here.
def get_first_value(list):
    return list[0]

print(get_first_value([1, 2, 3]))        #> 1
print(get_first_value([80, 5, 100]))     #> 80
print(get_first_value([-500, 0, 50]))    #> -500

# ----------------------------------------------------------------------------------------------
# Sum The Elements Of A List
# ----------------------------------------------------------------------------------------------
# Create a function that takes a list and returns the sum of all numbers in the list.

print('\n----------------------------------------------------------')
print('Sum The Elements Of A List')
print('----------------------------------------------------------')
# Write your function, here.
def get_sum_of_elements(list):
    return sum(list)

print(get_sum_of_elements([2, 7, 4]))     #> 13
print(get_sum_of_elements([45, 3, 0]))    #> 48
print(get_sum_of_elements([-2, 84, 23]))  #> 105

# ----------------------------------------------------------------------------------------------
# First And Last Entries
# ----------------------------------------------------------------------------------------------
# Create a function that takes a list of elements and return the first and last elements as a new list.

print('\n----------------------------------------------------------')
print('First And Last Entries')
print('----------------------------------------------------------')
# Write your function, here.
def first_last(list):
    newList = [list[0], list[-1]]
    return newList

print(first_last([5, 10, 15, 20, 25]))            #> [5, 25]
print(first_last([13, None, False, True]))        #> [13, True]
print(first_last([None, 4, "6", "hello", None]))  #> [None, None]

# ----------------------------------------------------------------------------------------------
# First Last List
# ----------------------------------------------------------------------------------------------
# Create a function that returns the sum of the first value in the first list and the last value of the second list.

print('\n----------------------------------------------------------')
print('First Last List')
print('----------------------------------------------------------')
# Write your function, here.
def sum_first_last_list(list1, list2):
    return list1[0] + list2[-1]

print(sum_first_last_list([1, 2, 3], [5, 8, 9]))     #> 10
print(sum_first_last_list([53, 26], [5]))            #> 58
print(sum_first_last_list([9], [5, 8]))              #> 17
print(sum_first_last_list([64], [5, 6, 2]))          #> 66

# ----------------------------------------------------------------------------------------------
# Insertion Sort
# ----------------------------------------------------------------------------------------------
# Create a function that uses the insertion sort algorithm to sort the list.

print('\n----------------------------------------------------------')
print('Insertion Sort')
print('----------------------------------------------------------')
# Write your function, here.
def insertion_sort(list):
    # Out of place insertion sort
    sorted = [list[0]]
    for i in range(1, len(list)):
        element = list[i]

        for j in range(len(sorted)):
            if element < sorted[j]:
                sorted.insert(j, element)
                break
            elif j == len(sorted) - 1:
                sorted.append(element)
    return sorted


print(insertion_sort([55, 21, 5, 3, 6, 95])) #> [3, 5, 6, 21, 55, 95]
print(insertion_sort([4, 1, 0, 3, 8, 9])) #> [0, 1, 3, 4, 8, 9]
print(insertion_sort([1, 4, 3, 0, 3, 0, 2, 8])) #> [0, 0, 1, 2, 3, 3, 4, 8]

# ----------------------------------------------------------------------------------------------
# All Occurrences Of A Value In A List
# ----------------------------------------------------------------------------------------------
# Create a function that returns the indices of all occurrences of an item in the list.

print('\n----------------------------------------------------------')
print('All Occurrences Of A Value In A List')
print('----------------------------------------------------------')
# Write your function, here.
def get_indices(list, check):
    indices = []
    for i in range(len(list)):
        if list[i] == check:
            indices.append(i)
    return indices


print(get_indices(["a", "a", "b", "a", "b", "a"], "a"))
# Prints [0, 1, 3, 5]

print(get_indices([1, 5, 5, 2, 7], 7))
# Prints [4]

print(get_indices([1, 5, 5, 2, 7], 5))
# Prints [1, 2]

print(get_indices([1, 5, 5, 2, 7], 8))
# Prints []
