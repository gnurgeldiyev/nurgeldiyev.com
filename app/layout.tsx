import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inria_Serif } from "next/font/google";
import { site } from "@/config/content";
import "./globals.css";

// Matches serpay.penjire.com: Bricolage Grotesque (sans) + Inria Serif (serif).
const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const serif = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-inria",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${profileName()} — Engineering & Product at Airflora`,
    template: `%s · ${profileName()}`,
  },
  description: site.description,
  keywords: [
    "Guga Nurgeldiyev",
    "Airflora",
    "clean air",
    "engineering",
    "product",
    "Leuven",
    "microblog",
  ],
  authors: [{ name: profileName(), url: site.url }],
  creator: profileName(),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: profileName(),
    title: `${profileName()} — Engineering & Product at Airflora`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@gnurgeldiyev",
    title: `${profileName()} — Engineering & Product at Airflora`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: {
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0b" },
  ],
};

function profileName() {
  return "Guga Nurgeldiyev";
}

// Set the theme class before paint to avoid a flash.
const themeScript = `
(function(){try{
  var t = localStorage.getItem('theme');
  var m = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (t === 'dark' || (!t && m)) document.documentElement.classList.add('dark');
}catch(e){}})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-page text-main antialiased">{children}</body>
    </html>
  );
}
