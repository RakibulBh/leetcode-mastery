"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { problemSchema, ProblemFormData } from "@/lib/schemas/problemSchema";

interface AddProblemFormProps {
  onClose: () => void;
  onSubmit: (data: ProblemFormData) => void;
}

export default function AddProblemForm({
  onClose,
  onSubmit,
}: AddProblemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<ProblemFormData>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      ideas: [{ title: "", pros: "", cons: "" }],
      difficulty: "Medium",
      bugs: "",
      missedEdgeCases: "",
      selfReflection: {
        whatWentWell: "",
        whatCouldBeBetter: "",
        futureStudy: "",
        confidenceLevel: "Medium",
      },
    },
  });

  const ideas = watch("ideas");

  const addIdea = () => {
    setValue("ideas", [...ideas, { title: "", pros: "", cons: "" }]);
  };

  const removeIdea = (index: number) => {
    setValue(
      "ideas",
      ideas.filter((_, i) => i !== index)
    );
  };

  const onFormSubmit = async (data: ProblemFormData) => {
    console.log("Form submitted with data:", data);
    try {
      console.log("Calling onSubmit handler...");
      await onSubmit(data);
      console.log("onSubmit completed successfully");
      toast.success("Problem added successfully!");
      onClose();
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Failed to add problem. Please try again.");
    }
  };

  // Debug log for form errors
  console.log("Current form errors:", errors);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-black/50 border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-black/50 backdrop-blur-sm z-10">
          <h2 className="text-xl font-bold">Add New Problem</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-8">
          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Problem Name
                </label>
                <input
                  {...register("problemName")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                {errors.problemName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.problemName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Problem ID
                </label>
                <input
                  {...register("problemId")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                {errors.problemId && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.problemId.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Topic
                </label>
                <input
                  {...register("topic")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                {errors.topic && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.topic.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Difficulty
                </label>
                <select
                  {...register("difficulty")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                {errors.difficulty && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Problem Understanding */}
          <section>
            <h3 className="text-lg font-semibold mb-4">
              Problem Understanding
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Inputs & Outputs
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register("inputs")}
                      placeholder="Inputs"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.inputs && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.inputs.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("outputs")}
                      placeholder="Outputs"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    {errors.outputs && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.outputs.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Constraints
                </label>
                <textarea
                  {...register("constraints")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                />
                {errors.constraints && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.constraints.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Core Question
                </label>
                <textarea
                  {...register("coreQuestion")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                />
                {errors.coreQuestion && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.coreQuestion.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Edge Cases
                </label>
                <textarea
                  {...register("edgeCases")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                />
                {errors.edgeCases && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.edgeCases.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Brainstorming */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Brainstorming</h3>
            <div className="space-y-4">
              {ideas.map((_, index) => (
                <div
                  key={index}
                  className="bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Idea {index + 1}</h4>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeIdea(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Title
                      </label>
                      <input
                        {...register(`ideas.${index}.title`)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Pros
                        </label>
                        <textarea
                          {...register(`ideas.${index}.pros`)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Cons
                        </label>
                        <textarea
                          {...register(`ideas.${index}.cons`)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addIdea}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors"
              >
                Add Another Idea
              </button>
            </div>
          </section>

          {/* Implementation */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Implementation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Chosen Idea
                </label>
                <input
                  {...register("chosenIdea")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                {errors.chosenIdea && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.chosenIdea.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Rationale
                </label>
                <textarea
                  {...register("rationale")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                />
                {errors.rationale && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.rationale.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Pseudocode
                </label>
                <textarea
                  {...register("pseudocode")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-32 font-mono"
                />
                {errors.pseudocode && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.pseudocode.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Implementation
                </label>
                <textarea
                  {...register("implementation")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-32 font-mono"
                />
                {errors.implementation && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.implementation.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Bugs Encountered
                </label>
                <textarea
                  {...register("bugs")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                  placeholder="List any bugs or issues you encountered during implementation"
                />
                {errors.bugs && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.bugs.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Missed Edge Cases
                </label>
                <textarea
                  {...register("missedEdgeCases")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                  placeholder="List any edge cases you initially missed"
                />
                {errors.missedEdgeCases && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.missedEdgeCases.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Learnings & Reflection */}
          <section>
            <h3 className="text-lg font-semibold mb-4">
              Learnings & Reflection
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Solution Summary
                </label>
                <textarea
                  {...register("solutionSummary")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                />
                {errors.solutionSummary && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.solutionSummary.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Core Idea & Pattern
                </label>
                <textarea
                  {...register("keyLearnings.coreIdea")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                />
                {errors.keyLearnings?.coreIdea && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.keyLearnings.coreIdea.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Data Structure Insights
                </label>
                <textarea
                  {...register("keyLearnings.dataStructureInsights")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                />
                {errors.keyLearnings?.dataStructureInsights && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.keyLearnings.dataStructureInsights.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Algorithm Insights
                </label>
                <textarea
                  {...register("keyLearnings.algorithmInsights")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                />
                {errors.keyLearnings?.algorithmInsights && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.keyLearnings.algorithmInsights.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  What Went Well
                </label>
                <textarea
                  {...register("selfReflection.whatWentWell")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                />
                {errors.selfReflection?.whatWentWell && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.selfReflection.whatWentWell.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  What Could Be Better
                </label>
                <textarea
                  {...register("selfReflection.whatCouldBeBetter")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                />
                {errors.selfReflection?.whatCouldBeBetter && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.selfReflection.whatCouldBeBetter.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Areas for Future Study
                </label>
                <textarea
                  {...register("selfReflection.futureStudy")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 h-20"
                />
                {errors.selfReflection?.futureStudy && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.selfReflection.futureStudy.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Confidence Level
                </label>
                <select
                  {...register("selfReflection.confidenceLevel")}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.selfReflection?.confidenceLevel && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.selfReflection.confidenceLevel.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => console.log("Submit button clicked")}
              className="px-6 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Problem"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
