"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { cn } from "@/lib/cn";
import { fillTemplate } from "@/lib/links";

type EmblaApi = UseEmblaCarouselType[1];

interface CarouselContextValue {
  viewportRef: UseEmblaCarouselType[0];
  api: EmblaApi;
  selected: number;
  count: number;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel components must be used inside <Carousel>.");
  return ctx;
}

function Carousel({
  className,
  label,
  children,
  ...props
}: React.ComponentProps<"div"> & { label: string }) {
  const [viewportRef, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [selected, setSelected] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setSelected(api.selectedScrollSnap());
      setCount(api.scrollSnapList().length);
    };
    update();
    api.on("select", update).on("reInit", update);
    return () => {
      api.off("select", update).off("reInit", update);
    };
  }, [api]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      api?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      api?.scrollNext();
    }
  };

  return (
    <CarouselContext.Provider value={{ viewportRef, api, selected, count }}>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={cn("rounded-2xl", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { viewportRef } = useCarousel();
  return (
    <div ref={viewportRef} className="overflow-hidden">
      <div className={cn("flex touch-pan-y", className)} {...props} />
    </div>
  );
}

function CarouselItem({
  className,
  label,
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={label}
      className={cn("min-w-0 shrink-0 grow-0", className)}
      {...props}
    />
  );
}

function CarouselCounter({ template, className }: { template: string; className?: string }) {
  const { selected, count } = useCarousel();
  if (count === 0) return null;
  return (
    <p aria-live="polite" className={className}>
      {fillTemplate(template, { current: selected + 1, total: count })}
    </p>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselCounter };
