// site.meta.url 로 PC 화면용 QR(public/qr/site.svg)을 만듭니다. 빌드 때마다 자동 실행됩니다.
import { mkdir, writeFile } from "node:fs/promises";
import QRCode from "qrcode";
import { site } from "../src/config/site.ts";

const svg = await QRCode.toString(site.meta.url, {
  type: "svg",
  margin: 0,
  width: 160,
  color: { dark: "#1E2A78", light: "#FFFFFF" },
});
await mkdir("public/qr", { recursive: true });
await writeFile("public/qr/site.svg", svg);
console.log(`QR 생성: ${site.meta.url}`);
