# 개인 개발 블로그 - 개발 로드맵 (ROADMAP)

## 개요

Notion을 CMS로 활용한 개인 개발 블로그 프로젝트의 단계별 개발 계획입니다.  
**전체 예상 소요 기간: 9-14일**

---

## Phase 1: 프로젝트 초기 설정

**예상 소요 기간**: 1-2일  
**상태**: 미시작  
**목표**: 프로젝트 기반 구축 및 개발 환경 완성

### 작업 항목

#### 1.1 Next.js 프로젝트 구조 설정
- [ ] Next.js 15 프로젝트 생성
- [ ] TypeScript 초기 설정 (tsconfig.json)
- [ ] 프로젝트 폴더 구조 생성
  - src/ 디렉토리 구조 (app, components, lib, styles)
  - public/ 디렉토리
  - docs/ 디렉토리

#### 1.2 Notion API 연동 환경 구축
- [ ] @notionhq/client 패키지 설치
- [ ] 필수 패키지 설치 (tailwind, shadcn/ui 등)
- [ ] .env.local 파일 생성 및 Notion API 키 설정
- [ ] 환경 변수 타입 정의

#### 1.3 기본 레이아웃 구조 생성
- [ ] RootLayout (src/app/layout.tsx) 기본 구조
- [ ] 글로벌 스타일 설정 (globals.css)
- [ ] Tailwind CSS 설정 (tailwind.config.ts)

#### 1.4 기타 설정
- [ ] Next.js 설정 (next.config.ts)
- [ ] GitHub 리포지토리 생성 및 초기화
- [ ] .gitignore 파일 설정

### 완료 기준

- ✅ Next.js 15 기반 프로젝트가 정상 실행됨
- ✅ TypeScript 컴파일 오류 없음
- ✅ Tailwind CSS 스타일 적용 확인
- ✅ Notion API 키가 정상 설정됨
- ✅ Git 리포지토리에 초기 커밋 완료

### 산출물

- next.config.ts, tsconfig.json
- .env.local (예시 파일)
- src/app/layout.tsx
- 프로젝트 폴더 구조

---

## Phase 2: 공통 모듈 개발

**예상 소요 기간**: 2-3일  
**상태**: 미시작  
**목표**: 재사용 가능한 공통 코드 및 컴포넌트 확립

### 작업 항목

#### 2.1 Notion API 공통 함수
- [ ] src/lib/notion.ts 작성
  - [ ] Notion 클라이언트 초기화
  - [ ] fetchPages(): 모든 발행된 글 목록 조회
  - [ ] fetchPageContent(): 특정 글의 상세 내용 조회
  - [ ] fetchPageBlocks(): 페이지의 블록 목록 조회
  - [ ] 에러 핸들링 및 재시도 로직
  - [ ] 캐싱 메커니즘 구현 (ISR)

#### 2.2 공통 타입 정의
- [ ] src/lib/types.ts 작성
  - [ ] Post 인터페이스 (id, title, category, tags, publishedDate, content 등)
  - [ ] PageBlock 인터페이스
  - [ ] Category 타입
  - [ ] ApiResponse 타입
  - [ ] 에러 타입

#### 2.3 유틸리티 함수
- [ ] src/lib/utils.ts 작성
  - [ ] 날짜 포맷팅 함수
  - [ ] 텍스트 자르기 함수 (미리보기)
  - [ ] URL 인코딩/디코딩
  - [ ] 카테고리별 색상 매핑
  - [ ] 블록 타입별 렌더링 함수

#### 2.4 공통 컴포넌트
- [ ] Header 컴포넌트 (src/components/Header.tsx)
  - [ ] 로고, 네비게이션 메뉴
  - [ ] 반응형 메뉴 (모바일 토글)

- [ ] Footer 컴포넌트 (src/components/Footer.tsx)
  - [ ] 저작권 정보, 소셜 링크

- [ ] PostCard 컴포넌트 (src/components/PostCard.tsx)
  - [ ] 글 제목, 카테고리 배지, 발행일, 미리보기
  - [ ] 클릭 시 상세 페이지로 이동

- [ ] CategoryBadge 컴포넌트 (src/components/CategoryBadge.tsx)
  - [ ] 카테고리 시각화 (배지 형태)

- [ ] TagBadge 컴포넌트 (src/components/TagBadge.tsx)
  - [ ] 태그 시각화 (작은 배지 형태)

### 완료 기준

- ✅ Notion API 함수가 정상 동작하고 테스트됨
- ✅ 모든 타입이 any 없이 정의됨
- ✅ 공통 컴포넌트가 재사용 가능하고 일관된 스타일 적용
- ✅ 유틸리티 함수 테스트 완료
- ✅ 에러 핸들링이 구현됨

### 산출물

- src/lib/notion.ts
- src/lib/types.ts
- src/lib/utils.ts
- src/components/Header.tsx
- src/components/Footer.tsx
- src/components/PostCard.tsx
- src/components/CategoryBadge.tsx
- src/components/TagBadge.tsx

---

## Phase 3: 핵심 기능 개발

**예상 소요 기간**: 3-4일  
**상태**: 미시작  
**목표**: 블로그의 핵심 기능(글 목록, 글 상세 페이지) 구현

### 작업 항목

#### 3.1 블로그 글 목록 페이지
- [ ] src/app/page.tsx (홈페이지)
  - [ ] getStaticProps로 빌드 시 글 목록 조회 (ISR 적용)
  - [ ] 최신순 정렬 (발행일 기준)
  - [ ] 발행된 글만 필터링
  - [ ] PostCard 컴포넌트로 글 목록 렌더링
  - [ ] 페이지네이션 또는 무한 스크롤 (선택)

#### 3.2 블로그 글 상세 페이지
- [ ] src/app/posts/[id]/page.tsx
  - [ ] getStaticProps로 특정 글 데이터 조회
  - [ ] getStaticPaths로 모든 글의 동적 라우트 생성
  - [ ] 글 제목, 카테고리, 태그, 발행일 표시
  - [ ] Notion 콘텐츠 렌더링

#### 3.3 Notion 컨텐츠 렌더링
- [ ] NotionBlock 컴포넌트 (src/components/NotionBlock.tsx)
  - [ ] 텍스트 블록 렌더링
  - [ ] 헤딩 블록 렌더링 (h1, h2, h3 등)
  - [ ] 리스트 블록 렌더링 (순서 있음/없음)
  - [ ] 코드 블록 렌더링 (문법 강조)
  - [ ] 이미지 블록 렌더링
  - [ ] 인용 블록 렌더링
  - [ ] 링크 렌더링

- [ ] PostContent 컴포넌트 (src/components/PostContent.tsx)
  - [ ] 블록 목록을 순회하며 NotionBlock 렌더링

#### 3.4 메타 정보 표시
- [ ] PostMeta 컴포넌트 (src/components/PostMeta.tsx)
  - [ ] 작성일, 수정일, 카테고리, 태그 표시
  - [ ] 읽기 시간 추정치 표시

### 완료 기준

- ✅ 홈페이지에서 최근 글 목록이 정상 표시됨
- ✅ 글 상세 페이지에서 Notion 콘텐츠가 정상 렌더링됨
- ✅ 모든 블록 타입이 적절하게 스타일링됨
- ✅ 모바일 환경에서 반응형 레이아웃 동작
- ✅ 빌드 시간이 합리적 수준 (< 1분)

### 산출물

- src/app/page.tsx
- src/app/posts/[id]/page.tsx
- src/components/NotionBlock.tsx
- src/components/PostContent.tsx
- src/components/PostMeta.tsx

---

## Phase 4: 추가 기능 개발

**예상 소요 기간**: 2-3일  
**상태**: 미시작  
**목표**: 사용성 향상을 위한 추가 기능 구현

### 작업 항목

#### 4.1 카테고리 필터링
- [ ] src/app/category/[name]/page.tsx
  - [ ] 선택된 카테고리의 글만 필터링
  - [ ] getStaticProps로 카테고리별 글 데이터 조회
  - [ ] getStaticPaths로 모든 카테고리의 동적 라우트 생성
  - [ ] 글 개수 표시

- [ ] CategoryFilter 컴포넌트 (src/components/CategoryFilter.tsx)
  - [ ] 모든 카테고리 목록 표시
  - [ ] 선택된 카테고리 하이라이트
  - [ ] 카테고리 클릭 시 필터링

#### 4.2 검색 기능
- [ ] src/app/search/page.tsx
  - [ ] 쿼리 파라미터로 검색어 받기
  - [ ] 제목 기반 검색 로직
  - [ ] 검색 결과 표시
  - [ ] 검색 결과 없음 상태 처리

- [ ] SearchBar 컴포넌트 (src/components/SearchBar.tsx)
  - [ ] 검색 입력 필드
  - [ ] React Hook Form 통합
  - [ ] 검색 제출 시 /search로 이동

- [ ] SearchResult 컴포넌트 (src/components/SearchResult.tsx)
  - [ ] 검색 결과 표시
  - [ ] 검색 조건 하이라이트

#### 4.3 추가 UI 요소
- [ ] TableOfContents 컴포넌트 (src/components/TableOfContents.tsx)
  - [ ] 글 상세 페이지에 목차 표시 (선택)

- [ ] RelatedPosts 컴포넌트 (src/components/RelatedPosts.tsx)
  - [ ] 같은 카테고리의 다른 글 추천 (선택)

- [ ] Breadcrumb 컴포넌트 (src/components/Breadcrumb.tsx)
  - [ ] 현재 페이지의 경로 표시

### 완료 기준

- ✅ 카테고리 페이지에서 필터링이 정상 작동
- ✅ 검색 기능으로 글을 찾을 수 있음
- ✅ 검색 결과가 실시간으로 제공됨
- ✅ 모든 기능이 모바일에서 정상 동작
- ✅ 사용자 경험이 직관적임

### 산출물

- src/app/category/[name]/page.tsx
- src/app/search/page.tsx
- src/components/CategoryFilter.tsx
- src/components/SearchBar.tsx
- src/components/SearchResult.tsx
- src/components/TableOfContents.tsx
- src/components/RelatedPosts.tsx (선택)
- src/components/Breadcrumb.tsx

---

## Phase 5: 최적화 및 배포

**예상 소요 기간**: 1-2일  
**상태**: 미시작  
**목표**: 성능 최적화 및 프로덕션 배포 완료

### 작업 항목

#### 5.1 성능 최적화
- [ ] 이미지 최적화
  - [ ] Next.js Image 컴포넌트 사용
  - [ ] 이미지 lazy loading 구현
  - [ ] 반응형 이미지 크기 설정

- [ ] 번들 최적화
  - [ ] Code splitting 확인
  - [ ] 동적 임포트 (dynamic imports) 적용
  - [ ] 번들 크기 분석 및 최적화

- [ ] 캐싱 전략
  - [ ] ISR (Incremental Static Regeneration) 시간 설정
  - [ ] 브라우저 캐싱 헤더 설정
  - [ ] Notion API 응답 캐싱

#### 5.2 SEO 최적화
- [ ] 메타데이터 설정
  - [ ] 각 페이지의 title, description 설정
  - [ ] Open Graph 메타데이터 추가
  - [ ] Twitter Card 메타데이터 추가

- [ ] Sitemap 생성
  - [ ] src/app/sitemap.ts 작성
  - [ ] 동적 sitemap 생성

- [ ] robots.txt 설정

- [ ] 구조화된 데이터 (Schema.org)
  - [ ] BlogPosting 스키마 추가

#### 5.3 반응형 디자인 최적화
- [ ] 모바일 (< 768px) 레이아웃 검증
- [ ] 태블릿 (768px - 1024px) 레이아웃 검증
- [ ] 데스크톱 (> 1024px) 레이아웃 검증
- [ ] 터치 인터페이스 최적화 (버튼 크기 등)

#### 5.4 코드 품질 및 테스트
- [ ] TypeScript 타입 검증
- [ ] ESLint 설정 및 실행
- [ ] 통합 테스트 (선택)

#### 5.5 배포 설정
- [ ] GitHub 리포지토리 최종 확인
- [ ] Vercel 프로젝트 생성
- [ ] 환경 변수 Vercel에 설정
  - [ ] NOTION_TOKEN
  - [ ] NOTION_DATABASE_ID

- [ ] 배포 및 테스트
  - [ ] Vercel URL로 접근 확인
  - [ ] 모든 기능 테스트
  - [ ] 성능 메트릭 확인 (Core Web Vitals)

#### 5.6 배포 후 검증
- [ ] Google Search Console 등록
- [ ] 모바일 친화성 테스트
- [ ] 페이지 속도 테스트 (Lighthouse)
- [ ] 데스크톱/모바일 검색 결과 확인

### 완료 기준

- ✅ Google Lighthouse 점수 85점 이상
- ✅ Core Web Vitals 정상 범위
- ✅ 모바일, 태블릿, 데스크톱에서 완벽한 반응형 디자인
- ✅ Vercel에서 정상 배포되고 공개 접근 가능
- ✅ SEO 최적화 완료
- ✅ 모든 기능이 프로덕션에서 정상 동작

### 산출물

- src/app/sitemap.ts
- 최적화된 next.config.ts
- 업데이트된 package.json (성능 분석 도구)
- Vercel 배포 링크
- 성능 보고서 (선택)

---

## 종합 일정

| Phase | 작업 범위 | 예상 기간 | 시작일 | 종료일 | 상태 |
|-------|---------|---------|--------|--------|------|
| Phase 1 | 프로젝트 초기 설정 | 1-2일 | - | - | 미시작 |
| Phase 2 | 공통 모듈 개발 | 2-3일 | - | - | 미시작 |
| Phase 3 | 핵심 기능 개발 | 3-4일 | - | - | 미시작 |
| Phase 4 | 추가 기능 개발 | 2-3일 | - | - | 미시작 |
| Phase 5 | 최적화 및 배포 | 1-2일 | - | - | 미시작 |
| **전체** | **완전한 블로그 구현** | **9-14일** | - | - | **미시작** |

---

## 위험 요소 및 대응 방안

### 위험 요소

1. **Notion API 속도 제한**
   - 대응: ISR 캐싱, 요청 최적화, 에러 재시도 로직

2. **Notion 콘텐츠 다양성**
   - 대응: 모든 블록 타입 사전 테스트, 점진적 기능 추가

3. **성능 문제**
   - 대응: 이미지 최적화, 코드 분할, 캐싱 전략

4. **브라우저 호환성**
   - 대응: 최신 브라우저 지원, 폴리필 추가 (필요시)

### 의존성

- Notion 워크스페이스 및 API 키 확보
- GitHub 계정 및 리포지토리
- Vercel 계정

---

## 참고 자료

- [PRD.md](./PRD.md) - 제품 요구사항 정의서
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Notion API 공식 문서](https://developers.notion.com/)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/)

---

**작성일**: 2026-09-16  
**버전**: 1.0  
**상태**: 검토 대기
