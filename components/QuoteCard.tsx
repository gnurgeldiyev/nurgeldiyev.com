import { quote } from "@/config/content";
import { ExternalIcon } from "./icons";

export default function QuoteCard() {
  return (
    <a
      href={quote.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover group flex h-full flex-col p-6"
    >
      <span className="text-2xl">{quote.emoji}</span>

      <blockquote className="mt-4 space-y-1.5 font-display text-[15px] italic leading-relaxed text-main">
        {quote.text.split("\n").map((line) => (
          // Hanging indent keeps a wrapped verse line visually part of its line.
          <span key={line} className="block -indent-4 pl-4">
            {line}
          </span>
        ))}
      </blockquote>

      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium not-italic text-accent">
        — {quote.author}
        <ExternalIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}
