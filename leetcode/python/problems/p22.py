"""
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
"""
class Solution(object):
    def generateParenthesis(self, n):
        """
        :type n: int
        :rtype: List[str]
        """
        def generate(current, left, right, result=[]):
            # dfs with condition
            if right < left:
                return

            if right == 0:
                result.append(current)

            if left > 0:
                generate(current + '(', left - 1, right, result)

            if right > 0:
                generate(current + ')', left, right - 1, result)
                
        result = []
        generate('', n, n, result)
        return result
