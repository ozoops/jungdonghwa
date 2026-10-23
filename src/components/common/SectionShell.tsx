import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Tone = "white" | "canvas" | "tint" | "dark";

const toneClass: Record<Tone, string> = {
  white: "bg-surface text-ink",
  canvas: "bg-canvas text-ink",
  tint: "bg-tint text-ink",
  dark: "bg-navy text-on-dark",
};

interface SectionShellProps {
  id?: string;
  title?: string;
  tone?: Tone;
  className?: string;
  reveal?: boolean;
  children: React.ReactNode;
}

export function SectionShell({
  id,
  title,
  tone = "white",
  className,
  reveal = true,
  children,
}: SectionShellProps) {
  const headingId = id ? `${id}-title` : undefined;
  const body = (
    <>
      {title && (
        <h2 id={headingId} className="mb-5 text-[22px] leading-snug font-bold">
          {title}
        </h2>
      )}
      {children}
    </>
  );
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      data-surface={tone === "dark" ? "dark" : undefined}
      className={cn("scroll-mt-4 px-4 py-10", toneClass[tone], className)}
    >
      {reveal ? <Reveal>{body}</Reveal> : body}
    </section>
  );
}
