# Leetcode 21 - Merge two sorted lists
# https://leetcode.com/problems/merge-two-sorted-lists/description/

# You are given the heads of two sorted linked lists list1 and list2.

# Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

# Return the head of the merged linked list.

# Example 1:

# Input: list1 = [1,2,4], list2 = [1,3,4]
# Output: [1,1,2,3,4,4]

# Example 2:

# Input: list1 = [], list2 = []
# Output: []

# Example 3:

# Input: list1 = [], list2 = [0]
# Output: [0]



# Constraints:

#     The number of nodes in both lists is in the range [0, 50].
#     -100 <= Node.val <= 100
#     Both list1 and list2 are sorted in non-decreasing order.

def mergeTwoLists(list1, list2):
    idx1 = idx2 = 0
    val1 = val2 = None
    mergedList = []
    print(f'\nlist 1 len: {len(list1)}   list 2 len: {len(list2)}')
    while (idx1 < len(list1) or idx2 < len(list2)):
        if idx1 < len(list1):
            val1 = list1[idx1]
        else:
            val1 = None

        if idx2 < len(list2):
            val2 = list2[idx2]
        else:
            val2 = None
        if not val1:
            mergedList += [*list2[idx2:]]
            break
        elif not val2:
            mergedList += [*list1[idx1:]]
            break
        else:
            if val1 == val2:
                mergedList += 2 * [val1]
                idx1 += 1
                idx2 += 1
            elif val1 < val2:
                mergedList.append(val1)
                idx1 += 1
            else:
                mergedList.append(val2)
                idx2 += 1
    return mergedList

print(mergeTwoLists([1,2,4], [1,3,4]))
print(mergeTwoLists([], []))
print(mergeTwoLists([], [0]))
