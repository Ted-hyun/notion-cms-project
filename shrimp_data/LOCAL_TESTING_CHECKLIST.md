# 로컬 테스트 체크리스트

배포 전에 다음을 확인하세요:

## 1️⃣ **Notion API 키 설정**

```bash
# .env.local 파일이 프로젝트 루트에 있는지 확인
ls -la .env.local

# 파일 내용 확인 (키는 마스킹됨)
cat .env.local
```

**필수 항목:**
- ✅ NOTION_TOKEN 설정
- ✅ NOTION_DATABASE_ID 설정

---

## 2️⃣ **개발 서버 실행**

```bash
npm run dev
```

**확인 사항:**
- [ ] 서버가 정상 시작됨 (http://localhost:3000)
- [ ] 콘솔 에러 없음
- [ ] "ready - started server on 0.0.0.0:3000" 메시지 표시

---

## 3️⃣ **홈페이지 테스트**

**URL:** http://localhost:3000

**확인 사항:**
- [ ] 페이지 로드 성공
- [ ] "Notion CMS 블로그" 제목 표시
- [ ] Notion에서 글 목록 조회됨
- [ ] 글 카드 정상 렌더링
- [ ] 카테고리 배지 표시
- [ ] 발행일 표시
- [ ] 태그 표시

**문제 발생 시:**
- 콘솔 에러 메시지 확인
- Network 탭에서 API 호출 확인
- Notion API 키 정확성 재확인

---

## 4️⃣ **글 상세 페이지 테스트**

**URL:** http://localhost:3000/posts/[post-id]

**확인 사항:**
- [ ] 페이지 로드 성공
- [ ] 글 제목 표시
- [ ] 메타 정보 표시 (작성일, 읽기시간, 카테고리, 태그)
- [ ] Notion 콘텐츠 렌더링
  - [ ] 단락 텍스트
  - [ ] 제목 (h1, h2, h3)
  - [ ] 리스트 (bullet, numbered)
  - [ ] 코드 블록
  - [ ] 인용문
  - [ ] 이미지 (if any)
- [ ] 네비게이션 정상

---

## 5️⃣ **카테고리 필터링 테스트**

**URL:** http://localhost:3000/category/react

**확인 사항:**
- [ ] 카테고리 페이지 로드
- [ ] 해당 카테고리 글만 표시
- [ ] 글 개수 표시
- [ ] 필터 버튼 활성화

---

## 6️⃣ **검색 기능 테스트**

**URL:** http://localhost:3000/search

**테스트 단계:**
1. 검색어 입력 (예: "React")
2. 엔터 또는 검색 버튼 클릭

**확인 사항:**
- [ ] URL에 쿼리 파라미터 추가됨 (?q=React)
- [ ] 검색 결과 표시
- [ ] 일치하는 글 필터링됨
- [ ] 검색어 없을 시 안내 메시지 표시

---

## 7️⃣ **타입 검증**

```bash
npm run type-check
```

**확인 사항:**
- [ ] "type-check" 성공 메시지
- [ ] 에러 없음
- [ ] 경고 없음

---

## 8️⃣ **빌드 검증**

```bash
npm run build
```

**확인 사항:**
- [ ] 빌드 성공
- [ ] ".next" 폴더 생성됨
- [ ] 에러 없음
- [ ] 경고 없음 (또는 무시 가능한 경고만)

**빌드 출력 예시:**
```
> notion-cms-blog@0.1.0 build
> next build

Collecting page data .
Generating static pages (x/y)
Finalizing page optimization
✓ Exported to .next
```

---

## 9️⃣ **프로덕션 빌드 실행**

```bash
npm run build
npm run start
```

**URL:** http://localhost:3000 (프로덕션 모드)

**확인 사항:**
- [ ] 프로덕션 서버 정상 시작
- [ ] 모든 페이지 정상 작동
- [ ] 성능 개선 확인 (로드 속도)
- [ ] 에러 없음

---

## 🔟 **최종 검증**

### 콘솔 확인
```
개발자 도구 열기 (F12) → Console 탭
```

- [ ] 에러 없음
- [ ] 경고 없음 (또는 무시 가능한 것만)

### 네트워크 확인
```
개발자 도구 → Network 탭 → 새로고침
```

- [ ] 모든 요청 성공 (200 상태 코드)
- [ ] 이미지 로드 성공
- [ ] API 호출 성공

### 성능 확인
```
개발자 도구 → Lighthouse 탭
```

- [ ] 모바일 성능 점수 (최소 85점)
- [ ] 데스크톱 성능 점수 (최소 90점)

---

## ✅ 배포 준비 완료 신호

모든 항목이 확인되면:
```
✅ 로컬 테스트 완료
✅ 배포 준비 완료
→ Vercel 배포 진행 가능
```

---

## 🚨 문제 발생 시

### Notion API 에러
```
에러 메시지: "NOTION_TOKEN이 설정되지 않았습니다"
→ .env.local 파일 확인
→ NOTION_TOKEN 값 확인
```

### 글이 로드되지 않음
```
→ Notion Database ID 확인
→ Integration 권한 확인 (Database에서 연결 확인)
→ 데이터베이스 필드 확인 (Title, Status, Published 등)
```

### 이미지가 로드되지 않음
```
→ Notion 이미지 URL 형식 확인
→ next.config.ts의 remotePatterns 확인
```

### 빌드 실패
```
→ node_modules 삭제 후 npm install 재실행
→ 타입 에러 확인 (npm run type-check)
→ ESLint 에러 확인 (npm run lint)
```

---

**테스트 완료 후 Vercel 배포 진행하세요!**
