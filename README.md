# 정동화 GFC 개인보험 모바일 홈페이지

카카오톡으로 전달하는 웹 명함 겸 소개 페이지입니다. 개인정보를 받는 입력칸이 없는 **정적 한 장짜리 사이트**입니다.
(Next.js App Router · TypeScript strict · Tailwind CSS · shadcn/ui · Lucide · Motion · Pretendard)

## 비개발자용 수정 안내 (1페이지)

**화면의 글자·연락처는 전부 `src/config/site.ts` 한 파일에서 바꿉니다.** 따옴표 안의 글자만 고치세요.

| 바꾸고 싶은 것         | `site.ts` 에서 찾을 곳 | 비고                                                                   |
| ---------------------- | ---------------------- | ---------------------------------------------------------------------- |
| 전화번호               | `contact.phone`        | 모든 전화 버튼·고정바에 반영                                           |
| **오픈채팅 주소**      | `contact.chatUrl`      | **현재 임시값(`REPLACE_ME`) — 반드시 교체**                            |
| 이메일                 | `contact.email`        |                                                                        |
| **운영 주소(도메인)**  | `meta.url`             | **현재 임시값 — 배포 주소 확정 후 교체.** QR 코드·링크 미리보기에 쓰임 |
| 맨 위 안내 띠          | `notice`               | `null` 로 두면 띠가 사라짐                                             |
| 첫 화면 문구           | `hero`                 |                                                                        |
| 바로가기 6칸 순서·이름 | `shortcuts.items`      | 줄 순서를 바꾸면 칸 순서가 바뀜                                        |
| 상담 약속 3줄          | `promises.items`       | 줄을 추가·삭제 가능                                                    |
| 고민 카드              | `concerns`             |                                                                        |
| 3단계 점검             | `steps.items`          | `steps.layout` 을 `"list"` 로 바꾸면 세로 3장                          |
| 경력                   | `careers`              | 줄 추가만으로 노출. 연도는 `period` (확인 전까지 `null`)               |
| 자주 묻는 질문         | `faq.items`            | 답(`a`)을 `null` 로 두면 그 질문은 숨겨짐                              |
| 광고 심의번호          | `footer.reviewNo`      | 값을 넣으면 하단에 표시, `null` 이면 숨김                              |
| 검색 노출              | `meta.noindex`         | 심의 확인 전 `true`(검색 차단). 카톡 공유 미리보기에는 영향 없음       |

### 사진 교체

1. 정면 상반신 사진을 정사각형(권장 400×400)으로 잘라 **WebP, 100KB 이하**로 저장합니다.
2. `public/images/profile.webp` 파일을 같은 이름으로 덮어씁니다. (현재 파일은 임시 실루엣)

### 링크 미리보기(카카오톡) 이미지 교체

`public/images/og-v1.png`(1200×630, 300KB 이하)를 바꾼 뒤, **파일 이름의 번호를 올립니다**(`og-v2.png`) —
`site.ts` 의 `meta.ogImage` 도 같이 바꿉니다. (카카오톡이 예전 이미지를 기억하는 것을 피하기 위함)
기본 이미지는 `npm run assets` 로 다시 만들 수 있습니다(문구 중심).

## 개발자용

```bash
npm install          # Node 22.18 이상 필요 (scripts 가 .ts 설정 파일을 직접 읽습니다)
npm run dev          # 로컬 개발 서버 (글꼴을 새로 만들려면 먼저 npm run font)
npm run build        # 문구 검사 → 글꼴 서브셋 → QR 생성 → 타입 검사 → 정적 내보내기(out/)
```

- `npm run check:copy` : `site.ts` 의 금지 표현(최고, 1위, 무조건, 100%, 반드시, 보장됩니다, 손해 없, 마감 임박, 지금 가입)·금액 숫자를 검사하고,
  컴포넌트 안에 한글 문구를 직접 쓴 곳이 없는지 확인합니다. 금지어 목록은 `scripts/check-copy.mjs` 맨 위 `BANNED_TERMS` 입니다. `--strict` 를 붙이면 경고 시 빌드를 중단합니다.
- `npm run font` : Pretendard 가변 글꼴에서 `site.ts` 에 쓰인 글자만 남겨 `public/fonts/` 에 저장합니다(약 90KB). 문구를 바꾸면 빌드 때 자동으로 새 글자가 포함됩니다.
- `npm run qr` : `meta.url` 로 PC 화면용 QR(`public/qr/site.svg`)을 만듭니다. 빌드 때마다 자동 실행됩니다.
- `npm run assets` : 링크 미리보기 이미지·파비콘을 다시 만듭니다(`--profile` 을 붙이면 임시 프로필 사진까지).
- 클라이언트 컴포넌트: ShortcutCard·ConcernCards·StepsCarousel·FaqList·StickyContactBar·ShareTools,
  그리고 등장 효과용 Reveal·MotionProvider(감소 모션 설정 존중). 나머지는 서버 컴포넌트입니다.
- `/contact.vcf` : `site.ts` 값으로 만들어지는 연락처 저장 파일입니다(선택 기능 F15).

## 배포 안내 (이번 작업 범위 밖 — 배포 가능 상태까지만 준비)

`npm run build` 가 끝나면 `out/` 폴더가 완성된 정적 사이트입니다. 이 폴더를 정적 호스팅(Vercel, Netlify, Cloudflare Pages, GitHub Pages 등)에 올리면 됩니다.
영업 용도 약관을 확인한 뒤 호스팅을 고르고(결정 D11), 도메인이 정해지면 `meta.url` 을 바꿔 다시 빌드하세요.

배포 전 확인:

1. `contact.chatUrl`, `meta.url` 임시값 교체 (`npm run check:copy` 가 "확인 필요"로 알려 줍니다)
2. 프로필 사진 교체, 경력·표창 노출 범위 확인(D2), 삼성생명 명칭·로고·심의번호 사용 범위 확인(D5)
3. 운영 주소를 카카오톡 "나에게 보내기"로 보내 링크 미리보기 확인(카카오 공유 디버거 오류 0건)
4. 실기기(iPhone·Android·카카오톡 인앱)에서 전화·오픈채팅·이메일 링크 동작 확인
