import { site } from "@/config/site";
import { FOOTER_ID } from "@/lib/ids";
import { mailHref } from "@/lib/links";

export function Footer() {
  const { person, contact, footer } = site;
  return (
    <footer
      id={FOOTER_ID}
      data-surface="dark"
      className="bg-navy-deep text-on-dark-muted px-4 pt-8 pb-[calc(5rem+env(safe-area-inset-bottom))] text-sm leading-relaxed"
    >
      <p className="text-on-dark text-base font-bold">
        {person.name} · {person.role} · {person.org}
      </p>
      <p className="mt-2">
        <a href={mailHref(contact.email)} className="underline underline-offset-2">
          {contact.email}
        </a>
      </p>
      <p>{person.region}</p>
      <p className="mt-3">{footer.corporateNote}</p>
      {footer.reviewNo && <p className="mt-3">{footer.reviewNo}</p>}
    </footer>
  );
}
