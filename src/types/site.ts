export type SectionKey = "promises" | "concerns" | "steps" | "profile" | "faq" | "start";

export type IconName =
  | "phone"
  | "message-circle"
  | "mail"
  | "clipboard-list"
  | "list-checks"
  | "circle-help"
  | "search-check"
  | "heart-pulse"
  | "hourglass"
  | "users";

export type ShortcutItem =
  | { id: string; label: string; icon: IconName; action: "tel" | "chat" | "mail" }
  | { id: string; label: string; icon: IconName; action: "scroll"; target: SectionKey }
  | { id: string; label: string; icon: IconName; action: "dialog" };

export interface ConcernItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface CareerItem {
  org: string;
  role: string;
  /** 경력 연도는 확인 전까지 null로 둡니다. */
  period: string | null;
}

export interface FaqItem {
  q: string;
  /** null 이거나 빈 문자열이면 화면에서 자동으로 숨겨집니다. */
  a: string | null;
}

export interface SiteConfig {
  meta: {
    /** 운영 주소. QR 코드와 링크 미리보기에 쓰입니다. */
    url: string;
    title: string;
    description: string;
    siteName: string;
    ogImage: string;
    ogImageAlt: string;
    themeColor: string;
    /** true 이면 검색엔진 노출을 막습니다(결정 D7). */
    noindex: boolean;
  };
  person: {
    name: string;
    role: string;
    org: string;
    photo: string;
    photoAlt: string;
    region: string;
    specialty: string;
  };
  contact: {
    phone: string;
    chatUrl: string;
    email: string;
    labels: { phone: string; chat: string; mail: string };
  };
  notice: string | null;
  hero: {
    eyebrow: string;
    headline: string[];
    sub: string;
    linkLabel: string;
    linkTarget: SectionKey;
  };
  shortcuts: {
    title: string;
    items: ShortcutItem[];
    dialog: { title: string; body: string };
  };
  promises: { title: string; items: string[] };
  concerns: {
    title: string;
    ctaLabel: string;
    featured: ConcernItem;
    items: ConcernItem[];
  };
  steps: {
    title: string;
    /** carousel: 옆으로 넘김 / list: 세로 3장(결정 D9) */
    layout: "carousel" | "list";
    ctaLabel: string;
    items: StepItem[];
  };
  profile: {
    title: string;
    intro: string | null;
    careersTitle: string;
    regionLabel: string;
    specialtyLabel: string;
  };
  careers: CareerItem[];
  faq: { title: string; items: FaqItem[] };
  start: { title: string; body: string };
  footer: {
    corporateNote: string;
    /** 광고 심의번호. null 이면 해당 줄이 사라집니다. */
    reviewNo: string | null;
  };
  share: {
    copyLabel: string;
    shareLabel: string;
    saveContactLabel: string;
    copied: string;
    shareTitle: string;
  };
  desktop: {
    frameCaption: string;
    qrTitle: string;
    qrBody: string;
    qrAlt: string;
  };
  ui: {
    closeLabel: string;
    newWindow: string;
    quickContact: string;
    stepCounter: string;
    carouselLabel: string;
    slideLabel: string;
  };
}
