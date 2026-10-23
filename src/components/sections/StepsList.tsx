import { MessageCircle } from "lucide-react";
import { SectionShell } from "@/components/common/SectionShell";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

/** StepsCarousel 이 불안정할 때 쓰는 세로 3장 버전입니다(site.steps.layout = "list"). */
export function StepsList() {
  const { steps, contact, ui } = site;
  return (
    <SectionShell id="steps" title={steps.title} tone="tint">
      <ol className="grid gap-3">
        {steps.items.map((step, index) => (
          <li
            key={step.title}
            className="bg-surface rounded-2xl p-5 shadow-[0_2px_10px_rgba(20,28,90,0.08)]"
          >
            <span className="text-navy text-[40px] leading-none font-extrabold">{index + 1}</span>
            <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
            <p className="text-ink-muted mt-2 text-base leading-relaxed">{step.description}</p>
          </li>
        ))}
      </ol>
      <Button asChild size="md" className="mt-4 w-full">
        <a href={contact.chatUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle aria-hidden className="size-5" />
          {steps.ctaLabel}
          <span className="sr-only"> ({ui.newWindow})</span>
        </a>
      </Button>
    </SectionShell>
  );
}
