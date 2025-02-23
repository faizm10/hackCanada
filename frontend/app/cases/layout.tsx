export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto">{children}</div>
    // </section>
  );
}
