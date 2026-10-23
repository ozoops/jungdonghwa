import Image from "next/image";
import { SectionShell } from "@/components/common/SectionShell";
import { site } from "@/config/site";
import { ShareTools } from "./ShareTools";

export function Profile() {
  const { person, profile, careers } = site;
  return (
    <SectionShell id="profile" title={profile.title} tone="white">
      <div className="flex flex-col items-center text-center">
        <Image
          src={person.photo}
          alt={person.photoAlt}
          width={120}
          height={120}
          loading="lazy"
          className="border-line size-[120px] rounded-full border-2 object-cover"
        />
        <p className="mt-4 text-2xl font-bold">{person.name}</p>
        <p className="text-ink-muted mt-1 text-base">
          {person.role} · {person.org}
        </p>
        {profile.intro && <p className="mt-4 text-base leading-relaxed">{profile.intro}</p>}
      </div>

      {careers.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-lg font-bold">{profile.careersTitle}</h3>
          <ul className="grid gap-3">
            {careers.map((career) => (
              <li
                key={`${career.org}-${career.role}`}
                className="border-line bg-canvas rounded-2xl border px-4 py-3"
              >
                <p className="text-base font-bold">{career.org}</p>
                <p className="text-ink-muted text-base">{career.role}</p>
                {career.period && <p className="text-ink-muted text-sm">{career.period}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <dl className="mt-6 grid gap-3">
        <div className="border-line bg-canvas rounded-2xl border px-4 py-3">
          <dt className="text-ink-muted text-sm font-semibold">{profile.regionLabel}</dt>
          <dd className="text-base font-bold">{person.region}</dd>
        </div>
        <div className="border-line bg-canvas rounded-2xl border px-4 py-3">
          <dt className="text-ink-muted text-sm font-semibold">{profile.specialtyLabel}</dt>
          <dd className="text-base font-bold">{person.specialty}</dd>
        </div>
      </dl>

      <ShareTools />
    </SectionShell>
  );
}
