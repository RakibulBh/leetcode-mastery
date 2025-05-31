"use client";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Brain,
  Trophy,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookMarked,
  Target,
  History,
  Sparkles,
  Plus,
  X,
  User,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
  { name: "My Journal", icon: BookOpen, id: "journal" },
  { name: "Quiz Me!", icon: Brain, id: "quiz" },
  { name: "Achievements", icon: Trophy, id: "achievements" },
  { name: "Progress", icon: BarChart3, id: "progress" },
  { name: "Daily Streak", icon: Sparkles, id: "streak" },
  { name: "Study History", icon: History, id: "history" },
  { name: "Goals", icon: Target, id: "goals" },
  { name: "Bookmarks", icon: BookMarked, id: "bookmarks" },
  { name: "Settings", icon: Settings, id: "settings" },
];

type Difficulty = "Easy" | "Medium" | "Hard";

interface JournalEntry {
  id: number;
  problemName: string;
  problemId: string;
  dateDone: string;
  topic: string;
  difficulty: Difficulty;
  details: {
    inputs: string;
    outputs: string;
    constraints: string;
    coreQuestion: string;
    edgeCases: string;
    ideas: Array<{
      title: string;
      pros: string;
      cons: string;
    }>;
    chosenIdea: string;
    rationale: string;
    pseudocode: string;
    implementation: string;
    bugs: string;
    missedEdgeCases: string;
    solutionSummary: string;
    keyLearnings: {
      coreIdea: string;
      dataStructureInsights: string;
      algorithmInsights: string;
    };
    selfReflection: {
      whatWentWell: string;
      whatCouldBeBetter: string;
      futureStudy: string;
      confidenceLevel: "Low" | "Medium" | "High";
    };
  };
}

const difficultyColors: Record<Difficulty, string> = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/20",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
  Hard: "bg-red-500/20 text-red-400 border-red-500/20",
};

// Update dummy data with proper typing
const dummyJournalEntries: JournalEntry[] = [
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

// Add a new hard problem
const newProblem: JournalEntry = {
  id: 3,
  problemName: "Median of Two Sorted Arrays",
  problemId: "4",
  dateDone: "2024-03-18",
  topic: "Arrays",
  difficulty: "Hard",
  details: {
    inputs: "nums1 = [1,3], nums2 = [2]",
    outputs: "2.0",
    constraints: "nums1.length + nums2.length >= 1",
    coreQuestion: "Find the median of two sorted arrays",
    edgeCases: "Empty arrays, single element arrays, even/odd length",
    ideas: [
      {
        title: "Merge and Sort",
        pros: "Simple to understand",
        cons: "O(n log n) time complexity",
      },
      {
        title: "Binary Search",
        pros: "O(log n) time complexity",
        cons: "Complex implementation",
      },
    ],
    chosenIdea: "Binary Search",
    rationale: "Best time complexity for large inputs",
    pseudocode:
      "Find partition points\nCompare elements\nAdjust partition\nReturn median",
    implementation:
      "function findMedianSortedArrays(nums1, nums2) {\n  // Implementation here\n}",
    bugs: "Incorrect partition calculation",
    missedEdgeCases: "Arrays with duplicate elements",
    solutionSummary:
      "Used a binary search approach to find the median of two sorted arrays. The key insight was that we can use the properties of sorted arrays to efficiently find the median without merging the arrays.",
    keyLearnings: {
      coreIdea:
        "Using a binary search approach to find the median of two sorted arrays is a powerful pattern for array problems where we need to find the middle element of a sorted array.",
      dataStructureInsights:
        "Binary search is a powerful algorithm for finding an element in a sorted array. It's time complexity is O(log n), which is efficient for large arrays.",
      algorithmInsights:
        "Binary search is a powerful algorithm for finding an element in a sorted array. It's time complexity is O(log n), which is efficient for large arrays.",
    },
    selfReflection: {
      whatWentWell:
        "Quickly identified the binary search approach and implemented it correctly. Good handling of edge cases.",
      whatCouldBeBetter:
        "Could have considered the merge and sort approach first, even though it wasn't optimal. Should practice more with different approaches.",
      futureStudy:
        "Review merge and sort techniques and practice more binary search problems. Study space-time tradeoffs in detail.",
      confidenceLevel: "High",
    },
  },
};

dummyJournalEntries.push(newProblem);

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("journal");
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Auto-collapse sidebar when entry is selected
  useEffect(() => {
    if (selectedEntry) {
      setIsCollapsed(true);
    }
  }, [selectedEntry]);

  const handleCloseDetails = () => {
    setSelectedEntry(null);
    setIsCollapsed(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "journal":
        return (
          <div className="flex h-full">
            {/* Journal List */}
            <div className={`flex-1 ${selectedEntry ? "pr-0" : "pr-4"}`}>
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">My Journal</h2>
                  <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Problem
                  </button>
                </div>

                {/* Table */}
                <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="text-left p-6 font-medium text-gray-300">
                            Problem Name
                          </th>
                          <th className="text-left p-6 font-medium text-gray-300">
                            ID
                          </th>
                          <th className="text-left p-6 font-medium text-gray-300">
                            Date
                          </th>
                          <th className="text-left p-6 font-medium text-gray-300">
                            Topic
                          </th>
                          <th className="text-left p-6 font-medium text-gray-300">
                            Difficulty
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyJournalEntries.map((entry) => (
                          <tr
                            key={entry.id}
                            onClick={() => setSelectedEntry(entry.id)}
                            className={`border-b border-white/10 cursor-pointer transition-colors
                              ${
                                selectedEntry === entry.id
                                  ? "bg-white/10"
                                  : "hover:bg-white/5"
                              }`}
                          >
                            <td className="p-6 font-medium">
                              {entry.problemName}
                            </td>
                            <td className="p-6 text-gray-300">
                              #{entry.problemId}
                            </td>
                            <td className="p-6 text-gray-300">
                              {entry.dateDone}
                            </td>
                            <td className="p-6">
                              <span className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10">
                                {entry.topic}
                              </span>
                            </td>
                            <td className="p-6">
                              <span
                                className={`px-3 py-1 rounded-full text-sm border ${
                                  difficultyColors[entry.difficulty]
                                }`}
                              >
                                {entry.difficulty}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Panel */}
            <AnimatePresence>
              {selectedEntry && (
                <motion.div
                  initial={{ x: 600 }}
                  animate={{ x: 0 }}
                  exit={{ x: 600 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="w-[600px] border-l border-white/10 bg-black/50 backdrop-blur-xl"
                >
                  <div className="p-8 overflow-y-auto h-full">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-bold">Problem Details</h3>
                      <button
                        onClick={handleCloseDetails}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    {(() => {
                      const entry = dummyJournalEntries.find(
                        (e) => e.id === selectedEntry
                      );
                      if (!entry) return null;

                      return (
                        <div className="space-y-8">
                          {/* Problem Understanding */}
                          <section>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <span className="w-1 h-6 bg-white/20 rounded-full"></span>
                              Problem Understanding
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Inputs & Outputs
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  <p className="mb-2">
                                    <strong>Input:</strong>{" "}
                                    {entry.details.inputs}
                                  </p>
                                  <p>
                                    <strong>Output:</strong>{" "}
                                    {entry.details.outputs}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Constraints
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  {entry.details.constraints}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Core Question
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  {entry.details.coreQuestion}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Edge Cases
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  {entry.details.edgeCases}
                                </div>
                              </div>
                            </div>
                          </section>

                          {/* Brainstorming */}
                          <section>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <span className="w-1 h-6 bg-white/20 rounded-full"></span>
                              Brainstorming & Approach Selection
                            </h4>
                            <div className="space-y-4">
                              {entry.details.ideas.map((idea, index) => (
                                <div
                                  key={index}
                                  className="bg-white/5 p-4 rounded-lg border border-white/10"
                                >
                                  <h5 className="font-medium mb-3">
                                    Idea {index + 1}: {idea.title}
                                  </h5>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm text-gray-400 mb-1">
                                        Pros
                                      </label>
                                      <div className="bg-white/5 p-3 rounded border border-white/10">
                                        {idea.pros}
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-sm text-gray-400 mb-1">
                                        Cons
                                      </label>
                                      <div className="bg-white/5 p-3 rounded border border-white/10">
                                        {idea.cons}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h5 className="font-medium mb-3">
                                  Chosen Approach
                                </h5>
                                <p className="mb-2">
                                  <strong>Idea:</strong>{" "}
                                  {entry.details.chosenIdea}
                                </p>
                                <p>
                                  <strong>Rationale:</strong>{" "}
                                  {entry.details.rationale}
                                </p>
                              </div>
                            </div>
                          </section>

                          {/* Implementation */}
                          <section>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <span className="w-1 h-6 bg-white/20 rounded-full"></span>
                              Implementation
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Pseudocode
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10 whitespace-pre-wrap font-mono text-sm">
                                  {entry.details.pseudocode}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Code
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  <pre className="whitespace-pre-wrap font-mono text-sm">
                                    {entry.details.implementation}
                                  </pre>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Bugs Encountered
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  {entry.details.bugs}
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Missed Edge Cases
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  {entry.details.missedEdgeCases}
                                </div>
                              </div>
                            </div>
                          </section>

                          {/* Solution Summary */}
                          <section>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <span className="w-1 h-6 bg-white/20 rounded-full"></span>
                              Solution Summary
                            </h4>
                            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                              <p className="text-gray-300">
                                {entry.details.solutionSummary}
                              </p>
                            </div>
                          </section>

                          {/* Key Learnings */}
                          <section>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <span className="w-1 h-6 bg-white/20 rounded-full"></span>
                              Key Learnings
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Core Idea & Pattern
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  <p className="text-gray-300">
                                    {entry.details.keyLearnings.coreIdea}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Data Structure Insights
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  <p className="text-gray-300">
                                    {
                                      entry.details.keyLearnings
                                        .dataStructureInsights
                                    }
                                  </p>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Algorithm Insights
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  <p className="text-gray-300">
                                    {
                                      entry.details.keyLearnings
                                        .algorithmInsights
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </section>

                          {/* Self Reflection */}
                          <section>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <span className="w-1 h-6 bg-white/20 rounded-full"></span>
                              Self Reflection
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  What Went Well
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  <p className="text-gray-300">
                                    {entry.details.selfReflection.whatWentWell}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  What Could Be Better
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  <p className="text-gray-300">
                                    {
                                      entry.details.selfReflection
                                        .whatCouldBeBetter
                                    }
                                  </p>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Areas for Future Study
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  <p className="text-gray-300">
                                    {entry.details.selfReflection.futureStudy}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Confidence Level
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  <span
                                    className={`px-3 py-1 rounded-full text-sm border ${
                                      entry.details.selfReflection
                                        .confidenceLevel === "High"
                                        ? "bg-green-500/20 text-green-400 border-green-500/20"
                                        : entry.details.selfReflection
                                            .confidenceLevel === "Medium"
                                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/20"
                                        : "bg-red-500/20 text-red-400 border-red-500/20"
                                    }`}
                                  >
                                    {
                                      entry.details.selfReflection
                                        .confidenceLevel
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      default:
        return (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Coming Soon! 🚀</h2>
              <p className="text-gray-400">
                This section is under development.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? "80px" : "280px" }}
        className="relative border-r border-white/10 bg-black/50 backdrop-blur-xl"
      >
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-6 bg-white/5 hover:bg-white/10 p-1 rounded-full border border-white/10 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-white" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-white" />
            )}
          </button>

          {/* Logo */}
          <div className="p-6">
            <h1
              className={`font-bold text-xl ${
                isCollapsed ? "hidden" : "block"
              }`}
            >
              LeetCode Mastery
            </h1>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                  ${
                    activeSection === item.id
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <item.icon className="w-5 h-5" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </nav>

          {/* Profile Section */}
          <div className="p-4 border-t border-white/10">
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                  text-gray-400 hover:bg-white/5 hover:text-white
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <User className="w-5 h-5" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium"
                    >
                      Profile
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Profile Menu */}
              <AnimatePresence>
                {showProfileMenu && !isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 mb-2 w-full bg-white/5 rounded-lg border border-white/10 overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/10">
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-400">john@example.com</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-white/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">{renderMainContent()}</div>
    </div>
  );
}
