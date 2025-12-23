# Test-Driven Development (TDD) 규칙

## 개요
이 프로젝트의 **모든 코어 로직(Core Logic)**은 TDD(Test-Driven Development) 방식으로 구현합니다.
UI 컴포넌트는 TDD 대상에서 제외되지만, 비즈니스 로직을 포함한 모든 서비스, 유틸리티, 계산 엔진은 반드시 테스트를 먼저 작성해야 합니다.

---

## TDD 적용 범위

### ✅ TDD 필수 적용 대상
다음 디렉토리의 모든 코드는 TDD로 작성합니다:

- `src/services/` - 모든 서비스 로직
  - `calculationEngine.js`
  - `storageService.js`
  - `categoryService.js`
  - `exportService.js`
  
- `src/utils/` - 모든 유틸리티 함수
  - `formatters.js`
  - `validators.js`

### ❌ TDD 제외 대상
- `src/components/` - UI 컴포넌트 (선택적 테스트)
- `src/styles/` - CSS 파일

---

## TDD 사이클 (Red-Green-Refactor)

### 1️⃣ RED - 실패하는 테스트 작성
### 2️⃣ GREEN - 최소한의 코드로 테스트 통과
### 3️⃣ REFACTOR - 코드 개선 및 일반화

---

## 테스트 작성 규칙

### 1. AAA 패턴 사용
모든 테스트는 **Arrange-Act-Assert** 패턴을 따릅니다.

### 2. 테스트 커버리지 목표
- **코어 로직**: 최소 90% 커버리지
- **브랜치 커버리지**: 최소 85%
- **함수 커버리지**: 100%

### 3. 테스트 케이스 작성
- Happy Path (정상 경로)
- Edge Cases (경계 조건)
- Error Cases (오류 처리)

---

## 체크리스트

- [ ] 테스트를 먼저 작성했는가? (RED)
- [ ] 테스트가 실패하는 것을 확인했는가?
- [ ] 최소한의 코드로 테스트를 통과시켰는가? (GREEN)
- [ ] 코드를 리팩토링했는가? (REFACTOR)
- [ ] 모든 테스트가 여전히 통과하는가?
- [ ] 커버리지 목표(90%)를 달성했는가?
