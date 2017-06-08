import unittest
from problems import *

class TestALL(unittest.TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    # bit map
    def test_p421(self):
        self._solution = p421.Solution()
        #self.assertEqual(self._solution.findMaximumXOR([[3, 10, 5, 25, 2, 8]]), 28)
        pass


    # backtracking
    def test_p22(self):
        self._solution = p22.Solution()
        self.assertEqual(self._solution.generateParenthesis(3), ["((()))","(()())","(())()","()(())","()()()"])

    def test_p39(self):
        self._solution = p39.Solution()
        self.assertEqual(self._solution.combinationSum([2, 3, 6, 7], 7), [[7], [2,2,3]])

        
def main():
    unittest.main()

if __name__ == "__main__":
    main()
