import { getLinkPreview } from "@/lib/enrich";
import { ExternalIcon } from "./icons";

// Server Component — fetches OpenGraph metadata for any URL and renders a card.
export default async function LinkPreviewCard({ url }: { url: string }) {
  const p = await getLinkPreview(url);

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover group mt-3 flex flex-col overflow-hidden sm:flex-row"
    >
      {p.image && (
        <div className="relative h-40 w-full shrink-0 overflow-hidden bg-card-2 sm:h-auto sm:w-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="min-w-0 flex-1 p-4">
        <div className="mb-1.5 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.favicon} alt="" width={16} height={16} className="h-4 w-4 rounded-sm" />
          <span className="truncate text-xs text-faint">{p.siteName || p.domain}</span>
          <ExternalIcon className="ml-auto h-3.5 w-3.5 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-main">{p.title}</p>
        {p.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-soft">{p.description}</p>
        )}
      </div>
    </a>
  );
}
