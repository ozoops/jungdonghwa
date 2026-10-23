import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ContactButtons } from "@/components/common/ContactButtons";
import { site } from "@/config/site";
import { HERO_END_ID } from "@/lib/ids";

export function Hero() {
  const { person, hero } = site;
  return (
    <>
      <section
        data-surface="dark"
        aria-labelledby="hero-title"
        className="bg-navy text-on-dark flex min-h-[min(calc(var(--first-screen)-5.25rem),38rem)] flex-col rounded-b-[32px] px-4 pt-5 pb-24"
      >
        <div className="flex items-center gap-4">
          <Image
            src={person.photo}
            alt={person.photoAlt}
            width={80}
            height={80}
            priority
            className="size-20 shrink-0 rounded-full border-2 border-white object-cover"
          />
          <div>
            <p className="text-xl leading-tight font-bold">{person.name}</p>
            <p className="text-on-dark-muted mt-1 text-sm">
              {person.role} · {person.org}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <p className="text-on-dark-muted text-sm font-semibold">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-1 text-[28px] leading-[1.3] font-extrabold min-[390px]:text-[30px]"
          >
            {hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="text-on-dark-muted mt-3 text-base">{hero.sub}</p>
          <a
            href={`#${hero.linkTarget}`}
            className="mt-2 inline-flex min-h-11 items-center gap-1 text-base font-semibold underline underline-offset-4"
          >
            {hero.linkLabel}
            <ChevronRight aria-hidden className="size-4" />
          </a>
          <ContactButtons className="mt-4" />
        </div>
      </section>
      <div id={HERO_END_ID} aria-hidden className="h-px" />
    </>
  );
}
