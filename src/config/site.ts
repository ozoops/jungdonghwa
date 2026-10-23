import type { SiteConfig } from "../types/site";

/**
 * 이 파일 하나만 고치면 화면의 문구·연락처·FAQ·경력이 모두 바뀝니다.
 * 값을 null 로 두면 해당 요소가 화면에서 자동으로 숨겨집니다.
 */
const siteConfig = {
  meta: {
    // TODO(운영 주소 확정 후 교체): QR 코드와 링크 미리보기 주소에 쓰입니다.
    url: "https://jungdonghwa.example.com",
    title: "내 보험, 먼저 점검해 드립니다 | 정동화 GFC",
    description:
      "삼성생명 중앙법인지점 GFC 정동화입니다. 가입 권유보다 점검이 먼저입니다. 가입하신 보험을 있는 그대로 살펴봅니다.",
    siteName: "정동화 GFC",
    ogImage: "/images/og-v2.png",
    ogImageAlt: "정동화 GFC · 삼성생명 중앙법인지점",
    themeColor: "#1E2A78",
    noindex: true,
  },

  person: {
    name: "정동화",
    role: "GFC",
    org: "삼성생명 중앙법인지점",
    photo: "/images/profile.webp",
    photoAlt: "정동화 GFC",
    region: "서울·경기 전 지역",
    specialty: "개인 및 법인보험",
  },

  contact: {
    phone: "010-2190-5833",
    chatUrl: "https://open.kakao.com/o/skvvjJTi",
    email: "ozoops5911@gmail.com",
    labels: { phone: "전화", chat: "오픈채팅", mail: "이메일" },
  },

  notice: "서울·경기 전 지역 상담 · 점검만 받으셔도 괜찮습니다",

  hero: {
    eyebrow: "개인보험 점검",
    headline: ["내 보험, 충분한지", "먼저 점검해 보세요"],
    sub: "가입 권유보다 점검이 먼저입니다",
    linkLabel: "점검은 이렇게 진행됩니다",
    linkTarget: "steps",
  },

  shortcuts: {
    title: "정동화 바로가기",
    items: [
      { id: "tel", label: "전화 상담", icon: "phone", action: "tel" },
      { id: "chat", label: "오픈채팅", icon: "message-circle", action: "chat" },
      { id: "mail", label: "이메일", icon: "mail", action: "mail" },
      { id: "prep", label: "점검 준비물", icon: "clipboard-list", action: "dialog" },
      { id: "steps", label: "3단계 점검", icon: "list-checks", action: "scroll", target: "steps" },
      { id: "faq", label: "자주 묻는 질문", icon: "circle-help", action: "scroll", target: "faq" },
    ],
    dialog: {
      title: "점검 준비물",
      body: "가입하신 보험사 이름과, 증권 또는 보험사 앱의 가입 목록 화면이 있으면 더 빠릅니다. 없어도 상담은 시작할 수 있습니다.",
    },
  },

  promises: {
    title: "상담 전에 약속드립니다",
    items: [
      "기존 보험을 바꾸라고 권하지 않습니다. 현재 가입하신 내용을 있는 그대로 살펴봅니다.",
      "연락은 문의하신 방법으로만 드립니다.",
      "점검만 받으셔도 괜찮습니다.",
    ],
  },

  concerns: {
    title: "이런 고민이 있으신가요?",
    ctaLabel: "이 주제로 오픈채팅 문의",
    featured: {
      id: "check",
      title: "내 보험, 충분할까요?",
      description: "가입하신 보험을 보장 항목별로 살펴봅니다.",
      icon: "search-check",
    },
    items: [
      {
        id: "disease",
        title: "큰 병 대비",
        description: "암·뇌·심장 질환 이후의 치료 기간을 함께 생각해 봅니다.",
        icon: "heart-pulse",
      },
      {
        id: "retire",
        title: "노후 준비",
        description: "연금과 간병·요양을 미리 살펴봅니다.",
        icon: "hourglass",
      },
      {
        id: "family",
        title: "가족을 위한 보장",
        description: "가장의 빈자리와 상속 준비를 점검합니다.",
        icon: "users",
      },
    ],
  },

  steps: {
    title: "점검은 3단계로 진행됩니다",
    layout: "carousel",
    ctaLabel: "오픈채팅으로 점검 문의",
    items: [
      { title: "현재 보험 확인", description: "가입하신 보험 목록을 함께 정리합니다." },
      {
        title: "보장 항목별 살펴보기",
        description: "사망·진단·수술·입원·간병·연금 항목별로 현재 상태를 확인합니다.",
      },
      {
        title: "정리된 결과 설명",
        description: "보완이 필요한 부분이 있을 때만 방향을 안내드립니다.",
      },
    ],
  },

  profile: {
    title: "정동화를 소개합니다",
    intro: "가입 권유보다 점검이 먼저라는 원칙으로, 가입하신 보험을 있는 그대로 살펴봅니다.",
    careersTitle: "경력",
    regionLabel: "활동 지역",
    specialtyLabel: "전문 분야",
  },

  careers: [
    { org: "농협중앙회", role: "조합구조개선부장", period: null },
    { org: "NH농협생명", role: "금융소비자보호총괄책임자(CCO)", period: null },
  ],

  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        q: "상담받으면 보험을 바꿔야 하나요?",
        a: "바꾸시라고 권하는 것이 목적이 아닙니다. 가입하신 내용을 먼저 확인하고, 부족하거나 겹치는 부분이 있는지 함께 살펴본 뒤 결정은 고객님이 하십니다.",
      },
      {
        q: "문의하면 계속 연락이 오나요?",
        a: "문의하신 방법으로만 연락드립니다. 원치 않으시면 언제든 말씀해 주세요.",
      },
      {
        q: "보험을 잘 몰라도 괜찮을까요?",
        a: "어려운 용어는 쉬운 말로 풀어 설명드립니다. 가입하신 보험 목록만 준비하셔도 시작할 수 있습니다.",
      },
      {
        q: "어느 지역에서 상담하나요?",
        a: "서울과 경기 전 지역에서 활동합니다.",
      },
      // 결정 D3 확정 전까지 답을 null 로 두어 화면에서 숨깁니다.
      { q: "상담 비용이 있나요?", a: null },
    ],
  },

  start: {
    title: "점검, 부담 없이 시작해 보세요",
    body: "점검만 받으셔도 괜찮습니다",
  },

  footer: {
    corporateNote: "법인 대표님 상담은 전화나 오픈채팅으로 문의해 주세요.",
    reviewNo: null,
  },

  share: {
    copyLabel: "링크 복사",
    shareLabel: "공유하기",
    saveContactLabel: "연락처 저장",
    copied: "링크를 복사했습니다",
    shareTitle: "정동화 GFC",
  },

  desktop: {
    frameCaption: "정동화 · 삼성생명 중앙법인지점",
    qrTitle: "휴대폰으로 이어서 보기",
    qrBody: "휴대폰 카메라로 QR을 비추면 같은 화면이 열립니다.",
    qrAlt: "휴대폰으로 이어서 보기 QR 코드",
  },

  ui: {
    closeLabel: "닫기",
    newWindow: "새 창으로 열림",
    quickContact: "빠른 연락",
    stepCounter: "{current}/{total}",
    carouselLabel: "점검 단계",
    slideLabel: "{current}번째 단계, 총 {total}단계",
  },
} satisfies SiteConfig;

// satisfies 로 오타·빈 칸을 빌드 시 검사하고, 화면에서는 넓은 타입(SiteConfig)으로 사용합니다.
export const site: SiteConfig = siteConfig;
