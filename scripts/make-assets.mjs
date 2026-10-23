// 기본 이미지(링크 미리보기 og-v1.png, 파비콘 icon.png, 임시 프로필 사진)를 만듭니다.
// 실제 프로필 사진은 public/images/profile.webp 파일만 교체하면 됩니다.
// 실행: node scripts/make-assets.mjs [--profile]   (--profile 을 붙여야 임시 프로필 사진을 다시 만듭니다)
import { readFile } from "node:fs/promises";
import { chromium } from "playwright-core";
import sharp from "sharp";
import { site } from "../src/config/site.ts";

const font = (await readFile("public/fonts/PretendardVariable.woff2")).toString("base64");
const css = `@font-face{font-family:P;src:url(data:font/woff2;base64,${font});font-weight:45 920}
*{box-sizing:border-box;margin:0}body{font-family:P,sans-serif;background:#1E2A78;color:#fff}`;

const ogHtml = `<style>${css}
body{width:1200px;height:630px;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.k{font-size:34px;font-weight:600;color:#CBD2F6}
h1{font-size:92px;line-height:1.25;font-weight:800;letter-spacing:-1px}
.n{font-size:40px;font-weight:700}.n span{font-weight:500;color:#CBD2F6;margin-left:14px}
</style><div class="k">개인보험 점검</div>
<h1>내 보험,<br>먼저 점검해 드립니다</h1>
<div class="n">${site.person.name} ${site.person.role}<span>${site.person.org}</span></div>`;

const iconHtml = `<style>${css}
body{width:512px;height:512px;display:flex;align-items:center;justify-content:center;font-size:300px;font-weight:800;background:#1E2A78}
b{color:#FFC93C}</style><b>${site.person.name[0]}</b>`;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
async function shot(html, w, h, out) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out });
  await page.close();
}
await shot(ogHtml, 1200, 630, "public/images/og-v1.png");
await shot(iconHtml, 512, 512, "src/app/icon.png");
await browser.close();

if (process.argv.includes("--profile")) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <rect width="400" height="400" fill="#E8ECFA"/><circle cx="200" cy="155" r="72" fill="#9AA5D8"/>
  <path d="M60 400c0-86 62-140 140-140s140 54 140 140z" fill="#9AA5D8"/></svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile("public/images/profile.webp");
}
console.log("자산 생성 완료");
