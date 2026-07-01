type SectionTitleProps = {
  children: React.ReactNode;
};

export default function SectionTitle({
  children,
}: SectionTitleProps) {
  return (
    <h2 className="mt-6 text-lg font-bold text-black">
      {children}
    </h2>
  );
}