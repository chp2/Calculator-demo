# Contributing to EngCalc Pro

EngCalc Pro에 기여해주셔서 감사합니다! 이 문서는 프로젝트에 기여하는 방법을 안내합니다.

## 📋 목차

- [행동 강령](#행동-강령)
- [시작하기](#시작하기)
- [개발 프로세스](#개발-프로세스)
- [코딩 규칙](#코딩-규칙)
- [커밋 메시지 가이드](#커밋-메시지-가이드)
- [Pull Request 프로세스](#pull-request-프로세스)

---

## 행동 강령

이 프로젝트는 모든 기여자가 존중받는 환경을 유지하기 위해 행동 강령을 따릅니다.

- 서로를 존중하고 배려합니다
- 건설적인 피드백을 제공합니다
- 다양성을 존중합니다

---

## 시작하기

### 1. 저장소 Fork

GitHub에서 프로젝트를 Fork합니다.

### 2. 로컬에 Clone

```bash
git clone https://github.com/your-username/Calculator-demo.git
cd Calculator-demo
```

### 3. 의존성 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm run dev
```

---

## 개발 프로세스

### 브랜치 전략

```
main (production)
  └── develop
       ├── feature/calculator-ui
       ├── feature/history-page
       └── bugfix/calculation-error
```

### 브랜치 명명 규칙

- `feature/기능명` - 새로운 기능
- `bugfix/버그명` - 버그 수정
- `refactor/리팩토링명` - 코드 리팩토링
- `docs/문서명` - 문서 수정
- `test/테스트명` - 테스트 추가

### 예시

```bash
git checkout -b feature/export-csv
```

---

## 코딩 규칙

### JavaScript 스타일 가이드

이 프로젝트는 ESLint와 Prettier를 사용합니다.

```bash
# 린트 검사
npm run lint

# 자동 포맷팅
npm run format
```

### 코어 로직은 TDD 필수

`src/services/`와 `src/utils/`의 모든 코드는 **TDD 방식**으로 작성해야 합니다.

#### TDD 사이클

1. **RED**: 실패하는 테스트 작성
2. **GREEN**: 최소한의 코드로 테스트 통과
3. **REFACTOR**: 코드 개선

#### 예시

```javascript
// 1. RED: tests/services/calculationEngine.test.js
describe('CalculationEngine', () => {
  it('should calculate addition', () => {
    const engine = new CalculationEngine();
    expect(engine.calculate('2 + 2').value).toBe('4');
  });
});

// 2. GREEN: src/services/calculationEngine.js
class CalculationEngine {
  calculate(expression) {
    return { value: this.math.evaluate(expression) };
  }
}

// 3. REFACTOR: 에러 처리, 포맷팅 추가
```

### SOLID 원칙 준수

모든 클래스와 함수는 SOLID 원칙을 따라야 합니다.

- **SRP**: 하나의 책임만
- **OCP**: 확장에 열려있고 수정에 닫혀있음
- **LSP**: 하위 타입은 상위 타입을 대체 가능
- **ISP**: 클라이언트는 사용하지 않는 인터페이스에 의존하지 않음
- **DIP**: 추상화에 의존

자세한 내용은 [SOLID_GUIDE.md](docs/SOLID_GUIDE.md)를 참고하세요.

### 테스트 커버리지

- **코어 로직**: 최소 90% 커버리지
- **브랜치 커버리지**: 최소 85%

```bash
npm run test:coverage
```

---

## 커밋 메시지 가이드

### 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 설정 등

### 예시

```
feat(calculator): add keyboard input support

- Add event listeners for keyboard input
- Support Enter, Backspace, Escape keys
- Add keyboard shortcut guide

Closes #42
```

---

## Pull Request 프로세스

### 1. 작업 전 확인

- [ ] 최신 `develop` 브랜치에서 시작
- [ ] 관련 Issue가 있는지 확인
- [ ] Issue가 없다면 먼저 Issue 생성

### 2. 개발

- [ ] TDD 사이클 준수 (코어 로직)
- [ ] SOLID 원칙 준수
- [ ] 테스트 작성 및 통과
- [ ] 린트 검사 통과

### 3. PR 생성

#### PR 제목

```
[Type] 간단한 설명 (#Issue번호)
```

예시:
```
[Feature] Add CSV export functionality (#23)
```

#### PR 설명 템플릿

```markdown
## 📋 변경 사항

- 변경 사항 1
- 변경 사항 2

## 🎯 관련 Issue

Closes #이슈번호

## ✅ 체크리스트

- [ ] 테스트 작성 및 통과
- [ ] 린트 검사 통과
- [ ] 문서 업데이트 (필요 시)
- [ ] 스크린샷 첨부 (UI 변경 시)

## 📸 스크린샷 (선택사항)

(UI 변경이 있는 경우 스크린샷 첨부)
```

### 4. 코드 리뷰

- 최소 1명의 승인 필요
- 모든 코멘트 해결
- CI 테스트 통과

### 5. 병합

- Squash and Merge 사용
- 병합 후 브랜치 삭제

---

## 테스트 작성 가이드

### 단위 테스트

```javascript
// tests/services/storageService.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import StorageService from '../../src/services/storageService';

describe('StorageService', () => {
  let storage;

  beforeEach(() => {
    storage = new StorageService();
    localStorage.clear();
  });

  describe('saveCalculation', () => {
    it('should save calculation to localStorage', () => {
      const calc = {
        formula: '2 + 2',
        result: '4',
        category: 'Algebra'
      };

      storage.saveCalculation(calc);
      const history = storage.getHistory();

      expect(history).toHaveLength(1);
      expect(history[0].formula).toBe('2 + 2');
    });
  });
});
```

### 테스트 커버리지 확인

```bash
npm run test:coverage
```

---

## 문서 업데이트

코드 변경 시 관련 문서도 함께 업데이트해주세요:

- `README.md` - 주요 기능 변경 시
- `TECH_SPEC.md` - 기술 스펙 변경 시
- `IMPLEMENTATION_PLAN.md` - 구현 계획 변경 시
- JSDoc 주석 - 모든 공개 API

---

## 질문이 있으신가요?

- GitHub Issues에 질문 등록
- 이메일: your.email@example.com

---

## 감사합니다!

여러분의 기여가 EngCalc Pro를 더 나은 프로젝트로 만듭니다. 🎉
