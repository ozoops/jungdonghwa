import Image from "next/image";
import { site } from "@/config/site";

/**
 * 768px 이상에서만 휴대폰 틀이 보입니다. 틀(transform)이 position:fixed 요소의 기준이 되어
 * 하단 고정바가 틀 안쪽 하단에 놓입니다. 모바일에서는 래퍼가 아무 스타일도 갖지 않습니다.
 */
export function PhoneFrame({ children, bar }: { children: React.ReactNode; bar: React.ReactNode }) {
  const { desktop } = site;
  return (
    <div className="md:bg-navy-deep md:flex md:min-h-svh md:items-center md:justify-center md:gap-14 md:px-8 md:py-6">
      <div className="md:flex md:flex-col md:items-center md:gap-4">
        <p className="text-on-dark hidden text-base font-bold md:block">{desktop.frameCaption}</p>
        <div className="bg-canvas relative mx-auto max-w-[430px] [--first-screen:100svh] md:h-[min(880px,calc(100svh-6rem))] md:w-[430px] md:max-w-none md:transform-gpu md:overflow-hidden md:rounded-[40px] md:border-[10px] md:border-black md:shadow-2xl md:[--first-screen:min(860px,calc(100svh-6rem))]">
          <div className="phone-scroll md:h-full md:overflow-y-auto md:overscroll-contain">
            {children}
          </div>
          {bar}
        </div>
      </div>
      <aside className="text-on-dark hidden max-w-[200px] flex-col gap-3 md:flex">
        <Image
          src="/qr/site.svg"
          alt={desktop.qrAlt}
          width={160}
          height={160}
          unoptimized
          className="rounded-xl bg-white p-2"
        />
        <p className="text-lg font-bold">{desktop.qrTitle}</p>
        <p className="text-on-dark-muted text-sm">{desktop.qrBody}</p>
      </aside>
    </div>
  );
}
