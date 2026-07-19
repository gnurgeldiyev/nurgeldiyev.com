import { preload } from "react-dom";
import Image from "next/image";
import { featured } from "@/config/content";
import { getLinkPreview } from "@/lib/enrich";
import { ExternalIcon } from "./icons";

const IMG_SIZES = "(max-width: 640px) 100vw, 320px";

// Server Component — pulls the site's real preview photo from Restor's OpenGraph.
export default async function FeaturedCard() {
  const preview = await getLinkPreview(featured.url);
  const image = preview.image?.replace(/([?&]width=)\d+/i, "$1800");
  // This image is the LCP. If it's a host we've whitelisted, run it through
  // Vercel image optimization (WebP/AVIF + edge cache). Otherwise fall back to
  // a plain eager <img> + preload so we never break on an unexpected host.
  const optimizable = !!image && /^https:\/\/[^/]+\.restor\.eco\//i.test(image);
  if (image && !optimizable) preload(image, { as: "image", fetchPriority: "high" });

  return (
    <a
      href={featured.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover group relative flex h-full min-h-64 flex-col overflow-hidden"
    >
      <div className="relative flex-1 overflow-hidden bg-card-2">
        {image ? (
          <>
            {optimizable ? (
              <Image
                src={image}
                alt={preview.title}
                fill
                priority
                sizes={IMG_SIZES}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={image}
                alt={preview.title}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          </>
        ) : (
          <span className="absolute inset-0 grid place-items-center text-5xl">
            {featured.emoji}
          </span>
        )}
        <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-lg shadow-sm backdrop-blur">
          {featured.emoji}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl leading-snug text-main">{featured.title}</h3>
        <p className="mt-1 text-sm text-soft">{featured.subtitle}</p>
        <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
          restor.eco
          <ExternalIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}
