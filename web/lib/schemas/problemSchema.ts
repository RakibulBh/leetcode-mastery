import { z } from "zod";

export const problemSchema = z.object({
  problemName: z.string().min(1, "Problem name is required"),
  problemId: z.string().min(1, "Problem ID is required"),
  topic: z.string().min(1, "Topic is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  inputs: z.string().min(1, "Inputs are required"),
  outputs: z.string().min(1, "Outputs are required"),
  constraints: z.string().min(1, "Constraints are required"),
  coreQuestion: z.string().min(1, "Core question is required"),
  edgeCases: z.string().min(1, "Edge cases are required"),
  ideas: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        pros: z.string().min(1, "Pros are required"),
        cons: z.string().min(1, "Cons are required"),
      })
    )
    .min(1, "At least one idea is required"),
  chosenIdea: z.string().min(1, "Chosen idea is required"),
  rationale: z.string().min(1, "Rationale is required"),
  pseudocode: z.string().min(1, "Pseudocode is required"),
  implementation: z.string().min(1, "Implementation is required"),
  bugs: z.string().min(1, "Bugs are required"),
  missedEdgeCases: z.string().min(1, "Missed edge cases are required"),
  solutionSummary: z.string().min(1, "Solution summary is required"),
  keyLearnings: z.object({
    coreIdea: z.string().min(1, "Core idea is required"),
    dataStructureInsights: z
      .string()
      .min(1, "Data structure insights are required"),
    algorithmInsights: z.string().min(1, "Algorithm insights are required"),
  }),
  selfReflection: z.object({
    whatWentWell: z.string().min(1, "What went well is required"),
    whatCouldBeBetter: z.string().min(1, "What could be better is required"),
    futureStudy: z.string().min(1, "Future study is required"),
    confidenceLevel: z.enum(["Low", "Medium", "High"]),
  }),
});

export type ProblemFormData = z.infer<typeof problemSchema>;
