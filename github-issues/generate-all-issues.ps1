# EngCalc Pro - GitHub Issues 자동 생성 스크립트
# 모든 Phase의 이슈 템플릿을 생성합니다

Write-Host "=== EngCalc Pro GitHub Issues 생성 ===" -ForegroundColor Cyan
Write-Host ""

# Phase 1 이슈 실행
Write-Host "[Phase 1] 이슈 생성 중..." -ForegroundColor Yellow
& ".\generate-phase1-issues.ps1"

Write-Host ""
Write-Host "[Phase 2] 이슈 생성 중..." -ForegroundColor Yellow  
& ".\generate-phase2-issues.ps1"

Write-Host ""
Write-Host "[Phase 3] 이슈 생성 중..." -ForegroundColor Yellow
& ".\generate-phase3-issues.ps1"

Write-Host ""
Write-Host "[Phase 4] 이슈 생성 중..." -ForegroundColor Yellow
& ".\generate-phase4-issues.ps1"

Write-Host ""
Write-Host "=== 모든 이슈 템플릿 생성 완료! ===" -ForegroundColor Green
Write-Host ""
Write-Host "다음 단계:" -ForegroundColor Cyan
Write-Host "1. GitHub CLI 설치 및 인증" -ForegroundColor White
Write-Host "   - 설치: https://cli.github.com/" -ForegroundColor Gray
Write-Host "   - 인증: gh auth login" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 이슈 일괄 생성" -ForegroundColor White
Write-Host "   - 실행: .\upload-issues.ps1" -ForegroundColor Gray
Write-Host ""
Write-Host "또는 수동으로 GitHub 웹사이트에서 이슈 생성" -ForegroundColor White
Write-Host "   - github-issues 폴더의 각 .md 파일 내용을 복사하여 붙여넣기" -ForegroundColor Gray
