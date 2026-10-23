import { site } from "@/config/site";

export function TopNotice() {
  if (!site.notice) return null;
  return (
    <div
      data-surface="dark"
      className="bg-navy-soft text-on-dark flex min-h-9 items-center justify-center px-4 py-1 text-center text-sm"
    >
      {site.notice}
    </div>
  );
}
