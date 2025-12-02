## 프로젝트 스펙 시트 (spec.md)

작성일: 2025-11-16

간단 설명
- 프로젝트 이름: Traditional Market Delivery MVP (온장 — B.U.D)
- 목적: 전통시장 소상공인 상품을 모바일 웹에서 쉽게 주문할 수 있는 MVP(데모/페이크도어)
- 스택: React (18.x), Vite, TypeScript, Tailwind 스타일(빌드된 CSS 포함), Motion(애니메이션), shadcn/ui 스타일 패턴

루트 파일
- `index.html` — React 루트 + `src/main.tsx` 로드
- `package.json` — 의존성 및 dev 스크립트
- `vite.config.ts` — Vite 설정, alias로 figma asset 매핑

주요 스크립트
- npm i — 의존성 설치
- npm run dev — 개발 서버(Vite)
- npm run build — 빌드

프로젝트 구조 (핵심)
- `src/main.tsx` — 앱 진입점, `App` 렌더링
- `src/App.tsx` — 전체 페이지 전환 관리(내장 히스토리 스택), cart/주문 상태 관리, 전역 내비게이션 함수
- `src/index.css`, `src/styles/globals.css` — Tailwind 기반 스타일(프로젝트에 빌드된 유틸리티 포함)
- `src/data/menuData.ts` — 샘플 메뉴, 추천 세트, 시장 목록(현대시장, 성남중앙공설시장)
- `src/types/menu.ts` — 타입 정의: MenuItem, RecommendedSet, MenuOption, CartItem

페이지 (components/pages)
- `MainPage.tsx` — 랜딩 / 주문 시작 / 로그인(게스트/구글) 트리거
- `MarketSelectPage.tsx` — 시장 선택
- `MenuSelectPage.tsx` — 메뉴 목록 및 추천 세트, 탭(전체/시장별), 상점별 그룹화, 정렬 로직
- `MenuDetailPage.tsx` — 개별 메뉴/세트 상세, 옵션, 수량, 장바구니 추가
- `OrderPage.tsx` — 주문서(이름/연락처/주소), 결제 방식(선불/대면 계좌이체), 주문 완료 플로우
- `OrderHistoryPage.tsx` — 이전 주문 목록 및 상세
- `AboutBudPage.tsx` — 팀/소개 페이지
- `SupportPage.tsx` — 고객지원 / 연락처

주요 컴포넌트 (src/components)
- `GlassCard.tsx` — 재사용 가능한 카드 컨테이너 (유리 모양 스타일)
- `NeumorphicButton.tsx` — 버튼(뉴모피즘 스타일), variant: default | glass
- `GoogleLoginModal.tsx` — 구글 로그인 모달
- `OrderHistoryButton.tsx` — 작은 아이콘 버튼
- `figma/ImageWithFallback.tsx` — 이미지 로드 실패 시 대체 표시

UI 라이브러리/유틸
- `src/components/ui/*` — shadcn/ui에서 가져온 컴포넌트 패턴(버튼, 카드, input, utils 등). 프로젝트는 일부 커스텀 컴포넌트와 함께 이들 유틸을 사용함.
- `src/components/ui/utils.ts` — `cn()` (clsx + tailwind-merge) 유틸

데이터 모델 (types)
- MenuOption { label: string; delta: number }
- MenuItem { id, name, price, vendor, market, description?, options?, isRecommended?, rank 관련 필드 }
- RecommendedSet { id, name, price, description, items[], emoji }
- CartItem { menuItem: MenuItem; quantity: number; selectedOption?: string; finalPrice: number }

핵심 로직 요약
- 네비게이션: `App.tsx` 내 history 스택으로 페이지 전환 관리. navigate(goTo, data?) 형태로 시장/아이템 context 전달.
- 장바구니: 로컬 상태(cart)로 관리, `addToCart`, `clearCart`, `completeOrder` 함수가 `App.tsx`에 있음.
- 가격 계산: 옵션 delta 적용 → finalPrice 계산, cartTotal은 finalPrice * quantity 합.
- 주문 제한: 최소 주문금액 13,000원, 배달비 고정 3,000원
- 주문 히스토리: `orders` 상태에 저장(임시, 로컬 메모리)

데이터(샘플)
- `src/data/menuData.ts` 에 다양한 메뉴와 `recommendedSets` 샘플이 포함되어 있음. 이미지 자산은 `vite.config.ts` alias로 figma asset 경로에 바인딩되어 있음.

빌드/설치 의존성(중요 항목)
- react, react-dom
- @vitejs/plugin-react-swc, vite
- motion (애니메이션), lucide-react (아이콘)
- shadcn/ui 관련 Radix 패키지들(@radix-ui/*)
- class-variance-authority, tailwind-merge, clsx
- note: package.json에 일부 패키지 버전 표기가 `*` 또는 커스텀 문자열이 섞여 있음(예: `clsx: "*"`, `motion: "*"`) — 안정화 권장

Vite 설정 주요 포인트 (`vite.config.ts`)
- React SWC 플러그인 사용
- alias에 figma asset 파일들을 절대 경로로 매핑(디자이너 에셋을 로컬 src/assets로 매핑)
- 빌드 대상: esnext, 출력 디렉터리: `dist` (참고: Vercel 배포용으로 변경됨)
- dev server 포트: 3000, open: true

자산
- `src/assets/` — figma에서 추출한 PNG 이미지 다수. 파일명은 해시형.

접근성 / 국제화
- 날짜 포맷: `toLocaleString('ko-KR', ...)` 사용 — 한국어 로케일 하드코딩

확장 포인트 / TODO (권장)
1. 인증/세션: 현재 구글 로그인은 UI 트리거(모달)만 있고 실제 OAuth 연동 없음 — 백엔드 또는 Firebase/Google OAuth 연동 필요
2. 주문 보존: 현재 `orders`는 메모리 상태로만 보존됨(새로고침 시 손실). 로컬Storage 또는 서버 영구 저장 필요
3. 결제/보안: 현재는 단순 계좌정보 표시. 실제 결제 흐름 통합 필요
4. 타입 정비: 일부 rank 필드 이름 혼재(rankHyundai vs rankHyundai?), 타입 주석 정리 권장
5. 의존성 정리: package.json의 `*` 버전/오타 정리 및 lockfile 생성

테스트 / 검증
- 빠른 로컬 확인: npm i && npm run dev, 브라우저에서 http://localhost:3000 접속
- 기본 동작 확인 체크리스트:
  - 메인에서 시장 선택 → 메뉴 목록 → 메뉴 상세 → 장바구니 담기 → 주문 플로우
  - 최소주문(13,000원) 이하이면 주문 버튼 disabled
  - 주문 완료 시 주문 히스토리가 보이고, 주문 요약에 결제 방식/입금 계좌가 표시됨

파일 맵(요약)
- 루트: `index.html`, `package.json`, `vite.config.ts`, `README.md`
- src/
  - `main.tsx`, `App.tsx`, `index.css`, `styles/globals.css`, `Attributions.md`, `guidelines/Guidelines.md`
  - `data/menuData.ts` — 샘플 데이터
  - `types/menu.ts` — 타입
  - `assets/` — 이미지 자산
  - `components/` — 재사용 컴포넌트
    - `GlassCard.tsx`, `NeumorphicButton.tsx`, `GoogleLoginModal.tsx`, `OrderHistoryButton.tsx`
    - `figma/ImageWithFallback.tsx`
    - `pages/*` (MainPage, MarketSelectPage, MenuSelectPage, MenuDetailPage, OrderPage, OrderHistoryPage, AboutBudPage, SupportPage)
    - `ui/*` (shadcn/ui pattern 컴포넌트 모음)

검증 노트
- package.json 스크립트: `dev` -> `vite` (확인 필요)
- 로컬 빌드/실행: 개발 서버는 Vite 기준으로 작동함. (환경: Node 최신 권장)

작업 기록(최근 변경사항 요약)
- `spec.md` 생성
- `.gitignore` 추가 — node_modules, build/, .env, 에디터 파일 등 무시
- fakedoor 기능 추가 및 구현: `src/App.tsx`, `src/components/pages/OrderPage.tsx`에서 fakedoor 모달/로직 추가
- OrderPage fakedoor 문의 버튼 링크 변경: 카카오 오픈채팅 → https://m.site.naver.com/1VD0N
- 일시적 플로팅 백버튼 컴포넌트 시도 후 되돌림: UI 일관성 보존을 위해 `OrderPage`를 포함한 여러 페이지만 최종적으로 원래 헤더 백 버튼으로 복원함
- 타입 편의성: 개발 의존성으로 `@types/react` 및 `@types/react-dom` 추가 (개발 환경 경고 저감 목적)
- Vite 빌드 출력 디렉터리 변경: `vite.config.ts` 의 `outDir`을 `build` → `dist`로 변경하여 Vercel 배포 실패("No Output Directory named 'dist' found") 문제 해결

배포( Vercel ) 관련
- 문제: Vercel 기본 설정은 빌드 결과물을 `dist` 디렉터리에서 찾습니다. 기존 `vite.config.ts`는 `build` 디렉터리를 사용하도록 되어 있어 Vercel이 "No Output Directory named 'dist' found" 오류를 냈습니다.
- 해결: 두 가지 방법 중 하나를 선택할 수 있습니다:
  1) Vite 출력 디렉터리를 `dist`로 변경 (현재 적용됨) — `vite.config.ts` 의 `build.outDir = 'dist'` 로 설정함. 이 변경으로 Vercel이 빌드 산출물을 정상적으로 찾아 배포할 수 있습니다.
  2) `vercel.json`로 Vercel에 출력 디렉터리를 명시적으로 지정 — 예: `{"builds":[{"src":"package.json","use":"@vercel/static-build","config":{"distDir":"build"}}]}`.
- 현재 저장소 적용사항: 선택(1)을 적용하여 `vite.config.ts`를 `dist` 출력으로 변경해 두었습니다.

권장 배포 체크리스트
1. 로컬에서 빌드가 성공하는지 확인:
   - npm run build
   - 빌드 후 루트에 `dist/` 폴더가 생성되는지 확인
2. Vercel에 푸시 후 배포 로그에서 빌드 단계가 성공했는지 확인
3. (선택) Vercel UI에서 Output Directory를 수동으로 `dist`로 설정하거나 `vercel.json`을 추가해 명시적으로 지정

비고: 만약 선호하시면 `vercel.json`을 레포에 추가해 두거나, `package.json`의 build 스크립트를 조정해 Vercel의 기대와 완전히 일치시키는 작업을 제가 대신 적용해 드리겠습니다.

다음 단계 제안
1. (단기) package.json 정리 및 lockfile 생성, 의존성 고정
2. (중기) 인증/주문 보존(간단한 Firebase/LocalStorage) 구현
3. (중장기) 실제 결제/배송 파이프라인 및 백엔드 API 연동

문의
- 추가로 더 상세한 API 계약서(예: 주문 POST/GET 스펙), 컴포넌트 문서(PropTable) 또는 테스트 케이스를 원하시면 알려주세요.

fakedoor 기능 추가 (요청 반영)

- 목적: 사용자가 `주문 완료하기` 버튼을 눌렀을 때 실제 주문은 접수되지 않음을 알리고, 대신 보상(쿠폰)을 제공하는 fakedoor 흐름을 제공함.
- 적용 범위: `OrderPage`에서 주문 버튼을 눌렀을 때 fakedoor 모달을 띄우고 사용자가 보상을 수락하면 장바구니를 비우고 주문 기록에 보상 항목을 남김. (클라이언트 사이드 데모/페이크도어)

구현 요약
- UI: `OrderPage`에 fakedoor 모달을 추가하여 "서비스 미출시로 주문 불가" 메시지와 "보상 받기(쿠폰 발급)" 버튼을 제공.
- 앱 레코드: `App.tsx`에 `triggerFakedoor(compensationCode?: string)` 함수를 추가하여 로컬 `orders`에 fakedoor 기록을 남기고 `cart`를 비움.
- 데이터: `orders`에 새 필드 `isFakedoor?: boolean` 및 `compensationCode?: string` 를 추가하여 보상 이벤트를 식별함.

테스트 시나리오
1. 메뉴를 장바구니에 담고 주문 페이지로 이동
2. 필수 정보(이름/연락처/주소)를 채운 뒤 "주문 완료하기" 누름
3. fakedoor 모달이 뜨는지 확인
4. "보상 받기"를 누르면 쿠폰 코드(예: BUD-XXXX)가 화면에 표시되고 장바구니가 비워짐
5. `주문 내역`에서 보상 항목(isFakedoor=true, compensationCode 포함)이 확인됨

비고
- 현재 fakedoor는 클라이언트 사이드 데모용입니다. 실제 보상 발급(쿠폰 등록/사용)은 백엔드 혹은 서드파티 서비스와 연동해야 합니다.
