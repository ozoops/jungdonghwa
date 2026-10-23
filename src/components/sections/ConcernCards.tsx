"use client";

import { Icon } from "@/components/common/Icon";
import { Reveal } from "@/components/common/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import type { ConcernItem } from "@/types/site";
import { MessageCircle } from "lucide-react";

function Card({ item, featured, wide }: { item: ConcernItem; featured?: boolean; wide?: boolean }) {
  const { concerns, contact, ui } = site;
  return (
    <AccordionItem
      value={item.id}
      className={cn(
        "bg-surface rounded-2xl border",
        featured ? "border-navy col-span-2 border-2" : "border-line",
        (featured || wide) && "col-span-2",
        "data-[state=open]:col-span-2",
      )}
    >
      <AccordionTrigger
        className={cn(
          "text-ink w-full px-4",
          featured
            ? "min-h-28 items-center text-xl"
            : wide
              ? "min-h-24 items-center text-base"
              : "min-h-24 items-start py-4 text-base",
        )}
      >
        <span
          className={cn("flex gap-3", featured || wide ? "items-center" : "flex-col items-start")}
        >
          <span className="bg-tint text-navy flex size-11 shrink-0 items-center justify-center rounded-full">
            <Icon name={item.icon} className="size-6" />
          </span>
          {item.title}
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <p className="text-ink-muted text-base leading-relaxed">{item.description}</p>
        <Button asChild variant="outline" size="md" className="mt-4 w-full">
          <a href={contact.chatUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden className="size-5" />
            {concerns.ctaLabel}
            <span className="sr-only"> ({ui.newWindow})</span>
          </a>
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}

export function ConcernCards() {
  const { concerns } = site;
  const lastIsAlone = concerns.items.length % 2 === 1;
  return (
    <section
      id="concerns"
      aria-labelledby="concerns-title"
      className="bg-canvas scroll-mt-4 px-4 py-10"
    >
      <Reveal>
        <h2 id="concerns-title" className="mb-5 text-[22px] leading-snug font-bold">
          {concerns.title}
        </h2>
        <Accordion type="single" collapsible className="grid grid-cols-2 items-start gap-3">
          <Card item={concerns.featured} featured />
          {concerns.items.map((item, index) => (
            <Card
              key={item.id}
              item={item}
              wide={lastIsAlone && index === concerns.items.length - 1}
            />
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
