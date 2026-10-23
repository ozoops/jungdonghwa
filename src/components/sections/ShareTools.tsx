"use client";

import { useState } from "react";
import { Copy, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export function ShareTools() {
  const { share } = site;
  const [message, setMessage] = useState("");
  const [canShare] = useState(
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
  );

  const copyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("textarea");
      input.value = url;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setMessage(share.copied);
  };

  const shareLink = async () => {
    try {
      await navigator.share({ title: share.shareTitle, url: window.location.href });
    } catch {
      /* 사용자가 공유창을 닫은 경우 */
    }
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-3">
        {canShare ? (
          <Button variant="outline" size="md" onClick={shareLink}>
            <Share2 aria-hidden className="size-5" />
            {share.shareLabel}
          </Button>
        ) : (
          <Button variant="outline" size="md" onClick={copyLink}>
            <Copy aria-hidden className="size-5" />
            {share.copyLabel}
          </Button>
        )}
        <Button asChild variant="outline" size="md">
          <a href="/contact.vcf" download>
            <Download aria-hidden className="size-5" />
            {share.saveContactLabel}
          </a>
        </Button>
      </div>
      <p aria-live="polite" className="text-ink-muted mt-2 min-h-6 text-center text-sm">
        {message}
      </p>
    </div>
  );
}
