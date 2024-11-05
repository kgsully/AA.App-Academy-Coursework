# ---------------------------------------------------------------------------------------------------------------------
# Book Polymorphism
# ---------------------------------------------------------------------------------------------------------------------

# Implement a class called Book with the following:

#     A constructor that takes 3 parameters and initializes three instance properties: title, author, and year.
#     An instance method called description that returns the following formatted string: "{title} is written by {author} and was published in {year}.".

# Implement a second class called NonfictionBook that inherits from the Book class and implements the following methods:

#     A constructor that takes 4 parameters and uses super() to reuse the Book class constructor method to initialize the instance properties title, author, and year.
#        The constructor should also initialize a fourth instance property called subject.
#     An instance method called description that will override the parent class Book's method of the same name.
#        For the NonfictionBook class, this method should return the following formatted string: "{title} is written by {author} and was published in {year}. It is a nonfiction book about {subject}."

print('\n--------------------------------------------------------------------------------------------')
print('Book Polymorphism')
print('--------------------------------------------------------------------------------------------')

# Write your class here.
class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year

    def description(self):
        return f"{self.title} is written by {self.author} and was published in {self.year}."


class NonfictionBook(Book):
    def __init__(self, title, author, year, subject):
        super().__init__(title, author, year)
        self.subject = subject

    def description(self):
        return f"{self.title} is written by {self.author} and was published in {self.year}. It is a nonfiction book about {self.subject}."


book = Book("Alice in Wonderland", "Lewis Carroll", 1865)
print(book.description()) # Alice in Wonderland is written by Lewis Carroll and was published in 1865.

nonfiction = NonfictionBook("Cosmos", "Carl Sagan", 1980, "cosmic evolution and human civilization")
print(nonfiction.description()) # Cosmos is written by Carl Sagan and was published in 1980. It is a nonfiction book about cosmic evolution and human civilization.

# ---------------------------------------------------------------------------------------------------------------------
# Magic Methods
# ---------------------------------------------------------------------------------------------------------------------

# Python does not, by default, do automatic typecasting when "adding" a string and a number together.
# For example, print("1" + 2) will raise a TypeError. However, we can override the magic method __add__ in a class to allow for this functionality.

# Implement a class called StrNumeric with the following:

#     A constructor method that takes a parameter called value and initializes an instance property called val.
#         We will be typecasting this value as an int later on, so we need to ensure that the typecasting will be possible.
#         Use the built-in function isinstance to check if the value passed in is a str and the built-in str.isnumeric() method to ensure that all characters in the string value are numeric.
#         If the value is a string, but has non-numeric characters, raise an Exception with the message "String value can have only numeric characters.".
#         Otherwise, set the instance property to this value.
#
#     An implementation of the __add__ magic method. This method will take in self (as does every instance method) along with another parameter called thing_2.
#     This method should cast both self.val and thing_2 as ints and return their sum.

print('\n--------------------------------------------------------------------------------------------')
print('Magic Methods')
print('--------------------------------------------------------------------------------------------')

# Write your class here.
class StrNumeric:
    def __init__(self, value):
        if not isinstance(value, str):
            raise Exception("Value must be a string")
        elif not value.isnumeric():
            raise Exception("String value can have only numeric characters.")

        self.val = value

    def __add__(self, thing_2):
        return int(self.val) + int(thing_2)

str_1 = StrNumeric("1")
print(str_1 + 2) # 3

str_44 = StrNumeric("44")
print(str_44 + 6) # 50

num_44 = 44
print(num_44 + 6) # 50

try:
    not_numeric = StrNumeric("1.2") # Exception: String value can have only numeric characters.
except Exception as e:
    print("Exception:", e)

# ---------------------------------------------------------------------------------------------------------------------
# Linked List Iterator
# ---------------------------------------------------------------------------------------------------------------------

# In this practice, you will be overriding built-in magic methods to iterate over a linked list. You will see a very simple Node & LinkedList class in the REPL.

# Implement another class called LinkedListIterator that uses the magic methods __init__, __iter__, and __next__ to allow for iteration over an instance of the LinkedList class with a for loop:

#     __init__ should initialize an instance property that keeps track of the current node.
#     __iter__ must return an interator object, in other words an object that implements __next__.
#     __next__ should return the value of the current node and then move the current node to the next node in the linked list.
#              If the current node is None, raise the built-in StopIteration exception to stop iterating.

# We are iterating over the LinkedList class itself, so this class will also need a __iter__ method that returns an iterator object. Do not modify the Node class.

print('\n--------------------------------------------------------------------------------------------')
print('Linked List Iterator')
print('--------------------------------------------------------------------------------------------')

# Write your class here.

class Node:
    def __init__(self, value):
        self._value = value
        self._next = None

class LinkedList:
    def __init__(self):
        self._head = None
        self._tail = None
        self._length = 0

    def __iter__(self):
        return LinkedListIterator(self._head)

    def add(self, value):
        new_node = Node(value)

        if self._head is None:
            self._head = new_node
        else:
            self._tail._next = new_node

        self._tail = new_node
        self._length += 1
        return self

class LinkedListIterator:
    def __init__(self, head):
        self._current_node = head

    def __iter__(self):
        return self

    def __next__(self):
        if self._current_node is None:
            raise StopIteration
        else:
            rtn_val = self._current_node._value
            self._current_node = self._current_node._next
            return rtn_val

linked_list = LinkedList()
linked_list.add('node 1')
linked_list.add('node 2')
linked_list.add('node 3')
linked_list.add('node 4')
linked_list.add('node 5')

# this loop should print "Current node: node x" five times
# for each node in the linked list
for i in linked_list:
    print(f"Current node: {i}")
