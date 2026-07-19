import { socials } from "@/config/content";
import { SocialIcon } from "./icons";

export default function SocialLinks() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {socials.map((s) => (
        <a
          key={s.platform}
          href={s.url}
          target="_blank"
          rel="me noopener noreferrer"
          className="card card-hover group flex items-center gap-3 p-4"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-card-2 text-soft transition-colors group-hover:bg-accent-soft group-hover:text-accent">
            <SocialIcon platform={s.platform} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-main">{s.label}</span>
            <span className="block truncate text-xs text-faint">{s.handle}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
