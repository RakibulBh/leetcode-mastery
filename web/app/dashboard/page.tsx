"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import AddProblemForm from "@/components/AddProblemForm";
import JournalTable from "@/components/JournalTable";
import { sidebarItems } from "@/lib/constants/navigation";
import { JournalEntry } from "@/types/journal";
import { addJournalEntry, getJournalEntries } from "@/services/requests";
import { ProblemFormData } from "@/lib/schemas/problemSchema";

/**
 * Dashboard component that serves as the main interface for the LeetCode Mastery application.
 * It includes a collapsible sidebar, journal table, and problem details panel.
 */
export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("journal");
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAddProblemForm, setShowAddProblemForm] = useState(false);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const { data, error, message } = await getJournalEntries();
        if (error) {
          toast.error(message);
          return;
        }
        setJournalEntries(data || []);
      } catch (error) {
        toast.error("Failed to fetch journal entries");
        console.error("Error fetching journal entries:", error);
      }
    };
    fetchJournalEntries();
  }, []);

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
    console.log("Logging out...");
  };

  const handleAddProblem = async (data: ProblemFormData) => {
    try {
      const newEntry: JournalEntry = {
        id: journalEntries.length + 1,
        problemName: data.problemName,
        problemId: data.problemId,
        dateDone: new Date().toISOString().split("T")[0],
        topic: data.topic,
        difficulty: data.difficulty,
        details: {
          inputs: data.inputs,
          outputs: data.outputs,
          constraints: data.constraints,
          coreQuestion: data.coreQuestion,
          edgeCases: data.edgeCases,
          ideas: data.ideas,
          chosenIdea: data.chosenIdea,
          rationale: data.rationale,
          pseudocode: data.pseudocode,
          implementation: data.implementation,
          bugs: data.bugs,
          missedEdgeCases: data.missedEdgeCases,
          solutionSummary: data.solutionSummary,
          keyLearnings: data.keyLearnings,
          selfReflection: data.selfReflection,
        },
      };

      setJournalEntries([newEntry, ...journalEntries]);

      await addJournalEntry(newEntry);

      setShowAddProblemForm(false);
      toast.success("Problem added successfully!");
    } catch (error) {
      console.error("Error in handleAddProblem:", error);
      toast.error("Failed to add problem");
      throw error;
    }
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "journal":
        return (
          <div className="flex h-full">
            <div className={`flex-1 ${selectedEntry ? "pr-0" : "pr-4"}`}>
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">My Journal</h2>
                  <button
                    onClick={() => setShowAddProblemForm(true)}
                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add Problem
                  </button>
                </div>

                <JournalTable
                  entries={journalEntries}
                  selectedEntry={selectedEntry}
                  onEntrySelect={setSelectedEntry}
                />
              </div>
            </div>

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
                      const entry = journalEntries.find(
                        (e) => e.id === selectedEntry
                      );
                      if (!entry) return null;

                      return (
                        <div className="space-y-8">
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

                          <section>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <span className="w-1 h-6 bg-white/20 rounded-full"></span>
                              Implementation & Solution
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm text-gray-400 mb-1">
                                  Solution Summary
                                </label>
                                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                                  <p className="text-gray-300">
                                    {entry.details.solutionSummary}
                                  </p>
                                </div>
                              </div>
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

                          <section>
                            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <span className="w-1 h-6 bg-white/20 rounded-full"></span>
                              Learnings & Reflection
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
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? "80px" : "280px" }}
        className="relative border-r border-white/10 bg-black/50 backdrop-blur-xl"
      >
        <div className="flex flex-col h-full">
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

          <div className="p-6">
            <h1
              className={`font-bold text-xl ${
                isCollapsed ? "hidden" : "block"
              }`}
            >
              LeetCode Mastery
            </h1>
          </div>

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

      <div className="flex-1 overflow-hidden">{renderMainContent()}</div>

      <AnimatePresence>
        {showAddProblemForm && (
          <AddProblemForm
            onClose={() => setShowAddProblemForm(false)}
            onSubmit={handleAddProblem}
          />
        )}
      </AnimatePresence>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
}
