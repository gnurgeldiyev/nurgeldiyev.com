import { person, site, socials } from "@/config/content";
import type { Post } from "./posts";

// schema.org JSON-LD builders. Entities are wired together by matching @id so
// crawlers resolve a single identity graph (Person ← WebSite/Blog/BlogPosting).

const PERSON_ID = `${site.url}/#person`;
const WEBSITE_ID = `${site.url}/#website`;

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: person.name,
    givenName: person.givenName,
    familyName: person.familyName,
    url: site.url,
    image: `${site.url}/images/avatar.jpg`,
    jobTitle: person.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: person.worksFor.name,
      url: person.worksFor.url,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: person.address.locality,
      addressCountry: "BE",
    },
    nationality: { "@type": "Country", name: "Turkmenistan" },
    knowsAbout: person.knowsAbout,
    sameAs: socials.map((s) => s.url),
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

/** Combined Person + WebSite graph for the homepage. */
export function siteGraph() {
  return { "@context": "https://schema.org", "@graph": [personNode(), websiteNode()] };
}

export function blogNode() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/posts#blog`,
    url: `${site.url}/posts`,
    name: `${site.name} — Lately`,
    description:
      "A running microblog — poems, songs, thoughts, and notes from building Airflora.",
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

export function blogPostingNode(post: Post) {
  const url = `${site.url}/posts/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    mainEntityOfPage: url,
    url,
    headline: (post.title ?? post.excerpt).slice(0, 110),
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    image: `${url}/opengraph-image`,
    keywords: post.tags?.join(", "),
    inLanguage: "en",
  };
}

export function breadcrumbNode(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
