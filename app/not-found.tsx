import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl leading-none text-accent">404</p>
      <h1 className="mt-5 font-display text-2xl text-main">This page wandered off</h1>
      <p className="mt-2 max-w-sm text-soft">
        Like a durna with no map — the page you&rsquo;re looking for isn&rsquo;t here.
      </p>
      <Link
        href="/"
        className="group mt-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
      >
        Back home
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </main>
  );
}
