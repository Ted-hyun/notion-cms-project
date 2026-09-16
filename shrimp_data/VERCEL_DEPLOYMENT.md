# Vercel 배포 가이드

## 📋 배포 전 체크리스트

### 1. 로컬 환경 검증 ✅
- [ ] `.env.local` 파일 생성 및 Notion API 키 설정
- [ ] `npm run dev` 실행하여 로컬 서버 정상 작동 확인
- [ ] `http://localhost:3000` 접속하여 홈페이지 렌더링 확인
- [ ] 포스트 조회 확인 (Notion에서 데이터 조회됨)
- [ ] `npm run build` 빌드 성공 확인
- [ ] `npm run type-check` 타입 검증 통과 확인

### 2. GitHub 저장소 확인 ✅
- [ ] `git push origin main` 완료
- [ ] GitHub 저장소 접근 가능 (https://github.com/Ted-hyun/notion-cms-project)
- [ ] main 브랜치가 최신 코드 반영

### 3. Vercel 계정 설정
- [ ] Vercel 계정 생성 (https://vercel.com)
- [ ] GitHub 계정과 연동

---

## 🚀 배포 단계

### Step 1: Vercel에서 프로젝트 import

1. **Vercel 대시보드** 접속: https://vercel.com/dashboard
2. **"Add New..."** → **"Project"** 클릭
3. **"Import Git Repository"** 클릭
4. GitHub 계정 연동 (처음이면 "Connect GitHub" 클릭)
5. **`Ted-hyun/notion-cms-project`** 저장소 선택
6. **"Import"** 클릭

### Step 2: 프로젝트 설정

**Project Name**
```
notion-cms-project
```

**Framework Preset**
```
Next.js (자동 감지됨)
```

**Build and Output Settings**
```
기본값 유지 (Vercel이 자동 감지)
```

**Environment Variables** (중요!)
다음 변수 추가:
```
NOTION_TOKEN = [복사한 Internal Integration Token]
NOTION_DATABASE_ID = [복사한 Database ID]
```

### Step 3: 배포

**"Deploy"** 클릭하면 자동으로:
1. GitHub에서 코드 풀링
2. Next.js 빌드 실행
3. Vercel에 배포
4. 프로덕션 URL 생성

---

## ✅ 배포 후 확인 사항

### 1. 배포 상태 확인
- [ ] Vercel 대시보드에서 배포 상태 "Ready" 확인
- [ ] 제공된 프로덕션 URL 확인 (예: `https://notion-cms-project.vercel.app`)

### 2. 프로덕션 환경 검증

**홈페이지 접속**
```
https://[your-project].vercel.app
```

- [ ] 페이지 렌더링 정상
- [ ] Notion에서 글 조회됨
- [ ] 글 카드 표시됨

**상세 페이지 확인**
```
https://[your-project].vercel.app/posts/[post-id]
```

- [ ] 제목 표시
- [ ] Notion 콘텐츠 렌더링 (블록, 이미지 등)
- [ ] 메타 정보 표시 (작성일, 읽기시간, 태그)

**카테고리 필터링**
```
https://[your-project].vercel.app/category/[category-name]
```

- [ ] 카테고리별 글 필터링 정상

**검색 기능**
```
https://[your-project].vercel.app/search?q=keyword
```

- [ ] 검색 입력창 표시
- [ ] 검색 결과 표시

### 3. SEO 검증

**Sitemap 확인**
```
https://[your-project].vercel.app/sitemap.xml
```

- [ ] Sitemap 정상 생성
- [ ] 모든 페이지 포함

**Robots.txt 확인**
```
https://[your-project].vercel.app/robots.txt
```

- [ ] 로봇 설정 정상

**메타데이터 확인**
- [ ] 페이지 소스에서 `<meta>` 태그 확인
- [ ] Open Graph 메타데이터 존재
- [ ] Twitter Card 메타데이터 존재

### 4. 성능 검증

**Core Web Vitals**
- Vercel Analytics 확인
- Lighthouse 점수 확인 (85점 이상 목표)

**이미지 최적화**
- [ ] Notion 이미지 정상 로드
- [ ] 이미지 포맷 최적화 (Next.js Image)

### 5. 에러 모니터링

**Vercel 에러 로그 확인**
- Vercel 대시보드 → "Functions" 또는 "Logs"
- 에러 없음 확인

**Browser Console 확인**
- 개발자 도구 열기 (F12)
- 콘솔 에러 없음 확인

---

## 🔧 문제 해결

### 배포 실패
**로그 확인:**
- Vercel 대시보드 → "Deployments" → 실패한 배포 클릭
- 빌드 로그에서 에러 메시지 확인

**일반적인 원인:**
- Environment 변수 누락
- Notion API 키 오류
- 의존성 설치 실패

### 프로덕션에서 글이 로드되지 않음
**확인 사항:**
1. `.env` 변수 정확히 설정
2. Notion Integration 권한 확인
3. Notion Database ID 정확한지 확인
4. Vercel 함수 로그에서 에러 확인

### 이미지가 로드되지 않음
**확인 사항:**
1. `next.config.ts`의 `remotePatterns` 설정 확인
2. Notion 이미지 URL 도메인 확인
3. Vercel 함수 로그에서 이미지 로딩 에러 확인

---

## 📊 배포 완료 체크리스트

- [ ] Vercel 프로젝트 생성 완료
- [ ] Environment 변수 설정 완료
- [ ] 배포 성공 ("Ready" 상태)
- [ ] 프로덕션 URL에서 모든 페이지 정상 작동
- [ ] 홈페이지에서 Notion 글 조회 확인
- [ ] 상세 페이지에서 콘텐츠 렌더링 확인
- [ ] 검색/필터링 기능 정상 작동
- [ ] SEO 설정 확인 (Sitemap, Robots)
- [ ] 에러 로그 확인 (에러 없음)
- [ ] 성능 검증 완료

---

## 🎉 배포 완료!

배포가 완료되면:
1. Vercel URL을 팀에 공유
2. 프로덕션 환경에서 정기적으로 테스트
3. Notion 데이터 추가 시 자동으로 반영 (ISR)

**주요 기능:**
- ✅ ISR: 1시간마다 정적 캐시 재검증
- ✅ SEO: 자동 생성되는 Sitemap
- ✅ 성능: Next.js Image 최적화
- ✅ 확장성: Notion 글 추가만으로 자동 반영

---

**배포 날짜**: 2026-09-16
**버전**: 1.0
