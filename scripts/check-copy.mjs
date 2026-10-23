// 보험 광고 표현 검사: src/config/site.ts 의 모든 문구를 검사해 금지 표현이 있으면 경고합니다.
// 사용: node scripts/check-copy.mjs [--strict]   (--strict 이면 경고가 있을 때 빌드를 중단합니다)
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "../src/config/site.ts";

// 지점·준법 의견에 따라 이 목록을 수정하세요.
export const BANNED_TERMS = [
  "최고",
  "1위",
  "무조건",
  "100%",
  "반드시",
  "보장됩니다",
  "손해 없",
  "마감 임박",
  "지금 가입",
];

// 금액·수익률 등 구체적 숫자 표현(NF-L1)
const NUMBER_PATTERNS = [/\d[\d,.]*\s*(원|만원|억|%|퍼센트)/, /환급률|수익률/];

// 이 키의 값은 숫자·주소 형식이 정상이므로 숫자 검사에서 제외합니다.
const SKIP_KEYS = new Set(["phone", "chatUrl", "email", "url", "photo", "ogImage", "themeColor"]);
const PLACEHOLDER_PATTERNS = [/REPLACE_ME/, /example\.com/, /결정 후 작성/];

const warnings = [];
const notes = [];

function walk(value, trail) {
  if (typeof value === "string") {
    const key = trail.at(-1) ?? "";
    for (const term of BANNED_TERMS) {
      if (value.includes(term)) warnings.push(`금지 표현 "${term}" — ${trail.join(".")}: ${value}`);
    }
    if (!SKIP_KEYS.has(key)) {
      for (const pattern of NUMBER_PATTERNS) {
        if (pattern.test(value))
          warnings.push(`금액·수익률 표현 의심 — ${trail.join(".")}: ${value}`);
      }
    }
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.test(value)) notes.push(`임시 값 확인 필요 — ${trail.join(".")}: ${value}`);
    }
  } else if (Array.isArray(value)) {
    value.forEach((item, i) => walk(item, [...trail, String(i)]));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) walk(v, [...trail, k]);
  }
}
walk(site, ["site"]);

// NF-M2: 컴포넌트·앱 파일에 한글 문구를 직접 쓰지 않았는지 검사(주석 제외)
async function files(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await files(full)));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}
for (const dir of ["src/components", "src/app", "src/lib"]) {
  for (const file of await files(dir)) {
    const code = (await readFile(file, "utf8"))
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "")
      .replace(/\s\/\/.*$/gm, "");
    code.split("\n").forEach((line, i) => {
      if (/[가-힣]/.test(line))
        warnings.push(`코드 안 한글 문구 — ${file}:${i + 1}: ${line.trim()}`);
    });
  }
}

if (notes.length) console.log(["", "[확인 필요]", ...notes.map((n) => `  · ${n}`)].join("\n"));
if (warnings.length) {
  console.warn(["", "[경고]", ...warnings.map((w) => `  · ${w}`), ""].join("\n"));
  if (process.argv.includes("--strict")) process.exit(1);
} else {
  console.log("문구 검사 통과: 금지 표현·금액 숫자·코드 내 한글 0건");
}
