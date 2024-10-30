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
