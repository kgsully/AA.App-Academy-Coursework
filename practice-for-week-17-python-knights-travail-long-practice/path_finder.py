from tree import Node

class KnightPathFinder:
    def __init__(self, start_pos):
        # Verify
        try:
            if type(start_pos) is not tuple:
                raise Exception("Start coordinates must be a tuple")
            elif not isinstance(start_pos[0], int) or not isinstance(start_pos[1], int):
                raise Exception("Start coordinate values must be integers")
            elif 0 < start_pos[0] >= 8 or 0 < start_pos[1] >= 8:
                raise Exception("Coordinates must be between 0 and 7 for a standard 8x8 chess board")

            # Set values if the start coordinates passed in pass checks for validity
            self._root = Node(start_pos)
            self._considered_positions = { start_pos }
            # print(self._root, self._root.value)
            # print(self._considered_positions)

        except Exception as e:
            print("Error:", e)

    def get_valid_moves(self, pos):
        x, y = pos
        valid_moves = set()

        # There are up to 8 possible valid moves for the knight depending upon it's position on the board
        possible_moves = [
            (1, 2),
            (-1, 2),
            (2, 1),
            (2, -1),
            (1, -2),
            (-1, -2),
            (-2, -1),
            (-2, 1)
        ]

        for move in possible_moves:
            new_x, new_y = x + move[0], y + move[1]

            # Add to valid moves list only if the values are non-negative and less than board boundary (8)
            if 0 <= new_x < 8 and 0 <= new_y < 8:
                valid_moves.add((new_x, new_y))

        return valid_moves


    def new_move_positions(self, pos):
        valid_moves = self.get_valid_moves(pos)

        new_moves = valid_moves.difference(self._considered_positions)
        self._considered_positions.update(new_moves)

        return new_moves

    def build_move_tree(self):
        queue = [self._root]

        while queue:
            node = queue.pop(0)
            new_children = self.new_move_positions(node.value)
            for child in new_children:
                new_child = Node(child)
                node.add_child(new_child)
                queue.append(new_child)

        return queue


# finder = KnightPathFinder((0, 0))
# finder.build_move_tree()
# print(finder._root.children)
