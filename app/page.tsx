import ProfileHeader from "@/components/ProfileHeader";
import FeaturedCard from "@/components/FeaturedCard";
import MapCard from "@/components/MapCard";
import QuoteCard from "@/components/QuoteCard";
import Section from "@/components/Section";
import SocialLinks from "@/components/SocialLinks";
import BuildingCard from "@/components/BuildingCard";
import SpotifyTrack from "@/components/SpotifyTrack";
import EventClips from "@/components/EventClips";
import PostCard from "@/components/PostCard";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { musicTracks } from "@/config/content";
import { getRecentPosts } from "@/lib/posts";
import { siteGraph } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const recent = getRecentPosts(3);

  return (
    <main className="mx-auto max-w-2xl px-4 pt-10 sm:px-6">
      <JsonLd data={siteGraph()} />
      <ProfileHeader />

      {/* Featured bento row */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="row-span-2">
          <FeaturedCard />
        </div>
        <MapCard />
        <QuoteCard />
      </div>

      {recent.length > 0 && (
        <Section title="Lately" action={{ label: "All posts", href: "/posts" }}>
          <div className="space-y-3">
            {recent.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}

      <Section title="Find me">
        <SocialLinks />
      </Section>

      <Section title="Building at Airflora">
        <BuildingCard />
      </Section>

      <Section title="Music I love 🎶">
        <div className="grid gap-3 sm:grid-cols-2">
          {musicTracks.map((url) => (
            <SpotifyTrack key={url} url={url} />
          ))}
        </div>
      </Section>

      <Section title="Out & about 🍷">
        <EventClips />
      </Section>

      <Footer />
    </main>
  );
}
