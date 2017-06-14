import unittest
from problems import *

class TestAll(unittest.TestCase):
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



    # greedy
    def test_p455(self):
        # easy please read the problem carefully
        # python array pop 
        self._solution = p455.Solution()
        print self._solution.findContentChildren([1,2], [1,2,3])


    def test_p55(self):
        pass


    # sorting
    def test_p56(self):
        pass

    def test_p324(self):
        pass





    
def main():
    unittest.main()

if __name__ == "__main__":
    main()
