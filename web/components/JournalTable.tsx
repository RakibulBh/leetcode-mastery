"use client";

import { formatDate } from "@/utils/date";
import { JournalEntry, difficultyColors } from "@/types/journal";
import { NoJournalEntries } from "./empty-states/JournalEmptyState";
import { BookOpen, Calendar, Code, Hash, Tag } from "lucide-react";
import { useEffect, useState } from "react";

interface JournalTableProps {
  entries: JournalEntry[];
  selectedEntry: number | null;
  onEntrySelect: (id: number) => void;
}

const JournalTable = ({
  entries,
  selectedEntry,
  onEntrySelect,
}: JournalTableProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!entries || entries.length === 0) {
    return <NoJournalEntries />;
  }

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="text-left p-6 font-medium text-gray-300">
                Problem Name
              </th>
              <th className="text-left p-6 font-medium text-gray-300">ID</th>
              <th className="text-left p-6 font-medium text-gray-300">Date</th>
              <th className="text-left p-6 font-medium text-gray-300">Topic</th>
              <th className="text-left p-6 font-medium text-gray-300">
                Difficulty
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <BookOpen className="w-8 h-8 opacity-50" />
                    <p className="text-lg font-medium">
                      No journal entries yet
                    </p>
                    <p className="text-sm">
                      Start by adding your first problem solution
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr
                  key={entry.id}
                  onClick={() => onEntrySelect(entry.id)}
                  className={`border-b border-white/10 cursor-pointer transition-colors
                    ${
                      selectedEntry === entry.id
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                >
                  <td className="p-6 font-medium">{entry.problemName}</td>
                  <td className="p-6 text-gray-300">#{entry.problemId}</td>
                  <td className="p-6 text-gray-300">{entry.dateDone}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JournalTable;
