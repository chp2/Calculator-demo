---
title: "[Phase 2] Task 2.1: CalculationEngine 구현 (TDD)"
labels: ["phase-2", "core-logic", "TDD", "P0"]
assignees: []
---

## 📋 작업 배경

EngCalc Pro의 핵심 기능인 수학 계산 엔진을 구현합니다. Math.js와 Decimal.js를 활용하여 정확한 계산을 수행하고, 다양한 수학 함수(삼각함수, 지수, 로그 등)를 지원합니다.

**이 작업은 TDD(Test-Driven Development) 방식으로 진행해야 합니다.**

## 🎯 작업 내용

### Step 1: 테스트 작성 (RED)
- [ ] `tests/services/calculationEngine.test.js` 생성
- [ ] 기본 사칙연산 테스트 작성
  - [ ] 덧셈: `2 + 2 = 4`
  - [ ] 뺄셈: `5 - 3 = 2`
  - [ ] 곱셈: `3 * 4 = 12`
  - [ ] 나눗셈: `10 / 2 = 5`
- [ ] 고급 함수 테스트 작성
  - [ ] 삼각함수: `sin(30 deg) ≈ 0.5`
  - [ ] 지수: `2^3 = 8`
  - [ ] 로그: `log(100) = 2`
- [ ] 에러 케이스 테스트
  - [ ] 0으로 나누기
  - [ ] 잘못된 구문
  - [ ] 정의되지 않은 함수

### Step 2: 최소 구현 (GREEN)
- [ ] `src/services/calculationEngine.js` 생성
- [ ] Math.js 통합
- [ ] 기본 `calculate()` 메서드 구현
- [ ] 모든 테스트 통과 확인

### Step 3: 리팩토링 (REFACTOR)
- [ ] Decimal.js 통합 (정밀도 향상)
- [ ] 에러 메시지 한글화
- [ ] 단위 추출 기능 추가
- [ ] 결과 포맷팅 개선

## ✅ 인수 조건 (Acceptance Criteria)

- [ ] 테스트 커버리지 > 90%
- [ ] 모든 테스트 통과
- [ ] 소수점 15자리 정확도 보장
- [ ] 기본 사칙연산 정확히 계산
- [ ] 삼각함수, 지수, 로그 함수 정상 동작
- [ ] 0으로 나누기 등 에러 케이스 적절히 처리
- [ ] 에러 메시지가 한글로 표시됨

## 📌 추가 정보

- **우선순위**: P0 (Critical)
- **예상 시간**: 4시간
- **TDD 필수**: ✅
- **관련 문서**: 
  - [TECH_SPEC.md - CalculationEngine](../TECH_SPEC.md#31-계산-엔진-calculationenginejs)
  - [TDD_GUIDE.md](../docs/TDD_GUIDE.md)
  - [SOLID_GUIDE.md](../docs/SOLID_GUIDE.md)

## 🔗 참고 자료

- [Math.js Documentation](https://mathjs.org/)
- [Decimal.js Documentation](https://mikemcl.github.io/decimal.js/)
