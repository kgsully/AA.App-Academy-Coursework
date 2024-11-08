
# Node Class
class Node:
    def __init__(self, value):
        self._value = value
        self._parent = None
        self._children = []

    @property
    def value(self):
        return self._value

    @property
    def children(self):
        return self._children

    @property
    def parent(self):
        return self._parent

    def add_child(self, node_to_add):
        if isinstance(node_to_add, Node) and node_to_add not in self._children:
            # order of operation matters here:
            # if the statements were in the opposite order, base case may not be satisfied as it would
            # call the .parent setter method before adding the node to the children list
            # Would rather just have this set ._parent and not recurse, but the test requires that it
            # calls the .parent() setter method
            self.children.append(node_to_add)
            node_to_add.parent = self

    def remove_child(self, node_to_remove):
        if node_to_remove in self._children:
            # order of operation matters here:
            # if the statements were in the opposite order, base case will not be satisfied as it would
            # call the .parent setter method before removing the node from the children list and the
            # base case would never be satisfied
            # Would rather just have this set ._parent and not recurse, but the test requires that it
            # calls the .parent() setter method
            self.children.remove(node_to_remove)
            node_to_remove.parent = None

    @parent.setter
    def parent(self, new_parent_node):
        if self.parent is not new_parent_node:  # to prevent node from being added twice
            if self.parent:
                self.parent.remove_child(self)  # remove from previous parent child list

            self._parent = new_parent_node

            if isinstance(new_parent_node, Node):
                new_parent_node.add_child(self)

    def depth_search(self, value):
        if self._value == value:
            return self

        for child in self._children:
            result = child.depth_search(value)
            if result is not None:
                return result
        return None

    def breadth_search(self, value):
        queue = [self]
        visited = set()

        while queue:
            vertex = queue.pop(0)

            if vertex.value == value:
                return vertex

            if vertex not in visited:
                visited.add(vertex)

                for child in vertex.children:
                    if child not in visited:
                        queue.append(child)

        return None
