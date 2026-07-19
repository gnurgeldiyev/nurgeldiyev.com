import { poemLines, socials } from "@/config/content";
import { SocialIcon } from "./icons";
import PoemTicker from "./PoemTicker";
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line pt-8 pb-8">
      <div className="flex flex-wrap items-center gap-4">
        {socials.map((s) => (
          <a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={s.label}
            className="text-faint transition-colors hover:text-accent"
          >
            <SocialIcon platform={s.platform} />
          </a>
        ))}
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>

      {/* Rolling, draggable poem ticker */}
      <PoemTicker />
      <p className="sr-only">{poemLines.join(" ")}</p>
    </footer>
  );
}
