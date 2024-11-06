# Your code here
# reference for random number generation:
# https://stackoverflow.com/questions/3996904/generate-random-integers-between-0-and-9
from random import randrange


def chat():
    coworkers = ["Jack", "Lenny", "Michelle", "Andrea"]
    chatee = coworkers[randrange(4)]
    print(f"chatting with {chatee}...")
    print("Done")

def getWater():
    print("Getting water...")
    print("That was refreshing.")

def useSocialMedia():
    socialMedia = ["FaceBook", "Twitter", "YouTube", "Reddit"]
    choice = socialMedia[randrange(4)]
    print(f"Using {choice}...")
    print("Done")
