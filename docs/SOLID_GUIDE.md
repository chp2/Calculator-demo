# SOLID 원칙 가이드

## 개요
이 프로젝트의 모든 코어 로직은 **SOLID 원칙**을 준수하여 구현합니다.
유지보수성, 확장성, 테스트 용이성을 극대화하기 위해 5가지 객체지향 설계 원칙을 따릅니다.

---

## SOLID 원칙

### 1️⃣ SRP (Single Responsibility Principle) - 단일 책임 원칙

**"클래스는 하나의 책임만 가져야 한다"**

#### ✅ Good Example
```javascript
// 각 클래스가 하나의 책임만 가짐
class CalculationEngine {
  calculate(expression) {
    // 계산만 담당
  }
}

class StorageService {
  save(data) {
    // 저장만 담당
  }
}

class CategoryService {
  detectCategory(formula) {
    // 카테고리 분류만 담당
  }
}
```

#### ❌ Bad Example
```javascript
// 하나의 클래스가 여러 책임을 가짐
class Calculator {
  calculate(expression) { }
  saveToStorage(data) { }
  detectCategory(formula) { }
  exportToCSV(data) { }
}
```

---

### 2️⃣ OCP (Open-Closed Principle) - 개방-폐쇄 원칙

**"확장에는 열려있고, 수정에는 닫혀있어야 한다"**

#### ✅ Good Example
```javascript
// 기본 Formatter
class NumberFormatter {
  format(value) {
    return String(value);
  }
}

// 확장: 새로운 포맷터 추가 (기존 코드 수정 없음)
class ThousandSeparatorFormatter extends NumberFormatter {
  format(value) {
    return value.toLocaleString();
  }
}

class ScientificFormatter extends NumberFormatter {
  format(value) {
    return value.toExponential();
  }
}
```

#### ❌ Bad Example
```javascript
// 새로운 포맷 추가 시 기존 코드 수정 필요
class NumberFormatter {
  format(value, type) {
    if (type === 'thousand') {
      return value.toLocaleString();
    } else if (type === 'scientific') {
      return value.toExponential();
    }
    return String(value);
  }
}
```

---

### 3️⃣ LSP (Liskov Substitution Principle) - 리스코프 치환 원칙

**"하위 타입은 상위 타입을 대체할 수 있어야 한다"**

#### ✅ Good Example
```javascript
class Storage {
  save(key, value) {
    throw new Error('Must implement save()');
  }
  
  load(key) {
    throw new Error('Must implement load()');
  }
}

class LocalStorage extends Storage {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  load(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

class IndexedDBStorage extends Storage {
  save(key, value) {
    // IndexedDB 저장 로직
  }
  
  load(key) {
    // IndexedDB 로드 로직
  }
}

// 어떤 Storage든 동일하게 사용 가능
function saveData(storage, key, value) {
  storage.save(key, value);
}
```

---

### 4️⃣ ISP (Interface Segregation Principle) - 인터페이스 분리 원칙

**"클라이언트는 사용하지 않는 인터페이스에 의존하지 않아야 한다"**

#### ✅ Good Example
```javascript
// 작은 인터페이스로 분리
class Readable {
  read() { }
}

class Writable {
  write(data) { }
}

class Deletable {
  delete(id) { }
}

// 필요한 인터페이스만 구현
class ReadOnlyStorage extends Readable {
  read() {
    return localStorage.getItem('data');
  }
}

class FullStorage extends Readable {
  read() { }
}

class FullStorageWritable extends Writable {
  write(data) { }
}

class FullStorageDeletable extends Deletable {
  delete(id) { }
}
```

#### ❌ Bad Example
```javascript
// 모든 메서드를 강제하는 큰 인터페이스
class Storage {
  read() { }
  write(data) { }
  delete(id) { }
  update(id, data) { }
}

// 읽기만 필요한데 모든 메서드 구현 필요
class ReadOnlyStorage extends Storage {
  read() { return data; }
  write(data) { throw new Error('Not supported'); }
  delete(id) { throw new Error('Not supported'); }
  update(id, data) { throw new Error('Not supported'); }
}
```

---

### 5️⃣ DIP (Dependency Inversion Principle) - 의존성 역전 원칙

**"고수준 모듈은 저수준 모듈에 의존하지 않아야 한다. 둘 다 추상화에 의존해야 한다"**

#### ✅ Good Example
```javascript
// 추상화 (인터페이스)
class ICalculationEngine {
  calculate(expression) {
    throw new Error('Must implement');
  }
}

// 저수준 모듈
class MathJsEngine extends ICalculationEngine {
  calculate(expression) {
    return this.math.evaluate(expression);
  }
}

class CustomEngine extends ICalculationEngine {
  calculate(expression) {
    // 커스텀 계산 로직
  }
}

// 고수준 모듈 (추상화에 의존)
class Calculator {
  constructor(engine) {
    this.engine = engine; // ICalculationEngine 타입
  }
  
  compute(expression) {
    return this.engine.calculate(expression);
  }
}

// 사용
const calculator = new Calculator(new MathJsEngine());
```

#### ❌ Bad Example
```javascript
// 고수준 모듈이 저수준 모듈에 직접 의존
class Calculator {
  constructor() {
    this.mathJs = new MathJsEngine(); // 구체적인 구현에 의존
  }
  
  compute(expression) {
    return this.mathJs.evaluate(expression);
  }
}
```

---

## 실전 적용 예제

### CalculationEngine (SRP + DIP)
```javascript
// 추상화
class ICalculationEngine {
  calculate(expression) { }
}

// 구현 (단일 책임: 계산만)
class MathJsCalculationEngine extends ICalculationEngine {
  constructor() {
    super();
    this.math = create(all);
  }
  
  calculate(expression) {
    return this.math.evaluate(expression);
  }
}

// 사용
class Calculator {
  constructor(engine) {
    this.engine = engine; // DIP: 추상화에 의존
  }
  
  compute(expression) {
    return this.engine.calculate(expression);
  }
}
```

### StorageService (SRP + LSP)
```javascript
// 추상 Storage
class IStorage {
  save(key, value) { }
  load(key) { }
}

// LocalStorage 구현
class LocalStorageAdapter extends IStorage {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  load(key) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }
}

// IndexedDB 구현 (LSP: LocalStorage와 교체 가능)
class IndexedDBAdapter extends IStorage {
  save(key, value) {
    // IndexedDB 저장
  }
  
  load(key) {
    // IndexedDB 로드
  }
}
```

### Formatter (OCP)
```javascript
// 기본 Formatter
class Formatter {
  format(value) {
    return String(value);
  }
}

// 확장 가능한 구조
class DecimalFormatter extends Formatter {
  constructor(precision) {
    super();
    this.precision = precision;
  }
  
  format(value) {
    return new Decimal(value).toFixed(this.precision);
  }
}

class PercentageFormatter extends Formatter {
  format(value) {
    return `${(value * 100).toFixed(2)}%`;
  }
}

// 새로운 포맷터 추가 시 기존 코드 수정 불필요
class CurrencyFormatter extends Formatter {
  format(value) {
    return `$${value.toLocaleString()}`;
  }
}
```

---

## 체크리스트

새로운 클래스/모듈을 작성할 때:

- [ ] **SRP**: 이 클래스는 하나의 책임만 가지는가?
- [ ] **OCP**: 새로운 기능 추가 시 기존 코드를 수정하지 않아도 되는가?
- [ ] **LSP**: 하위 클래스가 상위 클래스를 완전히 대체할 수 있는가?
- [ ] **ISP**: 클라이언트가 사용하지 않는 메서드를 강제하지 않는가?
- [ ] **DIP**: 구체적인 구현이 아닌 추상화에 의존하는가?

---

## 참고 자료

- [Clean Code (Robert C. Martin)](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
