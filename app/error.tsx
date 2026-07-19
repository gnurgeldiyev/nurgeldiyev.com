"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl leading-none text-accent">oh no</p>
      <h1 className="mt-5 font-display text-2xl text-main">Something broke</h1>
      <p className="mt-2 max-w-sm text-soft">
        A rare gust knocked this page over. Give it another try.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-7 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
      >
        Try again
      </button>
    </main>
  );
}
