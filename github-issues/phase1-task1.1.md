---
title: "[Phase 1] Task 1.1: 개발 환경 설정"
labels: ["phase-1", "setup", "P0"]
assignees: []
---

## 📋 작업 배경

EngCalc Pro 프로젝트를 시작하기 위해 개발 환경을 설정해야 합니다. Node.js, Git, VSCode 확장 프로그램 등 필수 도구들을 설치하고 설정하여 원활한 개발이 가능하도록 준비합니다.

## 🎯 작업 내용

### 체크리스트
- [ ] Node.js 18+ 설치 확인
  - `node --version` 실행하여 버전 확인
  - 18 미만인 경우 최신 LTS 버전 설치
- [ ] Git 설정 확인
  - `git --version` 실행
  - Git 사용자 정보 설정 확인 (`git config --global user.name`, `git config --global user.email`)
- [ ] VSCode 확장 프로그램 설치
  - [ ] ESLint
  - [ ] Prettier - Code formatter
  - [ ] Tailwind CSS IntelliSense
  - [ ] Vitest

### 참고 자료
- [Node.js 공식 사이트](https://nodejs.org/)
- [Git 설치 가이드](https://git-scm.com/downloads)

## ✅ 인수 조건 (Acceptance Criteria)

- [ ] `node --version` 실행 시 v18 이상 출력됨
- [ ] Git 커밋이 정상적으로 가능함
- [ ] VSCode에서 자동 포맷팅이 동작함 (Prettier)
- [ ] VSCode에서 Tailwind CSS 클래스 자동완성이 동작함

## 📌 추가 정보

- **우선순위**: P0 (Critical)
- **예상 시간**: 2시간
- **관련 문서**: [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md)
