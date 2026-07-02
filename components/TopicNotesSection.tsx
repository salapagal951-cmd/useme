import Textarea from "@/components/Textarea";
import SectionTitle from "@/components/SectionTitle";
 import Input from "@/components/ui/Input";

type Props = {
  studyMode: "topic" | "notes";
  topic: string;
  setTopic: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
};

export default function TopicNotesSection({
  studyMode,
  topic,
  setTopic,
  notes,
  setNotes,
}: Props) {
  return studyMode === "topic" ? (
    <div className="mt-6">
      <SectionTitle>Topic</SectionTitle>

     <Input
  value={topic}
  onChange={(e) => setTopic(e.target.value)}
  placeholder="Example: Indian Constitution"
/>
    </div>
  ) : (
    <div className="mt-6">
      <SectionTitle>Notes</SectionTitle>

      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Paste your notes here..."
      />
    </div>
  );
}