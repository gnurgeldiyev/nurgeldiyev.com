import Image from "next/image";
import { building } from "@/config/content";
import { CalendarIcon, ExternalIcon } from "./icons";

export default function BuildingCard() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <a
        href={building.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card card-hover group flex items-center gap-4 p-6"
      >
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-card-2 p-2">
          <Image
            src={building.logo}
            alt={building.name}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        </span>
        <span>
          <span className="flex items-center gap-1 font-display text-xl text-main">
            {building.name}
            <ExternalIcon className="h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <span className="mt-0.5 block text-sm text-soft">{building.tagline}</span>
        </span>
      </a>

      <a
        href={building.cal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card card-hover group flex items-center justify-between gap-4 p-6"
        style={{ background: "var(--accent)", borderColor: "transparent" }}
      >
        <span className="text-white">
          <span className="block text-lg font-semibold">{building.cal.label}</span>
          <span className="mt-0.5 block text-sm text-white/80">{building.cal.subtitle}</span>
        </span>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 text-white transition-transform group-hover:scale-105">
          <CalendarIcon />
        </span>
      </a>
    </div>
  );
}
