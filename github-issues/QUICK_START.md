# GitHub Issues 빠른 시작 가이드

## 🎯 목적

EngCalc Pro 프로젝트의 모든 작업(28개 Task)을 GitHub Issues로 등록하여 프로젝트 관리를 체계화합니다.

## ✅ 생성 완료

총 **28개의 이슈 템플릿**이 생성되었습니다:
- Phase 1: 5개 (프로젝트 설정)
- Phase 2: 5개 (코어 로직 - TDD)
- Phase 3: 12개 (UI 컴포넌트)
- Phase 4: 6개 (통합 및 테스트)

## 🚀 GitHub에 이슈 등록하기

### 방법 1: GitHub CLI 사용 (자동, 권장)

```powershell
# 1. GitHub CLI 설치 (한 번만)
winget install GitHub.cli

# 2. 인증 (한 번만)
gh auth login

# 3. 이슈 일괄 생성
cd github-issues
.\upload-all-issues.ps1
```

### 방법 2: 수동 등록

1. GitHub 저장소의 **Issues** 탭으로 이동
2. **New issue** 클릭
3. `github-issues/phase1-task1.1.md` 파일 열기
4. 파일 내용 전체 복사
5. GitHub Issue에 붙여넣기
6. 레이블 추가 (파일 상단의 `labels` 참고)
7. **Submit new issue** 클릭
8. 나머지 27개 파일도 반복

## 📋 이슈 구조

각 이슈는 다음 정보를 포함합니다:

### 📋 작업 배경
- 왜 이 작업이 필요한지
- 어떤 문제를 해결하는지

### 🎯 작업 내용
- 구체적인 체크리스트
- 단계별 작업 내용

### ✅ 인수 조건 (Acceptance Criteria)
- 작업 완료 기준
- 테스트 가능한 조건

### 📌 추가 정보
- 우선순위 (P0/P1)
- 예상 시간
- 관련 문서 링크

## 🏷️ 레이블 시스템

| 레이블 | 설명 |
|--------|------|
| `phase-1` ~ `phase-4` | Phase 구분 |
| `setup` | 프로젝트 설정 |
| `core-logic` | 코어 로직 |
| `TDD` | TDD 필수 작업 |
| `ui` | UI 컴포넌트 |
| `calculator` | Calculator 페이지 |
| `history` | History 페이지 |
| `testing` | 테스트 관련 |
| `P0` | Critical (필수) |
| `P1` | High (중요) |

## 📊 이슈 목록

### Phase 1: 프로젝트 설정 (5개)
- [x] Task 1.1: 개발 환경 설정 `phase1-task1.1.md`
- [ ] Task 1.2: 프로젝트 초기화 `phase1-task1.2.md`
- [ ] Task 1.3: 프로젝트 구조 생성 `phase1-task1.3.md`
- [ ] Task 1.4: 설정 파일 작성 `phase1-task1.4.md`
- [ ] Task 1.5: GitHub Actions 설정 `phase1-task1.5.md`

### Phase 2: 코어 로직 (5개) - TDD 필수
- [ ] Task 2.1: CalculationEngine 구현 `phase2-task2.1.md`
- [ ] Task 2.2: StorageService 구현 `phase2-task2.2.md`
- [ ] Task 2.3: CategoryService 구현 `phase2-task2.3.md`
- [ ] Task 2.4: ExportService 구현 `phase2-task2.4.md`
- [ ] Task 2.5: Utility 함수 구현 `phase2-task2.5.md`

### Phase 3: UI 컴포넌트 (12개)
- [ ] Task 3.1: 공통 컴포넌트 `phase3-task3.1.md`
- [ ] Task 3.2: Header 컴포넌트 `phase3-task3.2.md`
- [ ] Task 3.3: Sidebar 컴포넌트 `phase3-task3.3.md`
- [ ] Task 3.4: Calculator Display `phase3-task3.4.md`
- [ ] Task 3.5: Calculator Keypad `phase3-task3.5.md`
- [ ] Task 3.6: Calculator 통합 `phase3-task3.6.md`
- [ ] Task 3.7: History SearchBar & FilterToolbar `phase3-task3.7.md`
- [ ] Task 3.8: HistoryCard `phase3-task3.8.md`
- [ ] Task 3.9: HistoryList `phase3-task3.9.md`
- [ ] Task 3.10: History 통합 `phase3-task3.10.md`
- [ ] Task 3.11: 라우팅 `phase3-task3.11.md`
- [ ] Task 3.12: 반응형 레이아웃 `phase3-task3.12.md`

### Phase 4: 통합 및 테스트 (6개)
- [ ] Task 4.1: 수동 UI 테스트 `phase4-task4.1.md`
- [ ] Task 4.2: 성능 최적화 `phase4-task4.2.md`
- [ ] Task 4.3: 접근성 개선 `phase4-task4.3.md`
- [ ] Task 4.4: 버그 수정 및 QA `phase4-task4.4.md`
- [ ] Task 4.5: 문서화 `phase4-task4.5.md`
- [ ] Task 4.6: 배포 `phase4-task4.6.md`

## 💡 팁

### 이슈 생성 후
1. **Milestone** 설정: Phase별로 마일스톤 생성
2. **Project Board** 활용: Kanban 보드로 진행 상황 관리
3. **Assignee** 지정: 작업 담당자 할당

### 작업 진행 시
1. 이슈에 코멘트로 진행 상황 업데이트
2. PR 생성 시 `Closes #이슈번호` 추가
3. 완료 시 체크리스트 체크

## 🔗 관련 문서

- [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md) - 전체 구현 계획
- [PRD.md](../PRD.md) - 제품 요구사항
- [TECH_SPEC.md](../TECH_SPEC.md) - 기술 명세
- [TDD_GUIDE.md](../docs/TDD_GUIDE.md) - TDD 가이드
- [SOLID_GUIDE.md](../docs/SOLID_GUIDE.md) - SOLID 원칙

---

**준비 완료!** 이제 GitHub에 이슈를 등록하고 개발을 시작하세요! 🚀
