# Notion CMS 블로그 프로젝트 - Claude 개발 가이드

## Project Context

이 프로젝트는 Notion을 CMS로 활용한 개인 개발 블로그입니다.

### 핵심 문서
- PRD 문서: @docs/PRD.md
- 개발 로드맵: @docs/ROADMAP.md

### 프로젝트 개요
- **목표**: Notion 데이터베이스에서 자동으로 블로그 글을 가져와 웹 페이지로 렌더링
- **기술 스택**: Next.js 15, React 19, TypeScript, Tailwind CSS, Notion API
- **배포**: Vercel

---

## 개발 환경 및 규칙

이 프로젝트는 전역 CLAUDE.md의 규칙을 따릅니다:

### 기본 규칙
- **응답 언어**: 한국어
- **코드 주석**: 한국어
- **커밋 메시지**: 한국어
- **문서화**: 한국어
- **변수명/함수명**: 영어 (코드 표준)

### 코딩 스타일
- **들여쓰기**: 2칸
- **네이밍**: camelCase, PascalCase (컴포넌트)
- **타입**: any 타입 사용 금지

### 기술 스택
- **프레임워크**: Next.js 15, React 19
- **스타일링**: Tailwind CSS
- **UI 라이브러리**: shadcn/ui
- **상태 관리**: Zustand
- **폼**: React Hook Form + Zod
- **CMS API**: Notion API (@notionhq/client)

---

## 폴더 구조

```
notion-cms-project/
├── docs/
│   ├── PRD.md              # 제품 요구사항 정의서
│   └── ROADMAP.md          # 개발 로드맵
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx        # 홈페이지
│   │   ├── posts/[id]/     # 글 상세 페이지
│   │   ├── category/[name]/ # 카테고리 필터링
│   │   └── search/         # 검색 결과
│   ├── components/         # React 컴포넌트
│   ├── lib/                # 유틸리티 및 API
│   │   ├── notion.ts       # Notion API 클라이언트
│   │   ├── types.ts        # TypeScript 타입 정의
│   │   └── utils.ts        # 유틸리티 함수
│   └── styles/
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── CLAUDE.md               # 이 파일
```

---

## 개발 단계 (Phase)

개발은 ROADMAP.md에 정의된 5개 Phase로 진행됩니다:

1. **Phase 1** (1-2일): 프로젝트 초기 설정
2. **Phase 2** (2-3일): 공통 모듈 개발
3. **Phase 3** (3-4일): 핵심 기능 개발
4. **Phase 4** (2-3일): 추가 기능 개발
5. **Phase 5** (1-2일): 최적화 및 배포

---

## Notion 데이터베이스 스키마

Notion 데이터베이스는 다음 필드를 포함합니다:

| 필드명 | 타입 | 설명 | 필수 |
|--------|------|------|------|
| Title | Title | 블로그 글 제목 | ✅ |
| Category | Select | 글의 카테고리 | ✅ |
| Tags | Multi Select | 글 관련 태그 | ❌ |
| Published | Date | 글 발행일 | ✅ |
| Status | Select | 상태 (초안/발행됨) | ✅ |
| Content | Page Content | 글의 본문 | ✅ |

---

## 핵심 컴포넌트 및 모듈

### API 통신 (src/lib/notion.ts)
- `fetchPages()`: 발행된 모든 글 목록 조회
- `fetchPageContent()`: 특정 글의 상세 내용 조회
- `fetchPageBlocks()`: 페이지 블록 목록 조회

### 주요 컴포넌트
- **Header**: 상단 네비게이션
- **Footer**: 하단 정보
- **PostCard**: 글 목록의 개별 카드
- **NotionBlock**: Notion 블록 렌더링
- **PostContent**: 글 본문 렌더링
- **SearchBar**: 검색 입력

---

## 환경 변수 설정

.env.local 파일에 다음을 설정해야 합니다:

```
NOTION_TOKEN=your_notion_api_key
NOTION_DATABASE_ID=your_database_id
```

---

## 성공 기준

프로젝트가 완료되면 다음을 만족해야 합니다:

- ✅ Notion에서 글을 성공적으로 가져옴
- ✅ 홈페이지에 최근 글 목록 표시
- ✅ 글 상세 페이지에 전체 콘텐츠 렌더링
- ✅ 카테고리 필터링 정상 작동
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ Vercel 배포 및 공개 접근 가능
- ✅ Lighthouse 점수 85점 이상
- ✅ SEO 최적화 완료

---

**작성일**: 2026-09-16  
**버전**: 1.0
