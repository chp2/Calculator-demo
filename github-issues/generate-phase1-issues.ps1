# GitHub Issues 템플릿 자동 생성 스크립트

$issuesData = @'
[
  {
    "phase": "1",
    "task": "1.2",
    "title": "프로젝트 초기화",
    "background": "Vite 기반 프로젝트를 초기화하고 필요한 모든 의존성을 설치합니다. Tailwind CSS, Math.js, Vitest 등 프로젝트에 필요한 라이브러리를 설정합니다.",
    "content": "- Vite 프로젝트 생성 (vanilla template)\n- 필수 의존성 설치 (mathjs, decimal.js)\n- 개발 의존성 설치 (tailwindcss, vitest, eslint, prettier)\n- Tailwind CSS 초기화",
    "acceptance": "- `npm run dev` 실행 시 개발 서버 정상 동작\n- `package.json`에 모든 의존성 추가됨\n- Tailwind CSS 설정 파일 생성됨",
    "time": "1시간",
    "priority": "P0",
    "labels": "phase-1,setup,P0"
  },
  {
    "phase": "1",
    "task": "1.3",
    "title": "프로젝트 구조 생성",
    "background": "프로젝트의 디렉토리 구조를 생성하여 코드 조직화를 준비합니다. 컴포넌트, 서비스, 유틸리티, 테스트 등 각 역할별로 폴더를 구분합니다.",
    "content": "- `src/` 하위 디렉토리 생성 (components, services, utils, styles)\n- `src/components/` 하위 디렉토리 생성 (Calculator, History, Sidebar, Header, Common)\n- `tests/` 하위 디렉토리 생성 (services, utils)\n- 기본 파일 생성 (main.js, router.js, index.css, index.html)",
    "acceptance": "- 모든 디렉토리가 생성됨\n- 기본 파일이 존재함\n- TECH_SPEC.md의 프로젝트 구조와 일치함",
    "time": "30분",
    "priority": "P0",
    "labels": "phase-1,setup,P0"
  },
  {
    "phase": "1",
    "task": "1.4",
    "title": "설정 파일 작성",
    "background": "Vite, Tailwind CSS, Vitest, ESLint, Prettier 등 개발 도구의 설정 파일을 작성합니다. 디자인 시스템(컬러, 폰트 등)을 Tailwind 설정에 반영합니다.",
    "content": "- `vite.config.js` 작성 (GitHub Pages base path 포함)\n- `tailwind.config.js` 작성 (디자인 시스템 반영)\n- `vitest.config.js` 작성 (커버리지 설정)\n- `.eslintrc.json` 작성\n- `.prettierrc` 작성\n- `.gitignore` 업데이트",
    "acceptance": "- Vite 빌드 성공\n- Tailwind 클래스 자동완성 동작\n- ESLint/Prettier 정상 동작\n- 디자인 시스템 컬러가 Tailwind 설정에 반영됨",
    "time": "1시간",
    "priority": "P0",
    "labels": "phase-1,setup,P0"
  },
  {
    "phase": "1",
    "task": "1.5",
    "title": "GitHub Actions 설정",
    "background": "CI/CD 파이프라인을 구축하여 코드 푸시 시 자동으로 테스트를 실행하고 GitHub Pages에 배포합니다.",
    "content": "- `.github/workflows/test.yml` 작성 (테스트 자동화)\n- `.github/workflows/deploy.yml` 작성 (GitHub Pages 배포)\n- GitHub Pages 설정 (gh-pages 브랜치)\n- 테스트 푸시 및 배포 확인",
    "acceptance": "- PR 생성 시 자동 테스트 실행\n- main 브랜치 푸시 시 자동 배포\n- GitHub Pages에서 사이트 접근 가능",
    "time": "1시간",
    "priority": "P0",
    "labels": "phase-1,ci-cd,P0"
  }
]
'@ | ConvertFrom-Json

# Phase 1 이슈 생성
foreach ($issue in $issuesData) {
    $fileName = "phase$($issue.phase)-task$($issue.task).md"
    $filePath = "github-issues\$fileName"
    
    $content = @"
---
title: "[Phase $($issue.phase)] Task $($issue.task): $($issue.title)"
labels: [$($issue.labels)]
assignees: []
---

## 📋 작업 배경

$($issue.background)

## 🎯 작업 내용

$($issue.content)

## ✅ 인수 조건 (Acceptance Criteria)

$($issue.acceptance)

## 📌 추가 정보

- **우선순위**: $($issue.priority)
- **예상 시간**: $($issue.time)
- **관련 문서**: [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md), [TECH_SPEC.md](../TECH_SPEC.md)
"@

    $content | Out-File -FilePath $filePath -Encoding UTF8
    Write-Host "✓ 생성: $fileName" -ForegroundColor Green
}

Write-Host "`n완료! github-issues 폴더를 확인하세요." -ForegroundColor Cyan
