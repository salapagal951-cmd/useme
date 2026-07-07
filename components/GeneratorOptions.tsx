import SectionTitle from "@/components/SectionTitle";
import Select from "@/components/ui/Select";
type Props = {
  studyMode: "topic" | "notes";

  difficulty: string;
  setDifficulty: (value: string) => void;

  questionCount: number | "max";
  setQuestionCount: (value: number | "max") => void;
};

export default function GeneratorOptions({
  studyMode,
  difficulty,
  setDifficulty,
  questionCount,
  setQuestionCount,
}: Props) {
  
  return (
    <>
      <div className="mt-6">
        <SectionTitle>Difficulty</SectionTitle>

        <Select
  value={difficulty}
  onChange={(e) => setDifficulty(e.target.value)}
>
  <option>Easy</option>
  <option>Medium</option>
  <option>Hard</option>
</Select>
      </div>

      <div className="mt-6">
        <SectionTitle>Number of Questions</SectionTitle>

       <Select
  value={questionCount}
  onChange={(e) => {
    const value = e.target.value;
    setQuestionCount(value === "max" ? "max" : Number(value));
  }}
>
  <option value={10}>10 Questions</option>
  <option value={20}>20 Questions</option>
  <option value={50}>50 Questions</option>

  {studyMode === "notes" && (
    <option value="max">
      Maximum Questions
    </option>
  )}
</Select>
      </div>
    </>
  );
}