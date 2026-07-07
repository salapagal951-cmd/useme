import Button from "@/components/Button";

type Props = {
  onFileSelect: (file: File) => void;
};

export default function FileUploadCard({
  onFileSelect,
}: Props) {
  return (
    <div className="mt-8 rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
      <div className="text-5xl">📚</div>

      <h2 className="mt-4 text-2xl font-bold text-zinc-900">
        Upload Study Material
      </h2>

      <p className="mt-2 text-zinc-600">
        Upload a PDF or image to generate an interactive quiz.
      </p>

      <input
  id="file-upload"
  type="file"
  accept=".pdf,.png,.jpg,.jpeg"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }}
/>

     <Button
  className="mt-6"
  type="button"
  onClick={() => {
    document.getElementById("file-upload")?.click();
  }}
>
  Choose File
</Button>

      <p className="mt-4 text-sm text-zinc-500">
        Supported: PDF, JPG, JPEG, PNG
      </p>
    </div>
  );
}