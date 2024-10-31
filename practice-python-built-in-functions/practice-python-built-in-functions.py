# -------------------------------------------------------------------------------------------------------------------
# Adopted Cats
# -------------------------------------------------------------------------------------------------------------------

# Given a list of Cat objects (dictionaries representing cats), write a function cat_verify that uses
# the all() built-in function to determine if all cats are the same breed.
# Then use any() to determine if any of them are up for adoption. Return the result as a tuple.

# The breed represents the cat's breed, and adopted represents whether the cat bas been adopted already or not.

print('\n----------------------------------------------------------------------------------')
print('Adopted Cats')
print('----------------------------------------------------------------------------------')

cat_list = [
    {
        "name": "Lenny",
        "breed": "Ragdoll",
        "adopted": False
    },
    {
        "name": "Roger",
        "breed": "Siamese",
        "adopted": False
    },
    {
        "name": "Katya",
        "breed": "Persian",
        "adopted": True
    }
]

# Write your code here.
def checkSameBreed(cat):
    return cat['breed'] == cat_list[0]['breed']

def checkUpForAdoption(cat):
    return cat['adopted'] == False

def cat_verify(cats):
    sameBreedLst = map(checkSameBreed, cats) # cast to list type if want to read with a print statement, not required for all
    sameBreed = all(sameBreedLst)
    # can be accomplished by the 1 liner:
    # cat_breed = all(map(lambda cat: cat['breed'] == cats[0]['breed'], cats))

    adoptionLst = filter(checkUpForAdoption, cats)
    upForAdoption = any(adoptionLst)
    # can be accomplished by the 1 liner:
    # up_for_adoption = any(map(lambda cat: cat['adopted'] == False, cats))

    return sameBreed, upForAdoption


print(cat_verify(cat_list))    # False

# -------------------------------------------------------------------------------------------------------------------
# Most Used Card
# -------------------------------------------------------------------------------------------------------------------

# Given a list of dictionaries representing credit cards, sort the list in descending order according to the num_users property.
# Do the sort out-of place without mutating the original list, using the sorted built in function.

print('\n----------------------------------------------------------------------------------')
print('Most Used Card')
print('----------------------------------------------------------------------------------')

cards = [
    {
        "company": "Wells Fargo",
        "card_name": "Active Cash",
        "annual_fee": 0,
        "intro_reward_type": "cash",
        "intro_reward_amount": 200,
        "num_users": 20
    },
    {
        "company": "Chase",
        "card_name": "Sapphire Preferred",
        "annual_fee": 95,
        "intro_reward_type": "points",
        "intro_reward_amount": 60000,
        "num_users": 54
    },
    {
        "company": "Citi",
        "card_name": "Diamond Preferred",
        "annual_fee": 0,
        "intro_reward_type": "cash",
        "intro_reward_amount": 150,
        "num_users": 13
    }
]

# Write your code here.

# def sorter(card):
#     return card['num_users']

def sort_cards(card_list):

    # lambda function used in the sorted method provides the same functionality as the sorted function above with key=sorter
    sorted_card_list = sorted(card_list, key=lambda card: card['num_users'], reverse=True)
    return sorted_card_list

print(sort_cards(cards))        # Chase, Wells Fargo, Citi

# -------------------------------------------------------------------------------------------------------------------
# Nested Sort
# -------------------------------------------------------------------------------------------------------------------

# Say you have a relational database with two tables, Teacher and Classroom, which are related by a one-to-one relationship, so each teacher has a classroom.

# You've fetched the teachers, and joined with their classroom data.

# Write a function, sort_teachers_by_classroom_capacity, that sorts the results in ascending order based on their classroom's capacity and returns
# a list of just the teacher's names in that sorted order.

print('\n----------------------------------------------------------------------------------')
print('Nested Sort')
print('----------------------------------------------------------------------------------')

teachers = [
    {
        "name": "Emily Richardson",
        "subjects": ["Geometry", "Geometry Honors"],
        "years_active": 5,
        "classroom": {
            "building_id": "A",
            "room_number": 12,
            "capacity": 45
        }
    },
    {
        "name": "Richard Emilyson",
        "subjects": ["English 11", "AP English Language"],
        "years_active": 12,
        "classroom": {
            "building_id": "J",
            "room_number": 42,
            "capacity": 60
        }
    },
    {
        "name": "Richly Emiardson",
        "subjects": ["Chemistry", "Chemistry Honors", "AP Chemistry"],
        "years_active": 8,
        "classroom": {
            "building_id": "C",
            "room_number": 5,
            "capacity": 32
        }
    },
]

# Write your code here.

def sort_teachers_by_classroom_capacity(teachers):
    return list(map(lambda teacher: teacher['name'], sorted(teachers, key=lambda teacher: teacher['classroom']['capacity'])))

print(sort_teachers_by_classroom_capacity(teachers))
# Richly Emiardson, Emily Richardson, Richard Emilyson

# -------------------------------------------------------------------------------------------------------------------
# Remove Duplicates
# -------------------------------------------------------------------------------------------------------------------

# Say you took a survey of your class of all the phones, and you want to get all the unique phone models.

# First, write a function get_unique_models that filters out duplicates of a given model.
# Assume that brands and models are one-to-one, meaning there won't be two brands that have same model name.

# Then, write a function map_to_names that returns a list of just the model names given the list of phones.

print('\n----------------------------------------------------------------------------------')
print('Remove Duplicates')
print('----------------------------------------------------------------------------------')

phones = [
    {
        "brand": "Apple",
        "model": "iPhone 13 Pro",
        "cost": 929,
        "color": "alpine green"
    },
    {
        "brand": "Samsung",
        "model": "Galaxy S22+",
        "cost": 999,
        "color": "black"
    },
    {
        "brand": "Google",
        "model": "Pixel 6",
        "cost": 599,
        "color": "kinda coral"
    },
    {
        "brand": "Apple",
        "model": "iPhone 13 Pro",
        "cost": 929,
        "color": "gold"
    },
    {
        "brand": "Google",
        "model": "Pixel 6",
        "cost": 599,
        "color": "stormy black"
    }
]

# Write your code here.

def get_unique_models(phone_list):
    seen = []
    return filter(lambda phone: seen.append(phone['model']) is None if phone['model'] not in seen else False, phone_list) # append() will return None if it completes successfully

def map_to_names(phone_list):
    return list(map(lambda phone: phone['model'], phone_list))

unique_models = list(get_unique_models(phones))
print(unique_models)                # iPhone 13 Pro, Galaxy S22+, Pixel 6 (dictionaries)
print(map_to_names(unique_models))  # iPhone 13 Pro, Galaxy S22+, Pixel 6

# -------------------------------------------------------------------------------------------------------------------
# Bonus: Averages
# -------------------------------------------------------------------------------------------------------------------

# It's time to put your knowledge of lists, tuples and dictionaries together. In this exercise, you will complete the basic statistics calculations for

#     Minimum
#     Maximum
#     Mean
#     Median
#     Mode

# Follow the instructions in the code comments. Be sure to test your work by running your code!

# You will likely need to look at the Python documentation to complete this activity. (Search 'dictionary', go to 'Built-in Types', scroll down to 'Mapping Types - dict'.)

# After Step 1, you should see this in the terminal:
# ('min', 'max', 'mean', 'median', 'mode')
# (1, 9, 5.0, None, None)
# (12, 99, 43.666666666666664, None, None)

# In Step 2, the expected median values are 5 and 35.5. Median is the middle element. When the list has an odd length it's as easy as taking the value at the middle index on the sorted list. When the length is even, it's the average of the two numbers closest to the middle.

# In Step 3, the expected mode values are 1 and 23. Mode is the element which is most repeated.

# BONUS A is really whatever you want to do. It is recommended that you add fringe cases (e.g. a list of a single number like zero or all numbers are the same).

# BONUS B is to revisit the mode function and return nothing if more than one number is repeated the most number of times (like sample1). When successful, this would result in (1, 9, 5.0, 5, None) for the first call to analyze.

print('\n----------------------------------------------------------------------------------')
print('Bonus: Averages')
print('----------------------------------------------------------------------------------')

# STEP 1: Complete analyze function to return 5 values
#    - minimum
#    - maximum
#    - mean (a.k.a. average)
#    - median (center point)
#    - mode (most repeated)
def analyze(nums):
    if nums == []:
        return None

    minVal = min(nums)
    maxVal = max(nums)
    meanVal = sum(nums) / len(nums)
    medianVal = median(nums)
    modeVal = mode(nums)

    return (minVal, maxVal, meanVal, medianVal, modeVal)

# STEP 2: Complete median function to return center number
#         WITHOUT using built-in function
def median(nums):
    sortedNums = sorted(nums)
    middleIdx = len(nums) // 2
    if len(nums) % 2 > 0:   # odd number of list elements
        return sortedNums[middleIdx]
    else:  # even number of list elements - average of 2 center most elements
        return (sortedNums[middleIdx - 1] + sortedNums[middleIdx]) / 2

# STEP 3: Complete mode function to return most-repeated number
#         WITHOUT using built-in function
# BONUS B: Catch special case where more than one value repeats the most
def mode(nums):
    counts = dict.fromkeys(nums, 0)     # this method will generate a dictionary with keys defined by the list nums and default value of 0
    for num in nums:
        counts[num] += 1
    modeVal = max(counts, key=lambda x: counts[x])

    # BONUS B - make list of values from counts dict and count how many elements are = to the value for the determined mode
    #           if there is more than one instance, this means that there is more than 1 value that repeats the most
    if list(counts.values()).count(counts[modeVal]) > 1:
        return None
    return modeVal


# DO NOT EDIT - sample data for checking your work
sample1 = 1,2,3,4,5,6,7,8,9
sample2 = [37,45,23,65,75,34,23,23,23,65,12,99]
print(('min', 'max', 'mean', 'median', 'mode'))
print(analyze(sample1))
print(analyze(sample2))

# BONUS A: Print more samples as you see fit
print('\n BONUS A:')
sample3 = [0]
sample4 = []
sample5 = [1, 1, 1, 1, 1]
print(analyze(sample3))
print(analyze(sample4))
print(analyze(sample5))

# -------------------------------------------------------------------------------------------------------------------
# Bonus: Track The Robot
# -------------------------------------------------------------------------------------------------------------------

# A robot has been given a list of movement instructions.
# Each instruction is either left, right, up or down, followed by a distance to move.
# The robot starts at [0, 0]. You want to calculate where the robot will end up and return its final position as a list.
#
# For example, if the robot is given the instructions ["right 10", "up 50", "left 30", "down 10"],
# it will end up 20 left and 40 up from where it started, so you should return [-20, 40].

print('\n----------------------------------------------------------------------------------')
print('Bonus: Track The Robot')
print('----------------------------------------------------------------------------------')

# Write your function, here.
def track_robot(directions):
    x = 0
    y = 0
    if len(directions) == 0:
        return [0, 0]
    for el in directions:
        [dir, qtyStr] = el.split()
        qty = int(qtyStr)
        if dir == 'right':
            x += qty
        if dir == 'left':
            x -= qty
        if dir == 'up':
            y += qty
        if dir == 'down':
            y -= qty

    return [x, y]

# Better code from the solution:
# def track_robot(instructions):
#     totals = {'left': 0, 'right': 0, 'up': 0, 'down': 0}
#     for step in instructions:
#         step = step.split()
#         totals[step[0]] += int(step[1])
#     return [totals['right'] - totals['left'], totals['up'] - totals['down']]


print(track_robot(["right 10", "up 50", "left 30", "down 10"]))
# Prints [-20, 40]

print(track_robot([]))
# Prints [0, 0]
# If there are no instructions, the robot doesn't move.

print(track_robot(["right 100", "right 100", "up 500", "up 10000"]))
# Prints [200, 10500]
