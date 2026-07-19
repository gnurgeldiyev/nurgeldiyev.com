import Image from "next/image";
import { profile } from "@/config/content";
import { MapPinIcon } from "./icons";

export default function ProfileHeader() {
  return (
    <header className="animate-[fade-up_0.5s_ease]">
      <div className="flex items-start gap-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-line sm:h-24 sm:w-24">
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        </div>
        <div className="min-w-0 pt-1">
          <h1 className="font-display text-3xl leading-tight text-main sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-1 text-soft">{profile.title}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-faint">
            <span className="inline-flex items-center gap-1">
              <MapPinIcon className="h-4 w-4" />
              {profile.location}
            </span>
            <span aria-hidden>·</span>
            <span>{profile.flags}</span>
          </div>
        </div>
      </div>

      <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-soft">
        {profile.bio}
      </p>
    </header>
  );
}
