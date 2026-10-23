// Pretendard 가변 글꼴을 이 사이트에서 쓰는 글자만 남겨 용량을 줄입니다(빌드 때마다 자동 실행).
// site.ts 의 문구를 바꾸면 빌드 때 새 글자가 자동으로 포함됩니다(npm run dev 중에는 npm run font 를 한 번 실행).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import subsetFont from "subset-font";
import { site } from "../src/config/site.ts";

const source = "node_modules/pretendard/dist/public/variable/PretendardVariable.ttf";

const chars = new Set();
(function collect(value) {
  if (typeof value === "string") for (const ch of value) chars.add(ch);
  else if (Array.isArray(value)) value.forEach(collect);
  else if (value && typeof value === "object") Object.values(value).forEach(collect);
})(site);
for (let c = 0x20; c < 0x7f; c++) chars.add(String.fromCharCode(c));
for (const ch of "·•→←…—–‘’“”○●✓×※①②③④⑤⑥") chars.add(ch);
const ttf = await readFile(source);
const woff2 = await subsetFont(ttf, [...chars].join(""), { targetFormat: "woff2" });
await mkdir("public/fonts", { recursive: true });
await writeFile("public/fonts/PretendardVariable.woff2", woff2);
console.log(`글꼴 서브셋: ${chars.size}자, ${(woff2.length / 1024).toFixed(0)}KB`);
