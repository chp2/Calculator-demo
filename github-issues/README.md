# GitHub Issues 생성 가이드

이 폴더에는 EngCalc Pro 프로젝트의 모든 작업을 GitHub Issues로 등록하기 위한 템플릿 파일들이 있습니다.

## 📋 이슈 구조

각 이슈는 다음 구조를 따릅니다:

1. **작업 배경** (Background): 왜 이 작업이 필요한지
2. **작업 내용** (Content): 무엇을 할 것인지
3. **인수 조건** (Acceptance Criteria): 언제 완료로 볼 것인지

## 🚀 이슈 생성 방법

### 방법 1: GitHub CLI 사용 (권장)

```powershell
# 1. GitHub CLI 설치
winget install GitHub.cli

# 2. 인증
gh auth login

# 3. 모든 이슈 생성
cd github-issues
.\upload-all-issues.ps1
```

### 방법 2: 수동 생성

1. GitHub 저장소의 Issues 탭으로 이동
2. "New issue" 클릭
3. `github-issues/` 폴더의 각 `.md` 파일 내용을 복사하여 붙여넣기
4. 레이블 추가 (파일 상단의 `labels` 참고)
5. "Submit new issue" 클릭

## 📊 이슈 목록

### Phase 1: 프로젝트 설정 (5개)
- `phase1-task1.1.md` - 개발 환경 설정
- `phase1-task1.2.md` - 프로젝트 초기화
- `phase1-task1.3.md` - 프로젝트 구조 생성
- `phase1-task1.4.md` - 설정 파일 작성
- `phase1-task1.5.md` - GitHub Actions 설정

### Phase 2: 코어 로직 (5개) - TDD 필수
- `phase2-task2.1.md` - CalculationEngine 구현
- `phase2-task2.2.md` - StorageService 구현
- `phase2-task2.3.md` - CategoryService 구현
- `phase2-task2.4.md` - ExportService 구현
- `phase2-task2.5.md` - Utility 함수 구현

### Phase 3: UI 컴포넌트 (12개)
- `phase3-task3.1.md` - 공통 컴포넌트
- `phase3-task3.2.md` - Header 컴포넌트
- `phase3-task3.3.md` - Sidebar 컴포넌트
- `phase3-task3.4.md` - Calculator Display
- `phase3-task3.5.md` - Calculator Keypad
- `phase3-task3.6.md` - Calculator 통합
- `phase3-task3.7.md` - History SearchBar & FilterToolbar
- `phase3-task3.8.md` - HistoryCard
- `phase3-task3.9.md` - HistoryList
- `phase3-task3.10.md` - History 통합
- `phase3-task3.11.md` - 라우팅
- `phase3-task3.12.md` - 반응형 레이아웃

### Phase 4: 통합 및 테스트 (6개)
- `phase4-task4.1.md` - 수동 UI 테스트
- `phase4-task4.2.md` - 성능 최적화
- `phase4-task4.3.md` - 접근성 개선
- `phase4-task4.4.md` - 버그 수정 및 QA
- `phase4-task4.5.md` - 문서화
- `phase4-task4.6.md` - 배포

**총 28개 이슈**

## 🏷️ 레이블 시스템

- `phase-1`, `phase-2`, `phase-3`, `phase-4`: Phase 구분
- `setup`: 프로젝트 설정
- `core-logic`: 코어 로직
- `TDD`: TDD 필수 작업
- `ui`: UI 컴포넌트
- `calculator`, `history`: 페이지별 구분
- `testing`: 테스트 관련
- `P0`: Critical (필수)
- `P1`: High (중요)

## 📝 이슈 템플릿 예시

```markdown
---
title: "[Phase X] Task X.X: 작업명"
labels: ["phase-X", "category", "priority"]
---

## 📋 작업 배경
왜 이 작업이 필요한지 설명

## 🎯 작업 내용
- 체크리스트 1
- 체크리스트 2

## ✅ 인수 조건
- [ ] 조건 1
- [ ] 조건 2

## 📌 추가 정보
- 우선순위: PX
- 예상 시간: X시간
```

## 🔗 관련 문서

- [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md) - 전체 구현 계획
- [PRD.md](../PRD.md) - 제품 요구사항
- [TECH_SPEC.md](../TECH_SPEC.md) - 기술 명세
