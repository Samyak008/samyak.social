export default function HomePage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Hey, I’m Samyak</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <a href="/blog" className="card">
          <h2 className="font-semibold">Latest posts</h2>
          <p className="text-sm text-muted">
            Thoughts, notes, and deep-dives.
          </p>
        </a>
        <a href="/work" className="card">
          <h2 className="font-semibold">Featured work</h2>
          <p className="text-sm text-muted">
            Hand-picked projects and write-ups.
          </p>
        </a>
      </div>
    </section>
  );
}
