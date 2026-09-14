# 개인 개발 블로그 (Notion CMS)

Notion을 CMS로 활용한 개인 기술 블로그입니다. Notion 데이터베이스에 작성한 글이 자동으로 웹 블로그에 반영됩니다.

## 🎯 프로젝트 목표

- Notion API를 활용한 블로그 자동화
- 간단한 관리 인터페이스 (Notion 자체 사용)
- 반응형 웹 디자인

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **CMS**: Notion API (@notionhq/client)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 주요 기능

- ✅ Notion 데이터베이스에서 블로그 글 목록 조회
- ✅ 개별 글 상세 페이지 표시
- ✅ 카테고리별 필터링
- ✅ 검색 기능
- ✅ 반응형 디자인

## 📁 프로젝트 구조

```
notion-cms-project/
├── docs/
│   └── PRD.md              # 상세 기획서
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # React 컴포넌트
│   ├── lib/                # 유틸리티 함수
│   └── styles/             # 전역 스타일
├── public/                 # 정적 파일
├── .env.local              # 환경 변수 (Notion API 키)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🚀 시작하기

### 1. 환경 설정

```bash
# 저장소 클론
git clone <repository-url>
cd notion-cms-project

# 패키지 설치
npm install
```

### 2. Notion API 설정

1. [Notion Developer Portal](https://www.notion.so/my-integrations)에서 새로운 통합 생성
2. API 키 복사
3. `.env.local` 파일 생성:

```env
NOTION_API_KEY=your_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

### 3. Notion 데이터베이스 설정

Notion 워크스페이스에 다음과 같은 구조의 데이터베이스 생성:

| 필드명 | 타입 | 설명 |
|--------|------|------|
| Title | Title | 글 제목 |
| Category | Select | 카테고리 |
| Tags | Multi Select | 태그 |
| Published | Date | 발행일 |
| Status | Select | 상태 (초안/발행됨) |
| Content | Page Content | 글 내용 |

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 열기

## 📚 문서

- [PRD (Product Requirements Document)](./docs/PRD.md) - 상세 기획서

## 🌐 배포

Vercel에 배포하기:

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. Vercel에 배포
vercel
```

환경 변수 설정:
1. Vercel 대시보드 → 프로젝트 설정
2. Environment Variables에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 추가

## 📝 라이선스

MIT License

## 👨‍💻 작성자

개발자: 3789hh@dbinc.co.kr

---

**마지막 업데이트**: 2026-09-14
