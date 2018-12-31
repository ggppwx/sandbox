"""
There is a brick wall in front of you. The wall is rectangular and has several rows of bricks. The bricks have the same height but different width. You want to draw a vertical line from the top to the bottom and cross the least bricks.

The brick wall is represented by a list of rows. Each row is a list of integers representing the width of each brick in this row from left to right.

If your line go through the edge of a brick, then the brick is not considered as crossed. You need to find out how to draw the line to cross the least bricks and return the number of crossed bricks.

You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.

"""
import unittest


class Solution(object):
    def leastBricks(self, wall):
        edge_map = {}
        for w in wall:
            edge  = 0
            for b in w[:-1]:
                edge += b
                edge_map[edge] = edge_map.get(edge, 0 ) + 1

        max_val = 0
        for key, val in edge_map.items():
            if val > max_val:
                max_val = val

        return len(wall) - max_val


class TestSolution(unittest.TestCase):
    def test_leastBricks(self):
        wall = [[1,2,2,1],
                [3,1,2],
                [1,3,2],
                [2,4],
                [3,1,2],
                [1,3,1,1]]
        s = Solution()
        result = s.leastBricks(wall)
        print(result)
        self.assertEqual(result, 2)


if __name__ == '__main__':
    unittest.main()
