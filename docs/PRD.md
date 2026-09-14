# 개인 개발 블로그 - Product Requirements Document (PRD)

## 1. 프로젝트 개요

### 1.1 프로젝트명
개인 개발 블로그

### 1.2 목적
Notion을 CMS로 활용하여 개인 기술 블로그를 구축합니다. Notion에서 작성한 글이 자동으로 웹 블로그에 반영되는 시스템을 제공합니다.

### 1.3 CMS 선택 이유
- **편의성**: 이미 익숙한 Notion 인터페이스에서 글을 작성할 수 있습니다.
- **자동 동기화**: 별도의 관리 시스템 없이 Notion API를 통해 자동으로 데이터를 가져옵니다.
- **비용 효율성**: 별도의 CMS 비용이 들지 않습니다.
- **유연성**: Notion의 강력한 데이터베이스 기능을 활용할 수 있습니다.

---

## 2. 주요 기능

### 2.1 핵심 기능
1. **Notion 데이터베이스 연동**
   - Notion API를 통한 실시간 글 목록 조회
   - 페이지별 상세 콘텐츠 렌더링

2. **글 목록 조회**
   - Notion 데이터베이스에서 모든 발행된 글 목록 가져오기
   - 최신순 정렬

3. **글 상세 페이지**
   - 개별 글의 전체 내용 표시
   - 작성일, 카테고리, 태그 정보 표시

4. **카테고리별 필터링**
   - Select 속성을 이용한 카테고리 필터링
   - 선택된 카테고리의 글만 표시

5. **검색 기능**
   - 제목으로 글 검색
   - 실시간 검색 결과 제공

6. **반응형 디자인**
   - 모바일, 태블릿, 데스크톱 환경 지원
   - 모든 기기에서 일관된 사용 경험 제공

---

## 3. 기술 스택

### 3.1 프론트엔드
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod

### 3.2 백엔드/API
- **CMS**: Notion API (@notionhq/client)
- **Runtime**: Node.js

### 3.3 배포
- **Platform**: Vercel
- **Version Control**: GitHub

---

## 4. Notion 데이터베이스 구조

### 4.1 데이터베이스 스키마

| 필드명 | 필드 타입 | 설명 | 필수 여부 |
|--------|----------|------|----------|
| Title | Title | 블로그 글의 제목 | 필수 |
| Category | Select | 글의 카테고리 (예: React, Next.js, TypeScript 등) | 필수 |
| Tags | Multi Select | 글과 관련된 태그들 | 선택 |
| Published | Date | 글 발행일 | 필수 |
| Status | Select | 글의 상태 (초안/발행됨) | 필수 |
| Content | Page Content | 블로그 글의 본문 내용 | 필수 |

### 4.2 데이터 예시

```
Title: Next.js 15의 새로운 기능 알아보기
Category: Next.js
Tags: Frontend, Web Development, Framework
Published: 2026-09-14
Status: 발행됨
Content: [상세 내용...]
```

---

## 5. 화면 구성 (UI Layout)

### 5.1 홈 페이지 (/)
- **상단**: 사이트 헤더 (로고, 네비게이션)
- **메인**: 최근 글 목록 (카드 형태)
  - 글 제목
  - 카테고리 배지
  - 발행일
  - 미리보기 텍스트
- **사이드바** (데스크톱): 카테고리 필터, 검색 박스
- **하단**: 푸터

### 5.2 글 상세 페이지 (/posts/[id])
- **상단**: 헤더
- **메인 콘텐츠**:
  - 글 제목
  - 메타 정보 (발행일, 카테고리, 태그)
  - 글 본문
  - 목차 (TOC)
- **하단**: 관련 글 추천, 푸터

### 5.3 카테고리 페이지 (/category/[name])
- 선택된 카테고리의 모든 글 목록
- 필터링된 글 카드 표시
- 글 개수 표시

### 5.4 검색 결과 페이지 (/search?q=keyword)
- 검색 결과 목록
- 검색 조건 표시
- 검색 결과 없음 상태 처리

---

## 6. MVP (Minimum Viable Product) 범위

### 6.1 포함 기능
- [x] Notion API 연동
- [x] 글 목록 페이지 구현
- [x] 글 상세 페이지 구현
- [x] 카테고리별 필터링
- [x] 기본 스타일링 (Tailwind CSS)
- [x] 반응형 디자인

### 6.2 향후 추가 예정 기능
- [ ] 검색 기능 고도화 (전문 검색)
- [ ] 댓글 기능 (Giscus, Disqus)
- [ ] 소셜 공유 기능
- [ ] 다크 모드 지원
- [ ] RSS 피드
- [ ] 방문 통계 (Google Analytics)
- [ ] 관련 글 추천 시스템
- [ ] 태그 클라우드

---

## 7. 구현 단계

### 7.1 Phase 1: 프로젝트 초기화 및 환경 설정
- Next.js 15 프로젝트 생성
- TypeScript 설정
- Tailwind CSS 설정
- shadcn/ui 설정
- Notion API 패키지 설치 (@notionhq/client)
- 환경 변수 설정 (.env.local)

### 7.2 Phase 2: Notion 데이터베이스 설정
- Notion 워크스페이스에서 데이터베이스 생성
- 필드 구조 설정 (Title, Category, Tags, Published, Status, Content)
- Notion API 키 생성
- 데이터베이스 ID 확인

### 7.3 Phase 3: Notion API 클라이언트 구현
- Notion API 클라이언트 초기화
- 데이터베이스에서 페이지 목록 조회 함수
- 개별 페이지 상세 정보 조회 함수
- 에러 핸들링 구현

### 7.4 Phase 4: 글 목록 페이지 구현
- 홈페이지 (/) 레이아웃 설계
- Notion에서 글 목록 데이터 가져오기
- 글 카드 컴포넌트 개발
- 최신순 정렬 구현

### 7.5 Phase 5: 글 상세 페이지 구현
- 동적 라우트 ([id].tsx) 설정
- Notion 페이지 콘텐츠 렌더링
- 마크다운/블록 스타일링
- 메타 정보 표시

### 7.6 Phase 6: 필터링 및 검색 기능
- 카테고리 필터링 로직
- 검색 기능 구현
- 필터 UI 컴포넌트

### 7.7 Phase 7: 스타일링 및 최적화
- 전체 디자인 일관성 검토
- 반응형 디자인 확인
- 성능 최적화 (이미지 최적화, Code Splitting)
- SEO 최적화 (메타데이터, Sitemap)

### 7.8 Phase 8: 배포
- Vercel 배포 설정
- 환경 변수 설정
- GitHub 리포지토리 생성
- 배포 테스트

---

## 8. 기술 상세

### 8.1 Notion API 사용 예시
```typescript
// 글 목록 조회
const response = await notion.databases.query({
  database_id: process.env.NOTION_DATABASE_ID,
  filter: {
    property: "Status",
    select: {
      equals: "발행됨"
    }
  },
  sorts: [
    {
      property: "Published",
      direction: "descending"
    }
  ]
});

// 페이지 상세 조회
const page = await notion.pages.retrieve({
  page_id: pageId
});

// 페이지 블록 조회
const blocks = await notion.blocks.children.list({
  block_id: pageId
});
```

### 8.2 폴더 구조
```
notion-cms-project/
├── docs/
│   └── PRD.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── posts/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── category/
│   │   │   └── [name]/
│   │   │       └── page.tsx
│   │   └── search/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PostCard.tsx
│   │   ├── PostContent.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── notion.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   └── styles/
│       └── globals.css
├── public/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 9. 성공 기준

- [ ] Notion 데이터베이스에서 글을 성공적으로 가져옵니다.
- [ ] 홈페이지에서 최근 글 목록이 표시됩니다.
- [ ] 글 상세 페이지에서 전체 내용이 렌더링됩니다.
- [ ] 카테고리 필터링이 정상 작동합니다.
- [ ] 모바일, 태블릿, 데스크톱에서 반응형 디자인이 적용됩니다.
- [ ] Vercel에서 배포되어 공개 접근이 가능합니다.

---

## 10. 일정

| Phase | 예상 기간 | 상태 |
|-------|---------|------|
| Phase 1-2 | 1-2일 | 예정 |
| Phase 3-5 | 3-4일 | 예정 |
| Phase 6-7 | 2-3일 | 예정 |
| Phase 8 | 1일 | 예정 |
| **총 예상 기간** | **약 2주** | **예정** |

---

## 11. 리스크 및 고려사항

### 11.1 Notion API 제한사항
- API 속도 제한 (Rate Limiting)
- 월 요청 수 제한
- 대용량 콘텐츠 처리 시간

### 11.2 대응 방안
- 서버 사이드 캐싱 구현 (ISR)
- API 요청 최적화
- 에러 핸들링 및 재시도 로직

### 11.3 보안 고려사항
- Notion API 키를 .env.local에 안전하게 저장
- 환경 변수가 클라이언트에 노출되지 않도록 주의
- 민감한 정보는 서버 사이드에서만 처리

---

**작성일**: 2026-09-14  
**버전**: 1.0  
**상태**: 초안
