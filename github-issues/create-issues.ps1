# GitHub Issues 생성 스크립트
# 사용법: .\create-issues.ps1

$issues = @(
    @{
        file = "phase1-task1.1.md"
        title = "[Phase 1] Task 1.1: 개발 환경 설정"
        labels = "phase-1,setup,P0"
    },
    @{
        file = "phase1-task1.2.md"
        title = "[Phase 1] Task 1.2: 프로젝트 초기화"
        labels = "phase-1,setup,P0"
    },
    @{
        file = "phase1-task1.3.md"
        title = "[Phase 1] Task 1.3: 프로젝트 구조 생성"
        labels = "phase-1,setup,P0"
    },
    @{
        file = "phase1-task1.4.md"
        title = "[Phase 1] Task 1.4: 설정 파일 작성"
        labels = "phase-1,setup,P0"
    },
    @{
        file = "phase1-task1.5.md"
        title = "[Phase 1] Task 1.5: GitHub Actions 설정"
        labels = "phase-1,ci-cd,P0"
    },
    @{
        file = "phase2-task2.1.md"
        title = "[Phase 2] Task 2.1: CalculationEngine 구현 (TDD)"
        labels = "phase-2,core-logic,TDD,P0"
    },
    @{
        file = "phase2-task2.2.md"
        title = "[Phase 2] Task 2.2: StorageService 구현 (TDD)"
        labels = "phase-2,core-logic,TDD,P0"
    },
    @{
        file = "phase2-task2.3.md"
        title = "[Phase 2] Task 2.3: CategoryService 구현 (TDD)"
        labels = "phase-2,core-logic,TDD,P0"
    },
    @{
        file = "phase2-task2.4.md"
        title = "[Phase 2] Task 2.4: ExportService 구현 (TDD)"
        labels = "phase-2,core-logic,TDD,P1"
    },
    @{
        file = "phase2-task2.5.md"
        title = "[Phase 2] Task 2.5: Utility 함수 구현 (TDD)"
        labels = "phase-2,core-logic,TDD,P0"
    },
    @{
        file = "phase3-task3.1.md"
        title = "[Phase 3] Task 3.1: 공통 컴포넌트 구현"
        labels = "phase-3,ui,P0"
    },
    @{
        file = "phase3-task3.2.md"
        title = "[Phase 3] Task 3.2: Header 컴포넌트 구현"
        labels = "phase-3,ui,P0"
    },
    @{
        file = "phase3-task3.3.md"
        title = "[Phase 3] Task 3.3: Sidebar 컴포넌트 구현"
        labels = "phase-3,ui,P0"
    },
    @{
        file = "phase3-task3.4.md"
        title = "[Phase 3] Task 3.4: Calculator Display 컴포넌트 구현"
        labels = "phase-3,ui,calculator,P0"
    },
    @{
        file = "phase3-task3.5.md"
        title = "[Phase 3] Task 3.5: Calculator Keypad 컴포넌트 구현"
        labels = "phase-3,ui,calculator,P0"
    },
    @{
        file = "phase3-task3.6.md"
        title = "[Phase 3] Task 3.6: Calculator 페이지 통합 및 키보드 지원"
        labels = "phase-3,ui,calculator,P0"
    },
    @{
        file = "phase3-task3.7.md"
        title = "[Phase 3] Task 3.7: History SearchBar 및 FilterToolbar 구현"
        labels = "phase-3,ui,history,P0"
    },
    @{
        file = "phase3-task3.8.md"
        title = "[Phase 3] Task 3.8: HistoryCard 컴포넌트 구현"
        labels = "phase-3,ui,history,P0"
    },
    @{
        file = "phase3-task3.9.md"
        title = "[Phase 3] Task 3.9: HistoryList 및 날짜 그룹핑 구현"
        labels = "phase-3,ui,history,P0"
    },
    @{
        file = "phase3-task3.10.md"
        title = "[Phase 3] Task 3.10: History 페이지 통합 및 Export 기능"
        labels = "phase-3,ui,history,P0"
    },
    @{
        file = "phase3-task3.11.md"
        title = "[Phase 3] Task 3.11: 라우팅 구현"
        labels = "phase-3,ui,P0"
    },
    @{
        file = "phase3-task3.12.md"
        title = "[Phase 3] Task 3.12: 반응형 레이아웃 구현"
        labels = "phase-3,ui,responsive,P0"
    },
    @{
        file = "phase4-task4.1.md"
        title = "[Phase 4] Task 4.1: 수동 UI 테스트 및 QA"
        labels = "phase-4,testing,P0"
    },
    @{
        file = "phase4-task4.2.md"
        title = "[Phase 4] Task 4.2: 성능 최적화"
        labels = "phase-4,optimization,P1"
    },
    @{
        file = "phase4-task4.3.md"
        title = "[Phase 4] Task 4.3: 접근성 개선"
        labels = "phase-4,accessibility,P1"
    },
    @{
        file = "phase4-task4.4.md"
        title = "[Phase 4] Task 4.4: 버그 수정 및 QA"
        labels = "phase-4,testing,P0"
    },
    @{
        file = "phase4-task4.5.md"
        title = "[Phase 4] Task 4.5: 문서화"
        labels = "phase-4,documentation,P1"
    },
    @{
        file = "phase4-task4.6.md"
        title = "[Phase 4] Task 4.6: 배포"
        labels = "phase-4,deployment,P0"
    }
)

Write-Host "GitHub Issues 템플릿 파일 목록:" -ForegroundColor Green
Write-Host ""

foreach ($issue in $issues) {
    $filePath = "github-issues\$($issue.file)"
    if (Test-Path $filePath) {
        Write-Host "✓ $($issue.file)" -ForegroundColor Green
    } else {
        Write-Host "✗ $($issue.file) - 파일이 없습니다" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "총 $($issues.Count)개의 이슈 템플릿" -ForegroundColor Cyan
Write-Host ""
Write-Host "GitHub CLI로 이슈 생성 방법:" -ForegroundColor Yellow
Write-Host "1. GitHub CLI 설치: https://cli.github.com/" -ForegroundColor Gray
Write-Host "2. 인증: gh auth login" -ForegroundColor Gray
Write-Host "3. 이슈 생성:" -ForegroundColor Gray
Write-Host ""
Write-Host "   foreach (`$issue in `$issues) {" -ForegroundColor Gray
Write-Host "       gh issue create --title `"`$(`$issue.title)`" --body-file `"github-issues\`$(`$issue.file)`" --label `"`$(`$issue.labels)`"" -ForegroundColor Gray
Write-Host "   }" -ForegroundColor Gray
Write-Host ""
Write-Host "또는 수동으로 GitHub 웹사이트에서 각 파일 내용을 복사하여 이슈를 생성하세요." -ForegroundColor Yellow
