# EngCalc Pro - GitHub Issues 일괄 생성 스크립트
# 사전 요구사항: GitHub CLI 설치 및 인증 (gh auth login)

Write-Host "=== GitHub Issues 일괄 생성 ===" -ForegroundColor Cyan
Write-Host ""

# GitHub CLI 설치 확인
try {
    $ghVersion = gh --version
    Write-Host "✓ GitHub CLI 설치됨" -ForegroundColor Green
} catch {
    Write-Host "✗ GitHub CLI가 설치되지 않았습니다." -ForegroundColor Red
    Write-Host "설치 방법: winget install GitHub.cli" -ForegroundColor Yellow
    Write-Host "또는: https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# 인증 확인
try {
    $authStatus = gh auth status 2>&1
    if ($authStatus -match "Logged in") {
        Write-Host "✓ GitHub 인증됨" -ForegroundColor Green
    } else {
        Write-Host "✗ GitHub 인증이 필요합니다." -ForegroundColor Red
        Write-Host "실행: gh auth login" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "✗ GitHub 인증이 필요합니다." -ForegroundColor Red
    Write-Host "실행: gh auth login" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "이슈 생성을 시작합니다..." -ForegroundColor Yellow
Write-Host ""

# 이슈 파일 목록
$issueFiles = Get-ChildItem -Path "." -Filter "phase*.md" | Sort-Object Name

$successCount = 0
$failCount = 0

foreach ($file in $issueFiles) {
    Write-Host "처리 중: $($file.Name)..." -NoNewline
    
    try {
        # 파일에서 title과 labels 추출
        $content = Get-Content $file.FullName -Raw
        
        if ($content -match 'title:\s*"([^"]+)"') {
            $title = $matches[1]
        } else {
            Write-Host " ✗ (제목 없음)" -ForegroundColor Red
            $failCount++
            continue
        }
        
        if ($content -match 'labels:\s*\[([^\]]+)\]') {
            $labelsRaw = $matches[1]
            $labels = $labelsRaw -replace '"', '' -replace ' ', ''
        } else {
            $labels = ""
        }
        
        # 이슈 생성
        if ($labels) {
            gh issue create --title "$title" --body-file "$($file.FullName)" --label "$labels" | Out-Null
        } else {
            gh issue create --title "$title" --body-file "$($file.FullName)" | Out-Null
        }
        
        Write-Host " ✓" -ForegroundColor Green
        $successCount++
        Start-Sleep -Milliseconds 500  # API rate limit 방지
        
    } catch {
        Write-Host " ✗ (오류: $($_.Exception.Message))" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "=== 완료 ===" -ForegroundColor Cyan
Write-Host "성공: $successCount개" -ForegroundColor Green
Write-Host "실패: $failCount개" -ForegroundColor Red
Write-Host ""
Write-Host "GitHub Issues 페이지를 확인하세요!" -ForegroundColor Yellow
