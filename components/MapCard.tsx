import { location } from "@/config/content";
import { MapPinIcon } from "./icons";

export default function MapCard() {
  const { lat, lng, zoom, label } = location;
  // Keyless Google Maps embed — real Google tiles, no API key, free to host.
  const embed = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=en&output=embed`;
  const href = `https://www.google.com/maps/place/${encodeURIComponent(label)}/@${lat},${lng},${zoom}z`;

  return (
    <div className="card group relative h-full min-h-40 overflow-hidden">
      <iframe
        title={`Map of ${label}`}
        src={embed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="map-frame pointer-events-none absolute inset-0 h-full w-full"
      />
      {/* Branded green duotone — subtle, tints the monochrome tiles on-accent */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ background: "linear-gradient(150deg, var(--accent), transparent 65%)", opacity: 0.5 }}
        aria-hidden
      />
      {/* Refined framing: inner hairline + soft bottom vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05), inset 0 -34px 44px -22px rgba(0,0,0,0.22)" }}
        aria-hidden
      />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
      >
        <span className="sr-only">Open {label} in Google Maps</span>
      </a>
      <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-main shadow-sm ring-1 ring-line">
        <MapPinIcon className="h-3.5 w-3.5 text-accent" />
        {label}
      </span>
    </div>
  );
}
