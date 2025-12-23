"""
EngCalc Pro - GitHub Issues 템플릿 자동 생성 스크립트
모든 Phase의 이슈 템플릿을 자동으로 생성합니다.
"""

import json

# 모든 이슈 데이터
issues_data = [
    # Phase 1
    {
        "phase": "1", "task": "1.2", "title": "프로젝트 초기화",
        "background": "Vite 기반 프로젝트를 초기화하고 필요한 모든 의존성을 설치합니다.",
        "content": "- Vite 프로젝트 생성\n- 필수 의존성 설치 (mathjs, decimal.js)\n- 개발 의존성 설치 (tailwindcss, vitest, eslint, prettier)\n- Tailwind CSS 초기화",
        "acceptance": "- `npm run dev` 실행 시 개발 서버 정상 동작\n- `package.json`에 모든 의존성 추가됨",
        "time": "1시간", "priority": "P0", "labels": "phase-1,setup,P0"
    },
    {
        "phase": "1", "task": "1.3", "title": "프로젝트 구조 생성",
        "background": "프로젝트의 디렉토리 구조를 생성하여 코드 조직화를 준비합니다.",
        "content": "- src/ 하위 디렉토리 생성\n- components/ 하위 디렉토리 생성\n- tests/ 하위 디렉토리 생성\n- 기본 파일 생성",
        "acceptance": "- 모든 디렉토리가 생성됨\n- 기본 파일이 존재함",
        "time": "30분", "priority": "P0", "labels": "phase-1,setup,P0"
    },
    {
        "phase": "1", "task": "1.4", "title": "설정 파일 작성",
        "background": "Vite, Tailwind CSS, Vitest, ESLint, Prettier 등 개발 도구의 설정 파일을 작성합니다.",
        "content": "- vite.config.js 작성\n- tailwind.config.js 작성 (디자인 시스템 반영)\n- vitest.config.js 작성\n- .eslintrc.json, .prettierrc 작성",
        "acceptance": "- Vite 빌드 성공\n- Tailwind 클래스 자동완성 동작\n- ESLint/Prettier 정상 동작",
        "time": "1시간", "priority": "P0", "labels": "phase-1,setup,P0"
    },
    {
        "phase": "1", "task": "1.5", "title": "GitHub Actions 설정",
        "background": "CI/CD 파이프라인을 구축하여 자동 테스트 및 배포를 설정합니다.",
        "content": "- .github/workflows/test.yml 작성\n- .github/workflows/deploy.yml 작성\n- GitHub Pages 설정",
        "acceptance": "- PR 생성 시 자동 테스트 실행\n- main 브랜치 푸시 시 자동 배포\n- GitHub Pages에서 사이트 접근 가능",
        "time": "1시간", "priority": "P0", "labels": "phase-1,ci-cd,P0"
    },
    # Phase 2
    {
        "phase": "2", "task": "2.2", "title": "StorageService 구현 (TDD)",
        "background": "LocalStorage를 사용하여 계산 히스토리를 저장하고 관리하는 서비스를 구현합니다. TDD 방식으로 진행합니다.",
        "content": "**Step 1: 테스트 작성 (RED)**\n- CRUD 테스트 (save, get, delete, clear)\n- 필터링 테스트 (날짜, 카테고리, 검색)\n- 정렬 테스트\n\n**Step 2: 최소 구현 (GREEN)**\n- LocalStorage 래퍼 구현\n- 기본 CRUD 메서드\n\n**Step 3: 리팩토링 (REFACTOR)**\n- 필터링 로직 최적화\n- 데이터 검증 추가",
        "acceptance": "- 테스트 커버리지 > 90%\n- LocalStorage 정상 동작\n- 1000개 항목 저장/조회 < 1초",
        "time": "4시간", "priority": "P0", "labels": "phase-2,core-logic,TDD,P0", "tdd": True
    },
    {
        "phase": "2", "task": "2.3", "title": "CategoryService 구현 (TDD)",
        "background": "수식을 분석하여 자동으로 카테고리를 분류하는 서비스를 구현합니다.",
        "content": "**Step 1: 테스트 작성 (RED)**\n- 7개 카테고리 감지 테스트\n- 카테고리 설정 조회 테스트\n\n**Step 2: 최소 구현 (GREEN)**\n- 키워드 기반 감지 로직\n\n**Step 3: 리팩토링 (REFACTOR)**\n- 매칭 알고리즘 개선\n- 우선순위 로직 추가",
        "acceptance": "- 테스트 커버리지 > 90%\n- 7개 카테고리 정확히 분류\n- 감지 속도 < 10ms",
        "time": "3시간", "priority": "P0", "labels": "phase-2,core-logic,TDD,P0", "tdd": True
    },
    {
        "phase": "2", "task": "2.4", "title": "ExportService 구현 (TDD)",
        "background": "계산 히스토리를 CSV 파일로 내보내고 가져오는 기능을 구현합니다.",
        "content": "**Step 1: 테스트 작성 (RED)**\n- CSV Export 테스트\n- CSV Import 테스트\n- JSON Export/Import 테스트\n\n**Step 2: 최소 구현 (GREEN)**\n- CSV 생성 로직\n- 파일 다운로드 기능\n\n**Step 3: 리팩토링 (REFACTOR)**\n- CSV 파서 개선\n- 에러 처리 강화",
        "acceptance": "- 테스트 커버리지 > 90%\n- Excel에서 CSV 정상 열림\n- 1000개 항목 Export < 1초",
        "time": "3시간", "priority": "P1", "labels": "phase-2,core-logic,TDD,P1", "tdd": True
    },
    {
        "phase": "2", "task": "2.5", "title": "Utility 함수 구현 (TDD)",
        "background": "숫자/날짜 포맷팅, 입력 검증 등 유틸리티 함수를 구현합니다.",
        "content": "**Step 1: 테스트 작성 (RED)**\n- formatters.js 테스트 (숫자, 날짜, 단위)\n- validators.js 테스트 (입력 검증, XSS 방지)\n\n**Step 2: 구현**\n- formatters.js 작성\n- validators.js 작성\n- constants.js 작성",
        "acceptance": "- 테스트 커버리지 > 95%\n- 모든 엣지 케이스 처리",
        "time": "2시간", "priority": "P0", "labels": "phase-2,core-logic,TDD,P0", "tdd": True
    },
    # Phase 3 - UI 컴포넌트
    {
        "phase": "3", "task": "3.1", "title": "공통 컴포넌트 구현",
        "background": "재사용 가능한 공통 UI 컴포넌트를 구현합니다.",
        "content": "- Button 컴포넌트 (Primary, Secondary, Danger)\n- Modal 컴포넌트 (애니메이션, ESC 키 지원)\n- Toast 컴포넌트 (Success, Error, Info)",
        "acceptance": "- 모든 컴포넌트 재사용 가능\n- 접근성 (ARIA) 준수\n- 반응형 동작",
        "time": "4시간", "priority": "P0", "labels": "phase-3,ui,P0"
    },
    {
        "phase": "3", "task": "3.2", "title": "Header 컴포넌트 구현",
        "background": "상단 네비게이션 헤더를 구현합니다.",
        "content": "- 로고 및 앱 이름\n- 네비게이션 메뉴\n- 알림 아이콘\n- 모바일 햄버거 메뉴\n- Sticky 헤더",
        "acceptance": "- 스크롤 시 헤더 고정\n- 모바일에서 햄버거 메뉴 동작\n- 디자인 파일과 일치",
        "time": "3시간", "priority": "P0", "labels": "phase-3,ui,P0"
    },
    {
        "phase": "3", "task": "3.3", "title": "Sidebar 컴포넌트 구현",
        "background": "필터 및 빠른 액션을 위한 사이드바를 구현합니다.",
        "content": "- Quick Actions (New Calculation, Import Data)\n- Category Filter (7개 카테고리)\n- Date Range 필터\n- Pro Tip 섹션",
        "acceptance": "- Desktop에서만 표시\n- 필터 변경 시 히스토리 업데이트\n- 커스텀 스크롤바 적용",
        "time": "4시간", "priority": "P0", "labels": "phase-3,ui,P0"
    },
    {
        "phase": "3", "task": "3.4", "title": "Calculator Display 컴포넌트 구현",
        "background": "계산기의 디스플레이 영역을 구현합니다.",
        "content": "- 수식 표시 영역\n- 결과 표시 영역\n- 에러 메시지 표시\n- 긴 수식 스크롤 처리",
        "acceptance": "- 수식이 실시간으로 표시됨\n- 결과가 명확하게 구분되어 표시\n- 에러 메시지가 빨간색으로 표시",
        "time": "2시간", "priority": "P0", "labels": "phase-3,ui,calculator,P0"
    },
    {
        "phase": "3", "task": "3.5", "title": "Calculator Keypad 컴포넌트 구현",
        "background": "계산기의 버튼 패드를 구현합니다.",
        "content": "- 숫자 버튼 (0-9)\n- 연산자 버튼 (+, -, *, /, 괄호, 소수점)\n- 함수 버튼 (sin, cos, tan, log, ln, ^, sqrt)\n- 특수 버튼 (C, DEL, =)",
        "acceptance": "- 모든 버튼 클릭 시 정상 동작\n- 버튼 호버 효과 적용\n- 터치 친화적 크기 (최소 44px)",
        "time": "3시간", "priority": "P0", "labels": "phase-3,ui,calculator,P0"
    },
    {
        "phase": "3", "task": "3.6", "title": "Calculator 페이지 통합 및 키보드 지원",
        "background": "Display와 Keypad를 통합하고 키보드 입력을 지원합니다.",
        "content": "- Display와 Keypad 통합\n- 키보드 입력 지원 (숫자, 연산자, Enter, Backspace, Escape)\n- CalculationEngine 연결\n- 히스토리 자동 저장",
        "acceptance": "- 키보드로 모든 입력 가능\n- 계산 결과가 정확함\n- 계산 후 자동으로 히스토리 저장",
        "time": "2시간", "priority": "P0", "labels": "phase-3,ui,calculator,P0"
    },
    {
        "phase": "3", "task": "3.7", "title": "History SearchBar 및 FilterToolbar 구현",
        "background": "히스토리 검색 및 필터 도구를 구현합니다.",
        "content": "- SearchBar (디바운싱, Cmd+K 단축키)\n- FilterToolbar (정렬, 뷰 모드, Active Filters 칩)",
        "acceptance": "- 검색 입력 시 300ms 후 필터링\n- Cmd+K로 검색창 포커스\n- 정렬 변경 시 즉시 반영",
        "time": "3시간", "priority": "P0", "labels": "phase-3,ui,history,P0"
    },
    {
        "phase": "3", "task": "3.8", "title": "HistoryCard 컴포넌트 구현",
        "background": "개별 히스토리 항목 카드를 구현합니다.",
        "content": "- 카테고리 태그 (컬러 코딩)\n- 수식 및 결과 표시\n- 액션 버튼 (Copy, Edit, Delete, Restore)\n- 호버 효과 및 애니메이션",
        "acceptance": "- 카테고리별 컬러가 정확히 표시\n- 호버 시 액션 버튼 표시 (Desktop)\n- Copy 시 '복사됨' 토스트 표시",
        "time": "3시간", "priority": "P0", "labels": "phase-3,ui,history,P0"
    },
    {
        "phase": "3", "task": "3.9", "title": "HistoryList 및 날짜 그룹핑 구현",
        "background": "히스토리 목록을 날짜별로 그룹핑하여 표시합니다.",
        "content": "- 날짜별 그룹핑 (Today, Yesterday, 날짜별)\n- Virtual Scrolling 구현\n- 빈 상태 처리\n- Load More 버튼",
        "acceptance": "- 1000개 항목 렌더링 < 1초\n- 스크롤 시 버벅임 없음\n- 날짜 그룹이 정확히 분류됨",
        "time": "3시간", "priority": "P0", "labels": "phase-3,ui,history,P0"
    },
    {
        "phase": "3", "task": "3.10", "title": "History 페이지 통합 및 Export 기능",
        "background": "히스토리 페이지의 모든 컴포넌트를 통합하고 Export 기능을 연결합니다.",
        "content": "- SearchBar, FilterToolbar, HistoryList 통합\n- Export CSV 버튼 연결\n- Clear All 기능 (확인 다이얼로그)\n- 상태 관리 통합",
        "acceptance": "- Export CSV 버튼 클릭 시 파일 다운로드\n- Clear All 시 확인 다이얼로그 표시\n- 모든 필터/정렬/검색 정상 동작",
        "time": "2시간", "priority": "P0", "labels": "phase-3,ui,history,P0"
    },
    {
        "phase": "3", "task": "3.11", "title": "라우팅 구현",
        "background": "클라이언트 사이드 라우팅을 구현합니다.",
        "content": "- router.js 구현 (/, /history, /settings)\n- 브라우저 히스토리 API 사용\n- 404 페이지 처리",
        "acceptance": "- URL 변경 시 페이지 전환\n- 뒤로가기/앞으로가기 동작\n- 새로고침 시 현재 페이지 유지",
        "time": "2시간", "priority": "P0", "labels": "phase-3,ui,P0"
    },
    {
        "phase": "3", "task": "3.12", "title": "반응형 레이아웃 구현",
        "background": "모바일, 태블릿, 데스크톱 모든 디바이스에서 최적화된 레이아웃을 구현합니다.",
        "content": "- Mobile (< 768px) 최적화\n- Tablet (768px - 1024px) 최적화\n- Desktop (> 1024px) 최적화\n- 미디어 쿼리 테스트",
        "acceptance": "- 모든 브레이크포인트에서 정상 동작\n- 터치 제스처 지원\n- Chrome DevTools 반응형 모드 테스트 통과",
        "time": "4시간", "priority": "P0", "labels": "phase-3,ui,responsive,P0"
    },
    # Phase 4
    {
        "phase": "4", "task": "4.1", "title": "수동 UI 테스트 및 QA",
        "background": "모든 UI 기능을 수동으로 테스트하고 품질을 보증합니다.",
        "content": "- Calculator 페이지 테스트\n- History 페이지 테스트\n- 반응형 테스트 (Mobile, Tablet, Desktop)\n- 사용자 시나리오 테스트",
        "acceptance": "- 모든 기능이 예상대로 동작\n- 모든 브레이크포인트에서 정상 표시\n- 사용자 시나리오 완료 가능",
        "time": "3시간", "priority": "P0", "labels": "phase-4,testing,P0"
    },
    {
        "phase": "4", "task": "4.2", "title": "성능 최적화",
        "background": "Lighthouse 감사를 통해 성능을 측정하고 최적화합니다.",
        "content": "- Lighthouse 감사 실행\n- 번들 크기 최적화 (Code Splitting, Tree Shaking)\n- 이미지 및 폰트 로딩 최적화\n- Virtual Scrolling 구현",
        "acceptance": "- Lighthouse Score > 90\n- FCP < 1.5초\n- TTI < 3초\n- 번들 크기 < 500KB",
        "time": "3시간", "priority": "P1", "labels": "phase-4,optimization,P1"
    },
    {
        "phase": "4", "task": "4.3", "title": "접근성 개선",
        "background": "WCAG 2.1 Level AA 기준을 준수하여 접근성을 개선합니다.",
        "content": "- ARIA 레이블 추가\n- 키보드 네비게이션 테스트\n- 스크린 리더 테스트\n- 색상 대비 확인 (4.5:1)\n- Focus 표시 개선",
        "acceptance": "- WCAG 2.1 Level AA 준수\n- axe DevTools 검사 통과",
        "time": "2시간", "priority": "P1", "labels": "phase-4,accessibility,P1"
    },
    {
        "phase": "4", "task": "4.4", "title": "버그 수정 및 QA",
        "background": "크로스 브라우저 테스트 및 버그 수정을 진행합니다.",
        "content": "- 크로스 브라우저 테스트 (Chrome, Firefox, Safari, Edge)\n- 엣지 케이스 테스트\n- 사용자 시나리오 테스트\n- 버그 수정",
        "acceptance": "- 모든 주요 브라우저에서 정상 동작\n- 알려진 버그 0개",
        "time": "4시간", "priority": "P0", "labels": "phase-4,testing,P0"
    },
    {
        "phase": "4", "task": "4.5", "title": "문서화",
        "background": "프로젝트 문서를 완성하고 개발 가이드를 작성합니다.",
        "content": "- README.md 업데이트 (프로젝트 소개, 설치, 사용법)\n- CONTRIBUTING.md 작성\n- JSDoc 주석 추가\n- API 문서 생성",
        "acceptance": "- 신규 개발자가 README만 보고 시작 가능\n- 모든 공개 API에 주석 존재",
        "time": "2시간", "priority": "P1", "labels": "phase-4,documentation,P1"
    },
    {
        "phase": "4", "task": "4.6", "title": "배포",
        "background": "프로덕션 빌드를 생성하고 GitHub Pages에 배포합니다.",
        "content": "- 프로덕션 빌드 테스트 (npm run build, npm run preview)\n- GitHub Pages 배포\n- 커스텀 도메인 설정 (선택사항)\n- 배포 확인\n- 릴리스 노트 작성",
        "acceptance": "- GitHub Pages에서 정상 동작\n- 모든 기능 정상 작동\n- 성능 목표 달성",
        "time": "1시간", "priority": "P0", "labels": "phase-4,deployment,P0"
    },
]

# 이슈 템플릿 생성
for issue in issues_data:
    filename = f"phase{issue['phase']}-task{issue['task']}.md"
    
    tdd_note = ""
    if issue.get('tdd'):
        tdd_note = "\n\n**이 작업은 TDD(Test-Driven Development) 방식으로 진행해야 합니다.**"
    
    content = f"""---
title: "[Phase {issue['phase']}] Task {issue['task']}: {issue['title']}"
labels: ["{issue['labels']}"]
assignees: []
---

## 📋 작업 배경

{issue['background']}{tdd_note}

## 🎯 작업 내용

{issue['content']}

## ✅ 인수 조건 (Acceptance Criteria)

{issue['acceptance']}

## 📌 추가 정보

- **우선순위**: {issue['priority']}
- **예상 시간**: {issue['time']}
- **관련 문서**: [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md), [TECH_SPEC.md](../TECH_SPEC.md)
"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ 생성: {filename}")

print(f"\n완료! 총 {len(issues_data)}개의 이슈 템플릿이 생성되었습니다.")
