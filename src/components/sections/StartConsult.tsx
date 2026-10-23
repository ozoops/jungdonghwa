import { Mail } from "lucide-react";
import { ContactButtons } from "@/components/common/ContactButtons";
import { SectionShell } from "@/components/common/SectionShell";
import { site } from "@/config/site";
import { START_ID } from "@/lib/ids";
import { mailHref } from "@/lib/links";

export function StartConsult() {
  const { start, contact } = site;
  return (
    <SectionShell id={START_ID} title={start.title} tone="dark" className="rounded-t-[32px] py-12">
      <p className="text-on-dark-muted -mt-2 mb-6 text-base">{start.body}</p>
      <ContactButtons layout="stack" />
      <a
        href={mailHref(contact.email)}
        className="mt-4 flex min-h-11 items-center justify-center gap-2 text-base font-semibold underline underline-offset-4"
      >
        <Mail aria-hidden className="size-5" />
        {contact.email}
      </a>
    </SectionShell>
  );
}
