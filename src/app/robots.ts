import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: site.meta.noindex ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
  };
}
