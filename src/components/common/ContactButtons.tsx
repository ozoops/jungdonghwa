import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { telHref } from "@/lib/links";

export function ContactButtons({
  layout = "row",
  className,
}: {
  layout?: "row" | "stack";
  className?: string;
}) {
  const { contact, ui } = site;
  return (
    <div className={cn("grid gap-3", layout === "row" && "grid-cols-2", className)}>
      <Button asChild size="lg" variant="accent">
        <a href={telHref(contact.phone)}>
          <Phone aria-hidden className="size-5" />
          {contact.labels.phone}
        </a>
      </Button>
      <Button asChild size="lg" variant="outlineLight">
        <a href={contact.chatUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle aria-hidden className="size-5" />
          {contact.labels.chat}
          <span className="sr-only"> ({ui.newWindow})</span>
        </a>
      </Button>
    </div>
  );
}
