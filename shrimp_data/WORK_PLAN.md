# Notion CMS 블로그 - Shrimp 개발 작업 계획

## 개발 순서 및 의존성

```
작업 1: ✅ 프로젝트 초기 설정 (Phase 1 완료)
   ↓
작업 2: 공통 API 함수 (Phase 2)
   ↓
작업 3: 공통 컴포넌트 (Phase 2)
   ↓
작업 4: 블로그 목록 페이지 (Phase 3)
   ↓
작업 5: 블로그 상세 페이지 (Phase 3)
   ↓
Phase 4: 카테고리/검색 기능
   ↓
Phase 5: 최적화 및 배포
```

## 작업 상세 정보

### ✅ 작업 1: 프로젝트 초기 설정 (완료)
- Next.js 15, React 19, TypeScript strict mode 설정
- Tailwind CSS, shadcn/ui, ESLint 구성
- 환경 변수 타입 안전 모듈
- Git 초기 커밋 완료

### 작업 2: 공통 API 함수 (Phase 2 - Part 1)

**구현 파일:**
- `src/lib/types.ts` - Notion API 타입 정의
- `src/lib/notion.ts` - Notion API 클라이언트 함수

**핵심 함수:**
```typescript
export function getNotionClient(): Client
export async function fetchPublishedPosts(): Promise<Post[]>
export async function fetchPostById(pageId: string): Promise<Post | null>
export async function fetchPageBlocks(blockId: string): Promise<PageBlock[]>
async function withRetry<T>(fn: () => Promise<T>, retries?: number): Promise<T>
```

**타입 정의:**
```typescript
type PostStatus = "초안" | "발행됨"
interface Post { id, title, category, tags, publishedAt, status, excerpt?, coverImageUrl? }
interface AppError { code, message }
type ApiResult<T> = { success: true; data: T } | { success: false; error: AppError }
```

**요구사항:**
- @notionhq/client 타입 직접 재사용 (any 없음)
- 타입 가드로 Partial 응답 처리
- 429/5xx 지수 백오프 재시도
- ISR은 각 라우트의 revalidate로 처리

### 작업 3: 공통 컴포넌트 (Phase 2 - Part 2)

**구현 파일:**
- `src/lib/utils.ts` - 유틸리티 함수
- `src/lib/store/useUiStore.ts` - Zustand 상태 관리
- `src/components/Header.tsx` - 헤더 컴포넌트
- `src/components/Footer.tsx` - 푸터 컴포넌트
- `src/components/PostCard.tsx` - 글 카드 컴포넌트
- `src/components/CategoryBadge.tsx` - 카테고리 배지
- `src/components/TagBadge.tsx` - 태그 배지

**핵심 함수:**
```typescript
export function formatDate(iso: string, locale?: string): string
export function truncateText(text: string, maxLength: number): string
export function encodeCategoryParam(category: string): string
export function decodeCategoryParam(param: string): string
export function getCategoryColor(category: string): { bg: string; text: string }
export function estimateReadingTime(blocks: PageBlock[]): number
```

**Zustand Store:**
```typescript
interface UiState {
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
}
export const useUiStore = create<UiState>(...)
```

### 작업 4: 블로그 목록 페이지 (Phase 3 - Part 1)

**구현 파일:**
- `src/app/page.tsx` - 홈페이지

**핵심:**
```typescript
export const revalidate = 3600
export default async function HomePage()
```

**기능:**
- `fetchPublishedPosts()` 호출
- 발행일 기준 정렬 (Notion 쿼리)
- `PostCard` 컴포넌트 렌더링
- ISR 적용

### 작업 5: 블로그 상세 페이지 (Phase 3 - Part 2)

**구현 파일:**
- `src/app/posts/[id]/page.tsx` - 상세 페이지
- `src/components/NotionBlock.tsx` - 블록 렌더링
- `src/components/PostContent.tsx` - 콘텐츠 렌더링
- `src/components/PostMeta.tsx` - 메타 정보

**핵심 함수:**
```typescript
export async function generateStaticParams(): Promise<{ id: string }[]>
export async function generateMetadata({ params }): Promise<Metadata>
export default async function PostDetailPage({ params })

// NotionBlock: exhaustive switch로 모든 블록 타입 처리
// 코드 블록은 문법 강조 라이브러리 동적 import
```

### Phase 4: 카테고리/검색 기능

**구현 파일:**
- `src/app/category/[name]/page.tsx`
- `src/app/search/page.tsx`
- `src/components/CategoryFilter.tsx`
- `src/components/SearchBar.tsx`
- `src/components/SearchResult.tsx`

### Phase 5: 최적화 및 배포

**구현:**
- 이미지 최적화 (next/image)
- 동적 import로 코드 분할
- SEO: sitemap.ts, robots.ts, JSON-LD
- Vercel 배포
- Lighthouse 85점 이상 검증

## 완료 체크리스트

- [ ] 작업 2 완료: 타입 정의, Notion API 함수
- [ ] 작업 3 완료: 유틸, Zustand, 공통 컴포넌트
- [ ] 작업 4 완료: 홈페이지, PostCard 렌더링
- [ ] 작업 5 완료: 상세 페이지, Notion 블록 렌더링
- [ ] Phase 4 완료: 카테고리, 검색
- [ ] Phase 5 완료: 최적화, 배포
- [ ] Git 커밋: "Shrimp 작업 계획 추가: 올바른 개발 순서"
- [ ] GitHub 푸시

## 핵심 원칙

1. **Notion API 타입 안전성**: any 타입 절대 금지
2. **Phase 순서 준수**: 각 Phase는 이전 Phase의 산출물을 직접 사용
3. **Tailwind CSS**: 모든 컴포넌트 반응형 필수
4. **TypeScript strict mode**: 타입 검증 엄격히
5. **ESLint zero warnings**: 코드 품질 유지

## 참고 자료

- CLAUDE.md - 프로젝트 개발 규칙
- docs/ROADMAP.md - 전체 개발 로드맵
- docs/PRD.md - 제품 요구사항
- 계획 파일: C:\Users\DBInc\.claude\plans\indexed-squishing-journal.md
