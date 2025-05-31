export type Difficulty = "Easy" | "Medium" | "Hard";

export interface JournalEntry {
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

export const difficultyColors: Record<Difficulty, string> = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/20",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
  Hard: "bg-red-500/20 text-red-400 border-red-500/20",
};
