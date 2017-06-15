import unittest
import sys
import os 




class TestAll(unittest.TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    '''
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

    '''

def get_all_module_names():
    print __file__
    for module in os.listdir('problems'):
        if module == '__init__.py' or module[-3:] != '.py':
            continue

        yield module[:-3]

    
def test_generator(module):
    def test(self):
        solution = module.Solution()
        for test in module._test:
            self.assertEqual(solution.run(test[0]), test[1])
        
    return test


    
def main():
    module_names = [m for m in get_all_module_names()]
    for module_name in module_names:
        test_name = "test_" + module_name
        m = getattr(__import__('problems.'+ module_name), module_name)
        test_func = test_generator(m)
        setattr(TestAll, test_name, test_func)

        
    unittest.main()

if __name__ == "__main__":
    main()
