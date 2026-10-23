import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/common/MotionProvider";
import { site } from "@/config/site";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
  fallback: ["Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.url),
  title: site.meta.title,
  description: site.meta.description,
  formatDetection: { telephone: false },
  robots: site.meta.noindex ? { index: false, follow: false } : undefined,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.meta.siteName,
    title: site.meta.title,
    description: site.meta.description,
    images: [{ url: site.meta.ogImage, width: 1200, height: 630, alt: site.meta.ogImageAlt }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: site.meta.themeColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
