"use client";

import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselCounter, CarouselItem } from "@/components/ui/carousel";
import { site } from "@/config/site";
import { fillTemplate } from "@/lib/links";

export function StepsCarousel() {
  const { steps, contact, ui } = site;
  const total = steps.items.length;
  return (
    <section id="steps" aria-labelledby="steps-title" className="bg-tint scroll-mt-4 py-10">
      <Reveal>
        <h2 id="steps-title" className="mb-5 px-4 text-[22px] leading-snug font-bold">
          {steps.title}
        </h2>
        <Carousel label={ui.carouselLabel}>
          <CarouselContent>
            {steps.items.map((step, index) => {
              const isLast = index === total - 1;
              return (
                <CarouselItem
                  key={step.title}
                  label={fillTemplate(ui.slideLabel, { current: index + 1, total })}
                  className={`basis-[85%] pl-4 ${isLast ? "pr-4" : ""}`}
                >
                  <div className="bg-surface flex h-full flex-col rounded-2xl p-5 shadow-[0_2px_10px_rgba(20,28,90,0.08)]">
                    <span className="text-navy text-[40px] leading-none font-extrabold">
                      {index + 1}
                    </span>
                    <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                    <p className="text-ink-muted mt-2 text-base leading-relaxed">
                      {step.description}
                    </p>
                    {isLast && (
                      <div className="mt-auto pt-5">
                        <Button asChild variant="default" size="md" className="w-full">
                          <a href={contact.chatUrl} target="_blank" rel="noopener noreferrer">
                            <MessageCircle aria-hidden className="size-5" />
                            {steps.ctaLabel}
                            <span className="sr-only"> ({ui.newWindow})</span>
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselCounter
            template={ui.stepCounter}
            className="text-ink-muted mt-4 text-center text-base font-bold"
          />
        </Carousel>
      </Reveal>
    </section>
  );
}
