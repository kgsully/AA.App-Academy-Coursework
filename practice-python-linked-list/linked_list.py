"""
============================================================================
Implementation Exercise: Singly Linked List
============================================================================

-------
Phase 1:
-------
1. Node and LinkedList initialization
2. Getting a node by its position
3. Adding a node to the list's tail
4. Adding a node to list's head
5. Removing the head node
6. Removing the tail node
7. Returning the list length

-------
Phase 2:
-------

1. Check whether the list contains_value a value
2. Inserting a node value into the list at a specific position
3. Updating a list node's value at a specific position
4. Removing a node value from the list at a specific position
5. Format the list as a string whenever `print()` is invoked
"""

# Phase 1

# COMPLETE #_TODO: Implement a Linked List Node class here
class Node:
  # COMPLETE #_TODO: Set the `_value` `_next` node instance variables
  def __init__(self, value):
    self._value = value
    self._next = None


# TODO: Implement a Singly Linked List class here
class LinkedList:
  #COMPLETE #_TODO: Set the `_head` node, `_tail` node, and list `_length` instance variables
  def __init__(self):
    self._head = None
    self._tail = None
    self._length = 0

  # COMPLETE #_TODO: Implement the get_node method here
  def get_node(self, position):
    current_node = self._head

    if not current_node or position > self._length - 1:
      return None

    for i in range(position):
      current_node = current_node._next

    return current_node


  # COMPLETE #_TODO: Implement the add_to_tail method here
  def add_to_tail(self, value):
    new_node = Node(value)

    if self._head is None:
      self._head = new_node
      self._tail = new_node
    else:
      self._tail._next = new_node
      self._tail = self._tail._next

    self._length += 1

  # COMPLETE #_TODO: Implement the add_to_head method here
  def add_to_head(self, value):
    new_node = Node(value)
    # print(new_node._value)
    if self._head is None:
      self._head = new_node
      self._tail = new_node
    else:
      prev_head = self._head
      new_node._next = prev_head
      self._head = new_node

    self._length += 1

  # COMPLETE #_TODO: Implement the remove_head method here
  def remove_head(self):
    if self._length == 0:
      return

    removed_node = self._head
    self._head = self._head._next

    if self._head is None:
      self._tail = None

    self._length -= 1
    return removed_node

  # COMPLETE #_TODO: Implement the remove_tail method here
  def remove_tail(self):
    if self._head is None:
      return None

    prev_tail = self._tail
    if self._tail == self._head:
      self._head = None
      self._tail = None
      self._length -= 1
      return prev_tail
    else:
      current_node = self.get_node(self._length - 2)
      self._tail = current_node
      removed_node = self._tail._next
      self._tail._next = None
      self._length -= 1
      return removed_node

  # COMPLETE #_TODO: Implement the __len__ method here
  def __len__(self):
    return self._length

# Phase 2

  # COMPLETE #_TODO: Implement the contains_value method here
  def contains_value(self, target):
    current_node = self._head
    if current_node is None:
      return False
    for i in range(self._length):
      if current_node._value == target:
        return True
      else:
        current_node = current_node._next
    return False

  # COMPLETE #_TODO: Implement the insert_value method here
  def insert_value(self, position, value):
    if position < 0 or position > self._length - 1:
      return False

    if position == 0:
      self.add_to_head(value)
    elif position == self._length - 1:
      self.add_to_tail(value)
    else:
      new_node = Node(value)
      previous_node = self.get_node(position -1)
      node_to_move = previous_node._next
      new_node._next = node_to_move
      previous_node._next = new_node
      self._length += 1

    return True

  # COMPLETE #_TODO: Implement the update_value method here
  def update_value(self, position, value):
    if position < 0 or position > self._length - 1:
      return False

    if position == 0:
      self._head._value = value
    elif position == self._length - 1:
      self._tail._value = value
    else:
      node_to_update = self.get_node(position)
      node_to_update._value = value
    return True

  # COMPLETE #_TODO: Implement the remove_node method here
  def remove_node(self, position):
    if position < 0 or position > self._length - 1:
      return None

    if position == 0:
      self.remove_head()
    elif position == self._length - 1:
      self.remove_tail()
    else:
      previous_node = self.get_node(position - 1)
      node_to_remove = previous_node._next
      previous_node._next = node_to_remove._next
      self._length -= 1
      return node_to_remove


  # TODO: Implement the __str__ method here
  def __str__(self):
    if self._head is None:
      return 'Empty List'
    else:
      current_node = self._head
      values_string = str(current_node._value)
      for i in range(1, self._length):
        current_node = current_node._next
        values_string += f', {current_node._value}'
      return values_string

# Phase 1 Manual Testing:

# # 1. Test Node and LinkedList initialization
# print('\n#1 ----------')
# node = Node('hello')
# print(node)                                     # <__main__.Node object at ...>
# print(node._value)                              # hello
# linked_list = LinkedList()
# print(linked_list)                              # <__main__.LinkedList object at ...>

# # 2. Test getting a node by its position
# print('\n#2 ----------')
# print(linked_list.get_node(0))                # None

# # 3. Test adding a node to the list's tail
# print('\n#3 ----------')
# linked_list.add_to_tail('new tail node')
# print(linked_list.get_node(0))                # <__main__.Node object at ...>
# print(linked_list.get_node(0)._value)         # `new tail node`

# # 4. Test adding a node to list's head
# print('\n#4 ----------')
# linked_list.add_to_head('new head node')
# print(linked_list.get_node(0))                # <__main__.Node object at ...>
# print(linked_list.get_node(0)._value)         # `new head node`
# print(linked_list.get_node(1))                # <__main__.Node object at ...>
# print(linked_list.get_node(1)._value)         # `new tail node`

# # 5. Test removing the head node
# print('\n#5 ----------')
# linked_list.remove_head()
# print(linked_list.get_node(0)._value)         # `new tail node` because `new head node` has been removed
# print(linked_list.get_node(1))                # `None` because `new head node` has been removed

# # # 6. Test removing the tail node
# # linked_list.add_to_tail('new new tail node')  # REMOVE THIS - TESTING
# print(linked_list.get_node(0)._value)         # `new tail node`
# # print(linked_list.get_node(1)._value)         # `new new tail node` REMOVE THIS - TESTING
# linked_list.remove_tail()
# print(linked_list.get_node(0))                # None

# # 7. Test returning the list length
# print(len(linked_list))                                 # 0, with additional test cases, up to 5

# Phase 2 Manual Testing

# # 1. Test whether the list contains_value a value
# print('\n#1 ----------')
# linked_list = LinkedList()
# linked_list.add_to_head('new head node')
# print(linked_list.contains_value('new head node'))      # True
# print(linked_list.contains_value('App Academy node'))   # False

# # 2. Test inserting a node value into the list at a specific position
# print('\n#2 ----------')
# linked_list.insert_value(0, 'hello!')
# print(linked_list.get_node(0)._value)                   # `hello!`
# # # Testing, comment out or remove
# # print(linked_list.get_node(1)._value)                   # `new head node`
# # print(linked_list.get_node(1)._value)                   # `hello hello!`

# # 3. Test updating a list node's value at a specific position
# print('\n#3 ----------')
# linked_list.update_value(0, 'goodbye!')
# print(linked_list.get_node(0)._value)                   # `goodbye!`
# # # Testing, comment out or remove
# # linked_list.insert_value(1, 'hello hello hello!')
# # print(linked_list.get_node(1)._value)                   # `hello hello hello!`
# # print(linked_list.get_node(2)._value)                   # `new head node!`
# # print('')
# # linked_list.update_value(1, 'goodbye goodbye goodbye!')
# # linked_list.update_value(2, 'old head node')
# # print(linked_list.get_node(0)._value)                   # `goodbye!`
# # print(linked_list.get_node(1)._value)                   # `goodbye goodbye goodbye!`
# # print(linked_list.get_node(2)._value)                   # `old head node`

# # 4. Test removing a node value from the list at a specific position
# print('\n#4 ----------')
# print(linked_list.get_node(1)._value)                   # `new head node`
# linked_list.remove_node(1)
# print(linked_list.get_node(1))                          # None

# # 5. Format the list as a string whenever `print()` is invoked
# print('\n#5 ----------')
# new_linked_list = LinkedList()
# print(new_linked_list)                  # Empty List
# new_linked_list.add_to_tail('puppies')
# print(new_linked_list)                  # puppies
# new_linked_list.add_to_tail('kittens')
# print(new_linked_list)                  # puppies, kittens
