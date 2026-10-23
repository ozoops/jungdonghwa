"use client";

import { Reveal } from "@/components/common/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/config/site";

export function FaqList() {
  const { faq } = site;
  const items = faq.items.filter((item) => item.a && item.a.trim().length > 0);
  if (items.length === 0) return null;
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-canvas scroll-mt-4 px-4 py-10">
      <Reveal>
        <h2 id="faq-title" className="mb-5 text-[22px] leading-snug font-bold">
          {faq.title}
        </h2>
        <Accordion type="single" collapsible className="grid gap-3">
          {items.map((item, index) => (
            <AccordionItem
              key={item.q}
              value={`faq-${index}`}
              className="border-line bg-surface rounded-2xl border"
            >
              <AccordionTrigger className="text-ink min-h-14 px-4 py-2 text-[17px]">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-ink-muted px-4 pb-4 text-base leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
