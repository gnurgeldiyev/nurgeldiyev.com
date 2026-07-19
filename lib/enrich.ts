// ---------------------------------------------------------------------------
// Server-side enrichment. Given a bare URL, fetch the rich context around it:
//   - Spotify tracks  -> real title + album art via public oEmbed
//   - any web link     -> OpenGraph title / description / image / site name
//
// Everything here runs only in Server Components. Results are cached by Next's
// fetch cache (revalidated daily) so a build/render fetches each URL at most
// once per day, and the site stays fully static + free on Vercel.
// ---------------------------------------------------------------------------

const DAY = 60 * 60 * 24;

export interface LinkPreview {
  url: string;
  domain: string;
  title: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon: string;
}

export interface SpotifyTrackInfo {
  url: string;
  title: string;
  thumbnail?: string;
}

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function metaTag(html: string, key: string): string | undefined {
  // Match <meta property="og:title" content="..."> in either attribute order.
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']*)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${key}["']`,
      "i"
    ),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return decodeEntities(m[1].trim());
  }
  return undefined;
}

/** Google's favicon service — reliable, no key, and cache-friendly. */
export function faviconFor(url: string, size = 64): string {
  return `https://www.google.com/s2/favicons?domain=${domainOf(url)}&sz=${size}`;
}

export async function getLinkPreview(url: string): Promise<LinkPreview> {
  const domain = domainOf(url);
  const fallback: LinkPreview = { url, domain, title: domain, favicon: faviconFor(url) };

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; nurgeldiyev.com link preview; +https://nurgeldiyev.com)",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: DAY },
    });
    if (!res.ok) return fallback;

    const html = (await res.text()).slice(0, 250_000);
    const title =
      metaTag(html, "og:title") ||
      metaTag(html, "twitter:title") ||
      html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ||
      domain;

    let image = metaTag(html, "og:image") || metaTag(html, "twitter:image");
    if (image && image.startsWith("/")) {
      try {
        image = new URL(image, url).toString();
      } catch {
        image = undefined;
      }
    }

    return {
      url,
      domain,
      title: decodeEntities(title),
      description: metaTag(html, "og:description") || metaTag(html, "description"),
      image,
      siteName: metaTag(html, "og:site_name"),
      favicon: faviconFor(url),
    };
  } catch {
    return fallback;
  }
}

export async function getSpotifyTrack(url: string): Promise<SpotifyTrackInfo> {
  try {
    const res = await fetch(
      `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`,
      { signal: AbortSignal.timeout(8000), next: { revalidate: DAY } }
    );
    if (!res.ok) return { url, title: "Open in Spotify" };
    const data = (await res.json()) as { title?: string; thumbnail_url?: string };
    return {
      url,
      title: data.title ? decodeEntities(data.title) : "Open in Spotify",
      thumbnail: data.thumbnail_url,
    };
  } catch {
    return { url, title: "Open in Spotify" };
  }
}
