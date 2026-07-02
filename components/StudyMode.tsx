type StudyModeProps = {
  studyMode: "topic" | "notes";
  setStudyMode: (mode: "topic" | "notes") => void;
};

export default function StudyMode({
  studyMode,
  setStudyMode,
}: StudyModeProps) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3">
      <button
        onClick={() => setStudyMode("topic")}
        className={`rounded-xl border p-3 font-medium transition ${
          studyMode === "topic"
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
        }`}
      >
        Topic
      </button>

      <button
        onClick={() => setStudyMode("notes")}
        className={`rounded-xl border p-3 font-medium transition ${
          studyMode === "notes"
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
        }`}
      >
        Notes
      </button>
    </div>
  );
}