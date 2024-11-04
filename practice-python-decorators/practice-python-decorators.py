# ----------------------------------------------------------------------------------------------------------
# Hello World Decorator
# ----------------------------------------------------------------------------------------------------------

# Implement a decorator function called hello_world_decorator that will be used to print statements.
# The decorator function should take another function argument as a callback, implement an inner wrapper function,
# and finally return the wrapper function object.

# Implement the inner wrapper function with the following:

#     A print statement of the string "Hello"
#     Calls the callback function
#     Another print statement after the callback containing the string "Goodnight"

# Finally, be sure to decorate the world function using the decorator syntax.

print('\n------------------------------------------------------------------------------')
print('Hello World Decorator')
print('------------------------------------------------------------------------------')

# Write your function here.
def hello_world_decorator(func):
  def hello_world_decorator_wrapper():
    print("Hello")
    func()
    print("Goodnight")
  return hello_world_decorator_wrapper

@hello_world_decorator
def world():
  print("World")

world() #> Hello World Goodnight

# ----------------------------------------------------------------------------------------------------------
# Order Decorator
# ----------------------------------------------------------------------------------------------------------

# Implement a decorator function called order_decorator that will be used to print the values 1, 2, 3, 4 in order
# while the callback is in the middle of two print statements.
# The decorator function should take another function argument as a callback,
# implement an inner wrapper function, and finally return the wrapper function object.

# Implement the inner wrapper function with the following:

#     Takes in a variable argument
#     A print statement of the integer 1
#     Initializes a variable of that calls the middle callback function with the argument passed into the wrapper
#     A print statement of the integer 3
#     Returns the variable of the callback function

print('\n------------------------------------------------------------------------------')
print('Order Decorator')
print('------------------------------------------------------------------------------')

# Write your function here.
def order_decorator(function):
   def order_decorator_wrapper(num):
      print(1)
      result = function(num)
      print(3)
      return(result)
   return order_decorator_wrapper

@order_decorator
def middle(num):
      print(num)
      return num * num

print(middle(2)) #> 1 2 3 4

# ----------------------------------------------------------------------------------------------------------
# Timer Decorator
# ----------------------------------------------------------------------------------------------------------

# Implement a decorator function called timer that will be used to time function calls.
# The decorator function should take another function argument as a callback, implement an inner wrapper function, and finally return the wrapper function object.

# Implement the inner wrapper function with the following:

#     Takes a variable number of positional and keyword arguments
#     Initializes a variable called before_time with the current time.
#         To get the current time, you will need to import the datetime object from the built-in datetime package.
#         The datetime.now() function returns the current local date and time.
#     Calls the callback function with arguments passed to the wrapper
#     Initializes a variable called after_time with the current time.
#         Use the same datetime.now() function here as well.
#     Returns after_time - before_time

# Finally, be sure to decorate greet_me and sum_of_two with timer using the decorator syntax.

print('\n------------------------------------------------------------------------------')
print('Timer Decorator')
print('------------------------------------------------------------------------------')

# Write your function here.
from datetime import datetime

def timer(func):
   def timer_wrapper(*args, **kwargs):
      before_time = datetime.now()
      func(*args, **kwargs)
      after_time = datetime.now()
      return after_time - before_time
   return timer_wrapper

@timer
def greet_me(name):
    return f"hello {name}"

@timer
def sum_of_two(sum1, sum2):
    return sum1 + sum2

print(greet_me("Penelope")) # approximately 0:00:00.000006
print(sum_of_two(13, 7)) # approximately 0:00:00.000002

# ----------------------------------------------------------------------------------------------------------
# Chain Decorator
# ----------------------------------------------------------------------------------------------------------

# Implement a decorator function called chain_decorator that will be used to chain function calls.
# The decorator function should take another function argument as a callback, implement two inner wrapper functions,
# and finally return the wrapper function object in each respective wrapper function.

# Implement the inner wrapper function with the following:

#     Takes a variable number of positional and keyword arguments
#     Initializes a variable that calls the callback function with arguments passed to the wrapper
#     Returns the variable multiplied by itself.

# Implement another inner wrapper function with the following:

#     Takes a variable number of positional and keyword arguments
#     Initializes a variable that calls the callback function with arguments passed to the wrapper
#     Returns the variable multiplied by 3

# Finally, be sure to decorate num function using the decorator syntax.

print('\n------------------------------------------------------------------------------')
print('Chain Decorator')
print('------------------------------------------------------------------------------')

# Write your function here.
def chain_decorator(func):
   def chain_decorator_wrapper(*args, **kwargs):
      result_1 = func(*args, **kwargs)
      return result_1 * result_1
   return chain_decorator_wrapper

def multiply_decorator(func):
   def multiply_decorator_wrapper(*args, **kwargs):
      result_2 = func(*args, **kwargs)
      return result_2 * 3
   return multiply_decorator_wrapper

@chain_decorator
@multiply_decorator
def num(a, b):
    return a + b

print(num(5, 2))  #> 441
print(num(8, 2))  #> 900
print(num(4, 9))  #> 1521
