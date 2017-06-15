"""
Given a set of candidate numbers (C) (without duplicates) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.

The same repeated number may be chosen from C unlimited number of times.

Note:
All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
For example, given candidate set [2, 3, 6, 7] and target 7, 
A solution set is: 
[
  [7],
  [2, 2, 3]
]
Subscribe to see which companies asked this question.
"""

_test = [
    (
        [[2, 3, 6, 7],7],
        [            
            [2, 2, 3],
            [7]
        ]          
    )

]

class Solution(object):
    def combinationSum(self, candidates, target):
        """
        :type candidates: List[int]
        :type target: int
        :rtype: List[List[int]]
        """        
        def dfs(number, state, candidates, target):            
            if number > target:
                return            
            
            if number == target:
                print state
                self._result.append(state)
                
            for c in candidates:
                if len(state) != 0 and c < state[-1]:
                    continue
                
                new_state = state[:]
                new_state.append(c)
                print new_state
                
                dfs(number + c, new_state, candidates, target)


        self._result = []
        candidates = sorted(candidates) #need sorting 
        dfs(0, [], candidates, target)
        return self._result


    def run(self, args):
        candidates = args[0]
        target = args[1]
        print candidates
        print target
        return self.combinationSum(candidates, target)
