import { JournalEntry } from "@/types/journal";

export const mockJournalEntries: JournalEntry[] = [
  {
    id: 1,
    problemName: "Two Sum",
    problemId: "1",
    dateDone: "2024-03-20",
    topic: "Arrays",
    difficulty: "Easy",
    details: {
      inputs: "nums = [2,7,11,15], target = 9",
      outputs: "[0,1]",
      constraints: "2 <= nums.length <= 104, -109 <= nums[i] <= 109",
      coreQuestion: "Find two numbers in the array that add up to the target",
      edgeCases: "Empty array, no solution, multiple solutions",
      ideas: [
        {
          title: "Brute Force",
          pros: "Simple to implement",
          cons: "O(n²) time complexity",
        },
        {
          title: "Hash Map",
          pros: "O(n) time complexity",
          cons: "Uses extra space",
        },
        {
          title: "Two Pointers",
          pros: "No extra space",
          cons: "Requires sorted array",
        },
      ],
      chosenIdea: "Hash Map",
      rationale: "Best time complexity and reasonable space usage",
      pseudocode:
        "Create hash map\nIterate through array\nCheck if complement exists\nReturn indices",
      implementation:
        "function twoSum(nums, target) {\n  const map = new Map();\n  for(let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if(map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}",
      bugs: "Forgot to handle case when no solution exists",
      missedEdgeCases: "Array with duplicate numbers",
      solutionSummary:
        "Used a hash map to store complements, achieving O(n) time complexity by trading space for time. The key insight was that we only need to store each number's complement once.",
      keyLearnings: {
        coreIdea:
          "Using a hash map to store and look up values in O(1) time is a powerful pattern for array problems where we need to find pairs or complements.",
        dataStructureInsights:
          "Hash maps are perfect for problems requiring O(1) lookups. The space-time tradeoff is often worth it for better time complexity.",
        algorithmInsights:
          "Single-pass solutions are often possible when we can store and look up values efficiently. This pattern appears in many array problems.",
      },
      selfReflection: {
        whatWentWell:
          "Quickly identified the hash map approach and implemented it correctly. Good handling of edge cases.",
        whatCouldBeBetter:
          "Could have considered the two-pointer approach first, even though it wasn't optimal. Should practice more with different approaches.",
        futureStudy:
          "Review two-pointer techniques and practice more hash map problems. Study space-time tradeoffs in detail.",
        confidenceLevel: "High",
      },
    },
  },
  {
    id: 2,
    problemName: "Valid Parentheses",
    problemId: "20",
    dateDone: "2024-03-19",
    topic: "Stack",
    difficulty: "Medium",
    details: {
      inputs: "s = '()[]{}'",
      outputs: "true",
      constraints: "1 <= s.length <= 104",
      coreQuestion: "Check if the string of parentheses is valid",
      edgeCases: "Empty string, single character, nested parentheses",
      ideas: [
        {
          title: "Stack",
          pros: "O(n) time complexity",
          cons: "Uses extra space",
        },
        {
          title: "Counter",
          pros: "No extra space",
          cons: "Doesn't work for all cases",
        },
      ],
      chosenIdea: "Stack",
      rationale: "Most reliable solution for all cases",
      pseudocode:
        "Create stack\nIterate through string\nPush opening brackets\nPop and check closing brackets",
      implementation:
        "function isValid(s) {\n  const stack = [];\n  const map = {')': '(', '}': '{', ']': '['};\n  for(let char of s) {\n    if(!map[char]) stack.push(char);\n    else if(stack.pop() !== map[char]) return false;\n  }\n  return stack.length === 0;\n}",
      bugs: "Didn't check if stack is empty before popping",
      missedEdgeCases: "String with only opening brackets",
      solutionSummary:
        "Used a stack to keep track of opening brackets and their corresponding closing brackets. The key insight was that we only need to push opening brackets onto the stack and pop them when we encounter the corresponding closing bracket.",
      keyLearnings: {
        coreIdea:
          "Using a stack to keep track of opening brackets and their corresponding closing brackets is a powerful pattern for problems involving parentheses or matching pairs.",
        dataStructureInsights:
          "Stacks are perfect for problems where we need to keep track of the order of elements and ensure they are processed in the correct order. This pattern appears in many problems involving parentheses or matching pairs.",
        algorithmInsights:
          "Single-pass solutions are often possible when we can use a stack to keep track of elements and ensure they are processed in the correct order. This pattern appears in many problems involving parentheses or matching pairs.",
      },
      selfReflection: {
        whatWentWell:
          "Quickly identified the stack approach and implemented it correctly. Good handling of edge cases.",
        whatCouldBeBetter:
          "Could have considered the counter approach first, even though it wasn't optimal. Should practice more with different approaches.",
        futureStudy:
          "Review counter techniques and practice more stack problems. Study space-time tradeoffs in detail.",
        confidenceLevel: "High",
      },
    },
  },
];
