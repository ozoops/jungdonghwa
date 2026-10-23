import { site } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const { person, contact } = site;
  const body = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${person.name};;;;`,
    `FN:${person.name} ${person.role}`,
    `ORG:${person.org}`,
    `TITLE:${person.role}`,
    `TEL;TYPE=CELL:${contact.phone}`,
    `EMAIL:${contact.email}`,
    "END:VCARD",
    "",
  ].join("\r\n");
  return new Response(body, {
    headers: { "Content-Type": "text/vcard; charset=utf-8" },
  });
}
