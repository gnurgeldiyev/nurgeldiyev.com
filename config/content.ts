// ---------------------------------------------------------------------------
// Central content config. This is the "who I am + where to find me" data,
// migrated from the old bento.me/gnurgeldiyev export. Microblog posts live
// separately as MDX files in /content/posts.
// ---------------------------------------------------------------------------

export const site = {
  name: "Guga Nurgeldiyev",
  url: "https://nurgeldiyev.com",
  description:
    "Engineering & Product at Airflora — helping people breathe clean air. Notes, links and things I love, from Leuven.",
};

// Entity data for structured data (JSON-LD), llms.txt and feeds.
export const person = {
  name: "Guga Nurgeldiyev",
  givenName: "Guga",
  familyName: "Nurgeldiyev",
  jobTitle: "Engineering & Product",
  worksFor: { name: "Airflora", url: "https://airflora.care" },
  address: { locality: "Leuven", country: "Belgium" },
  nationality: "Turkmen",
  knowsAbout: [
    "Clean air technology",
    "Air quality monitoring",
    "Product engineering",
    "Software engineering",
    "IoT",
    "Nature restoration",
    "Turkmen poetry",
    "Jazz",
  ],
};

// Curated microblog topics — the only tags used across posts, in filter order.
export const topics = ["poetry", "music", "thoughts", "building", "nature"] as const;

// Rolling footer ticker — poem lines I like, scrolling ticker-tape style.
export const poemLines = [
  "Bir gün bag deý ýanyp-köýseň,",
  "(Baky gelen barmy, eýsem?)",
  "Abraýňy ataňa goýsaň,",
  "Ogluňa atyňy goýsaň,",
  "Bugdaýa meýdany goýsaň,",
  "Zemine asmany goýsaň,",
  "Gurmadygňy goýsaň eger,",
  "Deňi-duşlaň dowam eder.",
  "Sährany şähere goýsaň,",
  "Tohumy bahara goýsaň.",
  "Goýsaň,",
  "Goýsaň,",
  "Köp zat goýsaň,",
  "Derdiňi enä goýmasaň.",
  "Dert alynmaz ýöne ýere,",
  "Kim başyn hesrete goşýar?",
  "Ýöne mydam enelere",
  "Üleşikde şu paý düşýär.",
];

export const profile = {
  name: "Guga Nurgeldiyev",
  title: "Engineering & Product at Airflora",
  subtitle: "Helping people breathe clean air 💚",
  bio: "I would have been a jazz pianist if I weren't an engineer. Building things, restoring a bit of nature, and writing it all down here.",
  flags: "🇹🇲 🇪🇺",
  location: "Leuven, Belgium",
  avatar: "/images/avatar.jpg",
};

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "instagram"
  | "twitter"
  | "youtube"
  | "medium"
  | "producthunt";

export interface Social {
  platform: SocialPlatform;
  label: string;
  handle: string;
  url: string;
}

export const socials: Social[] = [
  { platform: "github", label: "GitHub", handle: "gnurgeldiyev", url: "https://github.com/gnurgeldiyev" },
  { platform: "linkedin", label: "LinkedIn", handle: "in/gnurgeldiyev", url: "https://linkedin.com/in/gnurgeldiyev" },
  { platform: "twitter", label: "X", handle: "@gnurgeldiyev", url: "https://twitter.com/gnurgeldiyev" },
  { platform: "instagram", label: "Instagram", handle: "g.nurgeldiyev", url: "https://instagram.com/g.nurgeldiyev" },
  { platform: "youtube", label: "YouTube", handle: "@gnurgeldiyev", url: "https://youtube.com/@gnurgeldiyev" },
  { platform: "medium", label: "Medium", handle: "@gnurgeldiyev", url: "https://medium.com/@gnurgeldiyev" },
  { platform: "producthunt", label: "Product Hunt", handle: "@gnurgeldiyev", url: "https://producthunt.com/@gnurgeldiyev" },
];

// Featured "restore nature" effort — the standout card on the old bento.
export const featured = {
  emoji: "🌱",
  title: "Restoring nature in the Garagum desert",
  subtitle: "An ongoing effort on Restor",
  url: "https://restor.eco/sites/884aa71c-21d7-4dbf-9222-8f6c41fd1b71",
};

export const quote = {
  emoji: "🪶",
  // Turkmen verse carried over from the bento page — read the full poem on serpay.
  text: "El hünäri il gezermiş, aň hünäri Dünýäni!\nSen Watansyz hasap etme gonup-göçen durnany,\nOnuň üçin serhet bolmaz, ol dünýäň, bendiwany...\nBir-birine gollar beren illere gözüm düşdi.",
  author: "Gurbannazar Ezizow",
  url: "https://serpay.penjire.com/p/gurbannazar-ezizow/gozum-dusdi",
};

export const location = {
  label: "Leuven, Belgium",
  lat: 50.8798,
  lng: 4.7005,
  zoom: 6,
};

// "Building at Airflora"
export const building = {
  name: "Airflora",
  tagline: "Clean air, for everyone.",
  logo: "/images/airflora-logo.png",
  url: "https://airflora.care",
  cal: {
    label: "Book a chat",
    subtitle: "cal.com",
    url: "https://cal.com/guga-airflora/discussions",
  },
};

// "Music I love 🎶" — real Spotify tracks. Titles / album art are enriched
// at build time from Spotify's public oEmbed endpoint (see lib/enrich.ts).
export const musicTracks: string[] = [
  "https://open.spotify.com/track/2CAirvB4PRUmE83C7tppde",
  "https://open.spotify.com/track/17B6aXaEVx7igDB6y5sCix",
  "https://open.spotify.com/track/18NBBN8LJ1a2nVIFoFK5bT",
  "https://open.spotify.com/track/15gkmegUbWk1FcRPjX8gq1",
  "https://open.spotify.com/track/234LwPuKv0RLwbiWYUEeJT",
  "https://open.spotify.com/track/15nE9gxNrTeUUP7Gp82mOL",
  "https://open.spotify.com/track/2d9Foh0dDHqWBYxd8LDTC9",
  "https://open.spotify.com/track/1scrlssnFj5wgq2hLcbtoj",
];

// "Social events 🍷" — short vertical clips already in /public/videos.
export interface EventClip {
  title: string;
  caption: string;
  video: string;
}

export const events: EventClip[] = [
  { title: "Monaco GP", caption: "Formula 1", video: "/videos/f1.mp4" },
  { title: "Fashion Week", caption: "Front row", video: "/videos/fashion.mp4" },
  { title: "Jazz & dining", caption: "Late nights", video: "/videos/jazz.mp4" },
  { title: "Nobel Week", caption: "Stockholm", video: "/videos/nobelweek.mp4" },
];
