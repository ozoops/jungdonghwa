// 기본 이미지(링크 미리보기 og-v4.png, 파비콘 icon.png, 임시 프로필 사진)를 만듭니다.
// 실제 프로필 사진은 public/images/profile.webp 파일만 교체하면 됩니다.
// 실행: node scripts/make-assets.mjs [--profile]   (--profile 을 붙여야 임시 프로필 사진을 다시 만듭니다)
import { readFile } from "node:fs/promises";
import { chromium } from "playwright-core";
import sharp from "sharp";
import { site } from "../src/config/site.ts";

const font = (await readFile("public/fonts/PretendardVariable.woff2")).toString("base64");
const css = `@font-face{font-family:P;src:url(data:font/woff2;base64,${font});font-weight:45 920}
*{box-sizing:border-box;margin:0}body{font-family:P,sans-serif;background:#1E2A78;color:#fff}`;

const photo = (await readFile("public/images/profile.webp")).toString("base64");
const tagline = site.meta.title.split(" | ")[1];
const ogHtml = `<style>${css}
body{position:relative;overflow:hidden;width:1200px;height:630px;background:#2147C6;display:flex;align-items:center;justify-content:center;gap:64px}
.c1,.c2{position:absolute;border-radius:50%;background:#2C5BD7}
.c1{width:760px;height:760px;left:-230px;top:-420px}
.c2{width:560px;height:560px;right:-150px;bottom:-330px}
img{position:relative;width:300px;height:300px;border-radius:50%;border:8px solid #fff;object-fit:cover;flex:none}
.t{position:relative}
.org{font-size:32px;font-weight:600;color:#DCE5FF}
.n{margin-top:6px;font-size:100px;font-weight:800;line-height:1.1}
.r{margin-top:6px;font-size:34px;font-weight:600;color:#DCE5FF}
hr{margin:26px 0 24px;border:0;height:3px;width:560px;background:rgba(255,255,255,.4)}
.l1{font-size:40px;font-weight:700}
.l2{margin-top:6px;font-size:46px;font-weight:800;color:#FFC93C}
</style><div class="c1"></div><div class="c2"></div>
<img src="data:image/webp;base64,${photo}" alt="">
<div class="t"><div class="org">${site.person.org}</div><div class="n">${site.person.name}</div>
<div class="r">${site.person.role} · ${site.hero.eyebrow}</div><hr>
<div class="l1">${site.hero.sub}</div><div class="l2">${tagline}</div></div>`;

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
await shot(ogHtml, 1200, 630, "public/images/og-v4.png");
await shot(iconHtml, 512, 512, "src/app/icon.png");
await browser.close();

if (process.argv.includes("--profile")) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <rect width="400" height="400" fill="#E8ECFA"/><circle cx="200" cy="155" r="72" fill="#9AA5D8"/>
  <path d="M60 400c0-86 62-140 140-140s140 54 140 140z" fill="#9AA5D8"/></svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile("public/images/profile.webp");
}
console.log("자산 생성 완료");
