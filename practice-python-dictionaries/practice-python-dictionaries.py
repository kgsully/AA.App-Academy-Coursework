# ---------------------------------------------------------------------------------------------------
# Explore The Dictionary
# ---------------------------------------------------------------------------------------------------
# It's time to explore the dictionary object and how to use it.
# Follow the instructions in the code comments.
# Be sure to test your work by running your code!

print('\n---------------------------------------------------------------')
print('Explore The Dictionary')
print('---------------------------------------------------------------')

# There are two ways to declare dictionaries
# Create a dictionary and assign it to the d1 variable using the dict()
# constructor that has key/value pairs
#   key: "module", value: "Python 3"
#   key: "subject", value: "Dictionaries"
d1 = dict (         # Your declaration here
    module='Python 3',
    subject='Dictionaries',
)
print(d1)

# Create a dictionary and assign it to the d2 variable using the dictionary
# literal that has key/value pairs
#   key: "module", value: "Python 3"
#   key: "subject", value: "Dictionaries"
d2 = {'module': 'Python3', 'subject': 'Dictionaries'} # Your declaration here
print(d2)

# Unlike JavaScript, the keys in Python dictionaries can be any kind of
# value, not just strings or Symbols. Add a key to d1 that is the number
# one with the value "one". Then, add another key to d1 that is a string
# that contains the character 1 and give it the value of "one". Then,
# print the dictionary to see what's in there.
d1[1] = 'one'
d1['1'] = 'one'
print(d1)

# Convert d1 to a list using the list() method. Then, print it. What gets
# put into the list?
# Your conversion here
d1_as_list = list(d1)
print(d1_as_list)
print('Only the dictionary keys are added as elements in the list')

# Now, check that the following keys are in d1
#  "module"    should be True
#  "subject"   should be True
#  "age"       should be False
#  1           should be True
#  "1"         should be True
#  "one"       should be False
#  True        should be False
print(f"module in d1? {'module' in d1}")
print(f"subject in d1? {'subject' in d1}")
print(f"age in d1? {'age' in d1}")
print(f"1 in d1? {1 in d1}")
print(f"'1' in d1? {'1' in d1}")
print(f"'one' in d1? {'one' in d1}")
print(f"True in d1? {'True' in d1}")

# ---------------------------------------------------------------------------------------------------
# Does The Dictionary Have A Key?
# ---------------------------------------------------------------------------------------------------
# Write a function that returns True if a dictionary contains the specified key, and False otherwise.

print('\n---------------------------------------------------------------')
print('Does The Dictionary Have A Key?')
print('---------------------------------------------------------------')

# Write your function, here.
def has_key(d, k):
    return k in d

print(has_key({ "a": 44, "b": 45, "c": 46 }, "d"))
# False

print(has_key({ "craves": True, "midnight": True, "snack": True }, "morning"))
# False

print(has_key({ "pot": 1, "tot": 2, "not": 3 }, "not"))
# True

# ---------------------------------------------------------------------------------------------------
# Is The Dictionary Empty?
# ---------------------------------------------------------------------------------------------------
# Write a function that returns True if a dictionary is empty, and False otherwise.

print('\n---------------------------------------------------------------')
print('Is The Dictionary Empty?')
print('---------------------------------------------------------------')

# Write your function, here.
def is_empty(d):
    return len(d) <= 0


print(is_empty({}))        #> True
print(is_empty({"a": 1}))  #> False

# ---------------------------------------------------------------------------------------------------
# Dictionaries vs Objects
# ---------------------------------------------------------------------------------------------------
# In this problem, you'll explore the difference between a dictionary in Python and a plain-old JavaScript object.
# Try declaring a dictionary representing a cat using the same notation as you would in JavaScript, with the properties for name, breed, and age.
# Did you run into any errors executing your code? Try adding or removing quotations around the keys in your dictionary and see what effect that may have.

print('\n---------------------------------------------------------------')
print('Dictionaries vs Objects')
print('---------------------------------------------------------------')

# Write your code here.

# Python Syntax:
pythonCat = {
    'name': 'Mr. Jangles',
    'breed': 'tabby',
    'age': 3
}
print('Python: ', pythonCat)

# JS Syntax (fails):
# jsCat = {
#     name: 'Mr. Jangles',
#     breed: 'tabby',
#     age: 3
# }

# ---------------------------------------------------------------------------------------------------
# Create Name Tag
# ---------------------------------------------------------------------------------------------------
# Write a function that takes in a name and returns an appropriate name tag
# for them from entries in a variable named GUEST_LIST. If the person's name does not exist in the guest list,
# make a name tag that says they're a guest.

print('\n---------------------------------------------------------------')
print('Create Name Tag')
print('---------------------------------------------------------------')
GUEST_LIST = {
  "Kurt": "Germany",
  "Julia": "France",
  "Ito": "Japan",
  "Katherine": "England",
  "Sam": "Argentina"
}

# Write your function, here.
def greeting(name):
    if name in GUEST_LIST:
        return f"Hi! I'm {name} from {GUEST_LIST[name]}."
    else:
        return f"Hi! I'm a guest."

print(greeting("Kurt"))   #> "Hi! I'm Kurt from Germany."
print(greeting("Sam"))    #> "Hi! I'm Sam from Argentina."
print(greeting("Monty"))  #> "Hi! I'm a guest."

# ---------------------------------------------------------------------------------------------------
# Concatenate Dictionaries
# ---------------------------------------------------------------------------------------------------
# Given a list, lst of dictionaries, write a function, concatenate_dictionaries that concatenates
# the contents of each dictionary into a single dictionary.
# If multiple dictionaries share the same key, use the value of the higher indexed dictionary in the list.

print('\n---------------------------------------------------------------')
print('Concatenate Dictionaries')
print('---------------------------------------------------------------')

# Write your code here.
def concatenate_dictionaries(lst):
    merged = {}
    for item in lst:
        merged = {**merged, **item}
    return merged

lst = [
    {
        'a': 'this',
        'b': 'is'
    },
    {
        'c': 'the',
        'd': 'merged'
    },
    {
        'd': 'dictionary'
    }
]

print(concatenate_dictionaries(lst))
"""
Prints:
{
    a: 'this',
    b: 'is',
    c: 'the',
    d: 'dictionary'
}
"""

# ---------------------------------------------------------------------------------------------------
# Merge Two Lists
# ---------------------------------------------------------------------------------------------------
# Given two lists, lst1 and lst2, write a function merge_lists that merges them into a dictionary
# where the lst1 represents a list of the keys and lst2 represents a list of the values.
# Assume the lists are of the same length.

print('\n---------------------------------------------------------------')
print('Merge Two Lists')
print('---------------------------------------------------------------')

# Write your code here.
def merge_lists(lst1, lst2):
    return dict(zip(lst1, lst2))

lst1 = ['a', 'b']
lst2 = [1, 2]
merged_dict = merge_lists(lst1, lst2)
print(merged_dict)      # { 'a': 1, 'b': 2 }

# ---------------------------------------------------------------------------------------------------
# Majority Character - Challenge
# ---------------------------------------------------------------------------------------------------
# Given a string, write a function that returns the character that is the majority of the string.
# If there is no majority character, return None.
# A majority is considered as having more than n / 2 instances where n is the length of the string.

print('\n---------------------------------------------------------------')
print('Majority Character - Challenge')
print('---------------------------------------------------------------')
# Write your code here.
def majority_char(string):
    charCount = {}
    majCount = len(string) / 2
    for char in string:
        if charCount.get(char):
            charCount[char] += 1
        else:
            charCount[char] = 1
        if charCount[char] > majCount:
            return char
    return None

str = 'all'
str2 = 'welcome to the jungle'

print(majority_char(str))           # 'l'
print(majority_char(str2))          # None
