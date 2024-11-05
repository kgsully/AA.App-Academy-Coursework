# ----------------------------------------------------------------------------------------------------------
# Quadrilateral with Inheritance
# ----------------------------------------------------------------------------------------------------------

# Implement a class called Quadrilateral with a constructor method that initializes two instance properties: length and width.

# Implement a second class called Square that inherits from Quadrilateral.

# Create a constructor method in the Square class that initializes two instance properties length and width -- only if the two values passed into the constructor are equal.

# If the two values are not equal, raise an Exception with the message "A square must have an equal length and width."

# If the values are equal, use the super() function to initialize the same two instance properties from the Quadrilateral class's constructor method.

print('\n-----------------------------------------------------------------------------')
print('Quadrilateral with Inheritance')
print('-----------------------------------------------------------------------------')

# Write your class here.
class Quadrilateral:
    def __init__(self, length, width):
        self.length = length
        self.width = width

class Square(Quadrilateral):
    def __init__(self, length, width):
        if length != width:
            raise Exception("A square must have an equal length and width")
        else:
            super().__init__(length, width)


quad = Quadrilateral(20, 10)
print(f"{quad.length}, {quad.width}") # 20, 10

square = Square(10, 10)
print(f"{square.length}, {square.width}") # 10, 10

try:
    not_square = Square(5, 10) # Exception: A square must have an equal length and width.
except Exception as e:
    print("Exception:", e)

# ----------------------------------------------------------------------------------------------------------
# Triangle with Inheritance
# ----------------------------------------------------------------------------------------------------------

# Build off your RegularPolygon class and create another class called Triangle.
# The Triangle class should have functionality that calculates both the perimeter and the area of the triangle.
# The calculated values for both the perimeter and area should be assigned to respective instance properties on the Triangle class.

# The area of a triangle can be calculated with Heron's formula: √(s(s-a)(s-b)(s-c)), where s is the semi-perimeter of the triangle.
# The semi-perimeter is the perimeter divided by 2. The square root function sqrt() can be imported from the built-in math package.

print('\n-----------------------------------------------------------------------------')
print('Triangle with Inheritance')
print('-----------------------------------------------------------------------------')

# Import sqrt() from the math package
from math import sqrt

# Write your class here.
class RegularPolygon:
    type = "Polygon"

    def __init__(self, num_sides, length):
        if num_sides < 3:
            raise Exception("A polygon must have at least 3 sides.")

        self.num_sides = num_sides
        self.length = length

    def identify_polygon(self):
        identifier_dict = {
            3: "Triangle",
            4: "Quadrilateral",
            5: "Pentagon",
            6: "Hexagon",
            7: "Heptagon",
            8: "Octagon",
            9: "Nonagon",
            10: "Decagon"
        }

        try:
            self.type = identifier_dict[self.num_sides]
        except KeyError:
            self.type = f"Polygon with {self.num_sides} sides"

    @classmethod
    def polygon_factory(cls, values):
        return [cls(num_sides, length) for num_sides, length in values]

    @staticmethod
    def get_perimeter(polygon):
        return polygon.num_sides * polygon.length


class Triangle(RegularPolygon):
    def __init__(self, num_sides, length):
        if num_sides != 3:
            raise Exception("A triangle must have exactly 3 sides")
        super().__init__(num_sides, length)
        # Instead of making area an @property, could have added it hear and set self.area = a get_area instance function

    @property
    def perimeter(self):
        return super().get_perimeter(self)

    @property
    def area(self):
        # area of the triangle calculated using Heron's formula √(s(s-a)(s-b)(s-c)), where s is the semi-perimeter of the triangle (perimeter / 2)
        s = self.perimeter / 2
        area = sqrt(s * (s - self.length)**3) # note that this is ^3. This is because lengths a, b, and c are all == due to this being a regular polygon / equalateral triangle
        return area

triangle_a = Triangle(3, 3)
print(triangle_a.perimeter) # 9
print(triangle_a.area) # 3.8971...

triangle_b = Triangle(3, 12)
print(triangle_b.perimeter) # 36
print(triangle_b.area) # 62.3538...

try:
    triangle_c = Triangle(4, 12)
    print(triangle_c.perimeter) # Exception: A triangle must have exactly three sides
except Exception as e:
    print("Exception:", e)
