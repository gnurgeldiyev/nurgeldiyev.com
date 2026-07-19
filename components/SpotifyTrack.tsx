import { SpotifyIcon } from "./icons";

// Pull the track id out of any open.spotify.com/track/<id>?... URL.
function trackId(url: string): string | null {
  return url.match(/track\/([a-zA-Z0-9]+)/)?.[1] ?? null;
}

// Renders Spotify's official embed player (real play button + album art).
export default function SpotifyTrack({ url }: { url: string }) {
  const id = trackId(url);

  if (!id) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="card card-hover flex items-center gap-2 p-4 text-sm text-soft"
      >
        <SpotifyIcon className="text-[#1DB954]" /> Open in Spotify
      </a>
    );
  }

  return (
    <iframe
      title="Spotify player"
      src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
      width="100%"
      height={152}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      className="w-full rounded-xl"
      style={{ border: 0, colorScheme: "normal" }}
    />
  );
}
