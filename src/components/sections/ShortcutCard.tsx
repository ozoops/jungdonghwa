"use client";

import { Icon } from "@/components/common/Icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { site } from "@/config/site";
import type { ShortcutItem } from "@/types/site";
import { mailHref, scrollToSection, telHref } from "@/lib/links";

const cellClass =
  "flex min-h-[88px] w-full flex-col items-center justify-center gap-1.5 rounded-xl px-1 py-2 text-center text-[15px] leading-tight font-semibold text-ink hover:bg-tint";

function CellInner({ item }: { item: ShortcutItem }) {
  return (
    <>
      <span className="bg-tint text-navy flex size-11 items-center justify-center rounded-full">
        <Icon name={item.icon} className="size-6" />
      </span>
      <span>{item.label}</span>
    </>
  );
}

function Cell({ item }: { item: ShortcutItem }) {
  const { contact, ui, shortcuts } = site;

  if (item.action === "dialog") {
    return (
      <Dialog>
        <DialogTrigger className={cellClass}>
          <CellInner item={item} />
        </DialogTrigger>
        <DialogContent closeLabel={ui.closeLabel}>
          <DialogTitle className="pr-8 text-xl font-bold">{shortcuts.dialog.title}</DialogTitle>
          <DialogDescription className="text-ink-muted mt-3 text-base leading-relaxed">
            {shortcuts.dialog.body}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }

  if (item.action === "scroll") {
    return (
      <a
        href={`#${item.target}`}
        className={cellClass}
        onClick={(event) => {
          event.preventDefault();
          scrollToSection(item.target);
        }}
      >
        <CellInner item={item} />
      </a>
    );
  }

  if (item.action === "chat") {
    return (
      <a href={contact.chatUrl} target="_blank" rel="noopener noreferrer" className={cellClass}>
        <CellInner item={item} />
        <span className="sr-only">{ui.newWindow}</span>
      </a>
    );
  }

  const href = item.action === "tel" ? telHref(contact.phone) : mailHref(contact.email);
  return (
    <a href={href} className={cellClass}>
      <CellInner item={item} />
    </a>
  );
}

export function ShortcutCard() {
  const { shortcuts } = site;
  return (
    <section aria-labelledby="shortcut-title" className="relative z-10 -mt-12 px-4 pb-10">
      <div className="bg-surface rounded-3xl p-4 shadow-[0_8px_24px_rgba(20,28,90,0.18)]">
        <h2 id="shortcut-title" className="mb-2 px-1 text-base font-bold">
          {shortcuts.title}
        </h2>
        <div className="grid grid-cols-3 gap-x-1 gap-y-1">
          {shortcuts.items.map((item) => (
            <Cell key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
