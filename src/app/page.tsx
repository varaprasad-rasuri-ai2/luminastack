export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-28 px-6 bg-white dark:bg-black">
        <h1 className="text-4xl font-semibold text-black dark:text-zinc-50">Luminastack</h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400 text-center">
          Your Next.js app is running. Edit <code>src/app/page.tsx</code> to
          customize this page and see live updates.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            className="rounded-full bg-black px-5 py-2 text-sm text-white"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js Docs
          </a>
          <a
            className="rounded-full border border-black px-5 py-2 text-sm"
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind Docs
          </a>
        </div>
      </main>
    </div>
  );
}
