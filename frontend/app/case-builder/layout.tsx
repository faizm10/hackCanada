export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
    </section>
  );
}
