import { BookOpen, FileText, Lightbulb, ListChecks } from "lucide-react";
import React from "react";
import EmptyState from "../EmptyState";

export const NoJournalEntries = () => (
  <EmptyState
    icon={BookOpen}
    title="No Journal Entries"
    description="Start documenting your coding journey by adding your first journal entry."
  />
);

export const NoIdeas = () => (
  <EmptyState
    icon={Lightbulb}
    title="No Ideas Yet"
    description="Start brainstorming solutions for this problem."
  />
);

export const NoImplementation = () => (
  <EmptyState
    icon={FileText}
    title="No Implementation"
    description="Add your solution implementation here."
  />
);

export const NoReflection = () => (
  <EmptyState
    icon={ListChecks}
    title="No Reflection"
    description="Take a moment to reflect on your solution and learning experience."
  />
);
