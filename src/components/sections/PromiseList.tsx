import { Check } from "lucide-react";
import { SectionShell } from "@/components/common/SectionShell";
import { site } from "@/config/site";

export function PromiseList() {
  const { promises } = site;
  return (
    <SectionShell id="promises" title={promises.title} tone="white">
      <ul className="grid gap-4">
        {promises.items.map((text) => (
          <li key={text} className="flex items-start gap-3">
            <span className="bg-navy text-on-dark mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full">
              <Check aria-hidden className="size-4" strokeWidth={3} />
            </span>
            <p className="text-[17px] leading-relaxed">{text}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
