# --------------------------------------------------------------------------------------------------------------------------
# Classes in Python Check-In
# --------------------------------------------------------------------------------------------------------------------------

# Without looking back, try creating a Python file named angry_bird.py and

    # Define the AngryBird class
    # Define the __init__() method which sets the x and y instance variables to 0
    # Define the move_up_by() method which accepts a delta value and adds it to the y instance variable
    # Create an AngryBird object
    # Print the object
    # Print the object's y value
    # Move the AngryBird object by some amount
    # Print the object's y value, again, to see that it moved


print('\n-----------------------------------------------------------------------------------------')
print('Classes in Python Check-In')
print('-----------------------------------------------------------------------------------------')

class AngryBird:

    # Class to make an angry bird. Initilaize position at 0, 0

    def __init__(self):
        self.x = 0
        self.y = 0

    def move_up_by(self, delta):
        self.y += delta

bird = AngryBird()
print(bird)
print(bird.y)
bird.move_up_by(5)
print(bird.y)



# --------------------------------------------------------------------------------------------------------------------------
# Regular Polygon
# --------------------------------------------------------------------------------------------------------------------------

# Implement a class called RegularPolygon with the following:

    # A constructor method that initializes two instance properties:
    #      the number of sides for the polygon and the length of each side.
    #      If the number of sides is less than 3, raise an Exception with the message "A polygon must have at least 3 sides."
    # A class variable called type set to an inital value of "Polygon"
    # An instance method called identify_polygon that identifies the type of a polygon based on its number of sides.
    #      This method should set the type class variable for this instance to the identified type based on the logic in the starter repl.
    # A class method called polygon_factory that is a factory function for creating instances of the class.
    #      This method should take a list of tuples as an argument,
    #      where each tuple contains the (num_sides, length) for each RegularPolygon instance to be created.
    #      The method should return a list of all the class instances created.
    # A static method called get_perimeter that calculates and returns the perimeter of a polygon.
    #      This method should take an instance of the RegularPolygon class and return the calculated perimeter.
    #      (The perimeter of a regular polygon is the product of the number of sides multiplied by the length of each side.)

print('\n-----------------------------------------------------------------------------------------')
print('Regular Polygon')
print('-----------------------------------------------------------------------------------------')

# 3 sides - Triangle
# 4 sides - Quadrilateral
# 5 sides - Pentagon
# 6 sides - Hexagon
# 7 sides - Heptagon
# 8 sides - Octagon
# 9 sides - Nonagon
# 10 sides - Decagon
# Greater than 10 sides - Polygon with n sides


# Write your class here.
class RegularPolygon:

    type = "Polygon"

    def __init__(self, num_sides, side_length):
        if num_sides < 3:
            raise Exception("A polygon must have at least 3 sides")
        self._num_sides = num_sides
        self._side_length = side_length

    def identify_polygon(self):
        if self._num_sides == 3:
            self.type = "Triangle"
        elif self._num_sides == 4:
            self.type = "Quadrilateral"
        elif self._num_sides == 5:
            self.type = "Pentagon"
        elif self._num_sides == 6:
            self.type = "Hexagon"
        elif self._num_sides == 7:
            self.type = "Heptagon"
        elif self._num_sides == 8:
            self.type = "Octagon"
        elif self._num_sides == 9:
            self.type = "Nonagon"
        elif self._num_sides == 10:
            self.type = "Decagon"
        else:
            self.type = f"Polygon with {self._num_sides} sides"

    @property
    def num_sides(self):
        return self._num_sides

    @property
    def length(self):
        return self._side_length

    @classmethod
    def polygon_factory(cls, poly_lst):
        return [cls(item[0], item[1]) for item in poly_lst]

    @staticmethod
    def get_perimeter(polygon):
        return polygon.num_sides * polygon.length


pentagon = RegularPolygon(5, 5)
octagon = RegularPolygon(8, 10)
dodecagon = RegularPolygon(12, 1)

print('')
print(f"{pentagon.num_sides} sides of length {pentagon.length}") # 5 sides of length 5
print(f"{octagon.num_sides} sides of length {octagon.length}") # 8 sides of length 10
print(f"{dodecagon.num_sides} sides of length {dodecagon.length}") # 12 sides of length 1

pentagon.identify_polygon()
octagon.identify_polygon()
dodecagon.identify_polygon()

print('')
print(pentagon.type) # Pentagon
print(octagon.type) # Octagon
print(dodecagon.type) # Polygon with 12 sides

print('')
print(RegularPolygon.get_perimeter(pentagon)) # 25
print(RegularPolygon.get_perimeter(octagon)) # 80
print(RegularPolygon.get_perimeter(dodecagon)) # 12

print('')
print(RegularPolygon.polygon_factory([(5, 5), (3, 2), (8, 10)])) # prints a list of 3 RegularPolygon objects

print('')
# not_a_polygon = RegularPolygon(2, 5) # Exception: A polygon must have at least 3 sides.  # commented out as it prevents the program from continuing execution

# --------------------------------------------------------------------------------------------------------------------------
# Getters and Setters
# --------------------------------------------------------------------------------------------------------------------------

# Implement a class called Game with the following:

    # A constructor that takes no arguments and sets an instance variable called score to an initial value of 0.
    # A getter method named score that returns the value of a private instance property called _score.
    # A setter method named score that sets the value of the private property _score. This method should take a single argument for the value and set _score to this value * 10.

print('\n-----------------------------------------------------------------------------------------')
print('Getters and Setters')
print('-----------------------------------------------------------------------------------------')

# Write your class here.
class Game:
    def __init__(self):
        self._score = 0

    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        self._score += value * 10


my_game = Game()
print(my_game.score) # 0

my_game.score = 5
print(my_game.score) # 50

# --------------------------------------------------------------------------------------------------------------------------
# Tree Traversal - Challenge
# --------------------------------------------------------------------------------------------------------------------------

# In this practice, you will use classes to implement a binary search tree and perform pre-order, in-order, and post-order traversal of the tree.

# Implement a class Node with a constructor method that defines the following instance properties:

#     The lefthand child of the node, initialized to None
#     The righthand child of the node, initialized to None
#     The value of the node, initialized to the value passed into the constructor

# Implement another class Tree with the following instance methods:

#     insert() that takes in the root node and a new node and places the new node in the correct location in the binary search tree
#     preorder_traversal() that traverses the tree and prints the value of each node in pre-order succession
#     inorder_traversal() that traverses the tree and prints the value of each node in in-order succession
#     postorder_traversal() that traverses the tree and prints the value of each node in post-order succession

print('\n-----------------------------------------------------------------------------------------')
print('Tree Traversal - Challenge')
print('-----------------------------------------------------------------------------------------')

# Write your class here.
class Node:
    def __init__(self, value):
        self._value = value
        self._left = None
        self._right = None

    @property
    def value(self):
        return self._value

    @property
    def left(self):
        return self._left

    @left.setter
    def left(self, node):
        self._left = node

    @property
    def right(self):
        return self._right

    @right.setter
    def right(self, node):
        self._right = node

    def __repr__(self):
        return f"Value: {self._value}  Left Child: {self._left}  Right Child: {self._right}"

class Tree:
    def insert(self, current_node, new_node):
        if not current_node:
            return new_node

        if new_node.value == current_node.value:
            return
        else:
            if new_node.value < current_node.value:
                current_node.left = self.insert(current_node.left, new_node)
            else:
                current_node.right = self.insert(current_node.right, new_node)
            return current_node

    def preorder_traversal(self, node):
        if node:
            print(node.value)
            self.preorder_traversal(node.left)
            self.preorder_traversal(node.right)

    def inorder_traversal(self, node):
        if node:
            self.inorder_traversal(node.left)
            print(node.value)
            self.inorder_traversal(node.right)

    def postorder_traversal(self, node):
        if node:
            self.postorder_traversal(node.left)
            self.postorder_traversal(node.right)
            print(node.value)


tree = Tree()

root = Node(4)

tree.insert(root, Node(1))
tree.insert(root, Node(2))
tree.insert(root, Node(3))

print("** PRE ORDER: **")
tree.preorder_traversal(root) # 4, 1, 2, 3

print("** IN ORDER: **")
tree.inorder_traversal(root) # 1, 2, 3, 4

print("** POST ORDER: **")
tree.postorder_traversal(root) # 3, 2, 1, 4
