"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { site } from "@/config/site";
import { FOOTER_ID, HERO_END_ID, START_ID } from "@/lib/ids";
import { mailHref, telHref } from "@/lib/links";

const cell = "flex min-h-14 flex-1 items-center justify-center gap-2 text-base font-bold";

export function StickyContactBar() {
  const { contact, ui } = site;
  const [pastHero, setPastHero] = useState(false);
  const [endVisible, setEndVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(HERO_END_ID);
    const start = document.getElementById(START_ID);
    const footer = document.getElementById(FOOTER_ID);
    const ends = new Set<Element>();
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const o = new IntersectionObserver(([entry]) => {
        setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      });
      o.observe(hero);
      observers.push(o);
    }

    const endObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) ends.add(entry.target);
          else ends.delete(entry.target);
        }
        setEndVisible(ends.size > 0);
      },
      { threshold: 0.3 },
    );
    if (start) endObserver.observe(start);
    if (footer) endObserver.observe(footer);
    observers.push(endObserver);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = pastHero && !endVisible;

  return (
    <motion.nav
      aria-label={ui.quickContact}
      inert={!show}
      initial={false}
      animate={{ y: show ? 0 : "110%", opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="border-line bg-surface fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[430px] border-t pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(20,28,90,0.12)] md:max-w-none"
    >
      <a href={telHref(contact.phone)} className={`${cell} bg-accent text-on-accent`}>
        <Phone aria-hidden className="size-5" />
        {contact.labels.phone}
      </a>
      <a
        href={contact.chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cell} text-navy`}
      >
        <MessageCircle aria-hidden className="size-5" />
        {contact.labels.chat}
        <span className="sr-only"> ({ui.newWindow})</span>
      </a>
      <a href={mailHref(contact.email)} className={`${cell} text-navy`}>
        <Mail aria-hidden className="size-5" />
        {contact.labels.mail}
      </a>
    </motion.nav>
  );
}
