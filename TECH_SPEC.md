# EngCalc Pro - Technical Specification
## 기술 명세서

---

## 📋 문서 정보

- **프로젝트명**: EngCalc Pro
- **버전**: 1.0.0
- **작성일**: 2024년 12월 23일
- **관련 문서**: [PRD.md](./PRD.md)

---

## 1. 기술 스택 개요

### 1.1 프론트엔드
```yaml
Framework: Vanilla JavaScript (ES6+)
Styling: Tailwind CSS 3.x
Icons: Material Symbols Outlined
Fonts: Space Grotesk, Noto Sans (Google Fonts)
Build Tool: Vite 5.x
Package Manager: npm
```

### 1.2 계산 엔진
```yaml
Math Library: Math.js v12.x
Precision: Decimal.js v10.x
Unit Conversion: Math.js units module
```

### 1.3 데이터 저장
```yaml
Primary: LocalStorage (Web Storage API)
Backup: IndexedDB (Phase 2)
Format: JSON
```

### 1.4 배포 & CI/CD
```yaml
Build: GitHub Actions
Hosting: GitHub Pages
Domain: Custom domain (선택사항)
SSL: GitHub Pages 기본 제공
```

---

## 2. 프로젝트 구조

```
Calculator-demo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 배포 워크플로우
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── Calculator/
│   │   │   ├── Calculator.js
│   │   │   ├── Display.js
│   │   │   └── Keypad.js
│   │   ├── History/
│   │   │   ├── HistoryList.js
│   │   │   ├── HistoryCard.js
│   │   │   ├── HistoryFilters.js
│   │   │   └── SearchBar.js
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.js
│   │   │   ├── QuickActions.js
│   │   │   └── CategoryFilter.js
│   │   ├── Header/
│   │   │   ├── Header.js
│   │   │   └── Navigation.js
│   │   └── Common/
│   │       ├── Button.js
│   │       ├── Modal.js
│   │       └── Toast.js
│   ├── services/
│   │   ├── calculationEngine.js   # Math.js 래퍼
│   │   ├── storageService.js      # LocalStorage 관리
│   │   ├── categoryService.js     # 카테고리 분류
│   │   └── exportService.js       # CSV Export
│   ├── utils/
│   │   ├── formatters.js          # 숫자/날짜 포맷팅
│   │   ├── validators.js          # 입력 검증
│   │   └── constants.js           # 상수 정의
│   ├── styles/
│   │   ├── index.css              # Tailwind 설정
│   │   └── custom.css             # 커스텀 스타일
│   ├── main.js                    # 앱 진입점
│   └── router.js                  # 클라이언트 라우팅
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── PRD.md
├── TECH_SPEC.md
└── README.md
```

---

## 3. 핵심 모듈 설계

### 3.1 계산 엔진 (calculationEngine.js)

```javascript
// services/calculationEngine.js
import { create, all } from 'mathjs';
import Decimal from 'decimal.js';

class CalculationEngine {
  constructor() {
    this.math = create(all);
    this.precision = 15;
  }

  /**
   * 수식 계산
   * @param {string} expression - 수학 표현식
   * @returns {Object} { result, error, unit }
   */
  calculate(expression) {
    try {
      const result = this.math.evaluate(expression);
      return {
        result: this.formatResult(result),
        error: null,
        unit: this.extractUnit(result)
      };
    } catch (error) {
      return {
        result: null,
        error: this.parseError(error),
        unit: null
      };
    }
  }

  formatResult(value) {
    if (typeof value === 'number') {
      return new Decimal(value).toSignificantDigits(this.precision).toString();
    }
    return value.toString();
  }

  extractUnit(result) {
    // Math.js unit 추출 로직
    return result.unit ? result.unit.toString() : null;
  }

  parseError(error) {
    // 사용자 친화적 에러 메시지 변환
    const errorMap = {
      'Undefined symbol': '정의되지 않은 기호입니다',
      'Unexpected end of expression': '수식이 완성되지 않았습니다',
      'Division by zero': '0으로 나눌 수 없습니다'
    };
    return errorMap[error.message] || '계산 오류가 발생했습니다';
  }
}

export default new CalculationEngine();
```

### 3.2 스토리지 서비스 (storageService.js)

```javascript
// services/storageService.js
class StorageService {
  constructor() {
    this.HISTORY_KEY = 'engcalc_history';
    this.SETTINGS_KEY = 'engcalc_settings';
    this.MAX_HISTORY = 1000;
  }

  /**
   * 계산 히스토리 저장
   */
  saveCalculation(calculation) {
    const history = this.getHistory();
    const newEntry = {
      id: this.generateId(),
      formula: calculation.formula,
      result: calculation.result,
      category: calculation.category,
      unit: calculation.unit,
      timestamp: new Date().toISOString()
    };
    
    history.unshift(newEntry);
    
    // 최대 개수 제한
    if (history.length > this.MAX_HISTORY) {
      history.pop();
    }
    
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
    return newEntry;
  }

  /**
   * 히스토리 조회
   */
  getHistory(filters = {}) {
    const history = JSON.parse(localStorage.getItem(this.HISTORY_KEY) || '[]');
    return this.applyFilters(history, filters);
  }

  /**
   * 필터 적용
   */
  applyFilters(history, filters) {
    let filtered = [...history];

    // 날짜 필터
    if (filters.dateRange) {
      filtered = this.filterByDate(filtered, filters.dateRange);
    }

    // 카테고리 필터
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    // 검색어 필터
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.formula.toLowerCase().includes(query) ||
        item.result.toLowerCase().includes(query)
      );
    }

    // 정렬
    if (filters.sortBy) {
      filtered = this.sortHistory(filtered, filters.sortBy);
    }

    return filtered;
  }

  filterByDate(history, dateRange) {
    const now = new Date();
    const ranges = {
      'today': () => this.isToday(new Date(item.timestamp)),
      'last7days': () => this.isWithinDays(new Date(item.timestamp), 7),
      'thisMonth': () => this.isThisMonth(new Date(item.timestamp))
    };
    
    return history.filter(item => ranges[dateRange]?.() || true);
  }

  sortHistory(history, sortBy) {
    const sorters = {
      'newest': (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
      'oldest': (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      'highest': (a, b) => parseFloat(b.result) - parseFloat(a.result),
      'lowest': (a, b) => parseFloat(a.result) - parseFloat(b.result)
    };
    return history.sort(sorters[sortBy] || sorters.newest);
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // 설정 관리
  getSettings() {
    return JSON.parse(localStorage.getItem(this.SETTINGS_KEY) || '{}');
  }

  saveSettings(settings) {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  }
}

export default new StorageService();
```

### 3.3 카테고리 서비스 (categoryService.js)

```javascript
// services/categoryService.js
class CategoryService {
  constructor() {
    this.categories = {
      'Algebra': {
        keywords: ['x', 'y', 'solve', 'equation', '^'],
        color: '#a855f7',
        icon: 'functions'
      },
      'Calculus': {
        keywords: ['∫', 'derivative', 'integral', 'dx', 'dy'],
        color: '#9333ea',
        icon: 'functions'
      },
      'Trigonometry': {
        keywords: ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', '°'],
        color: '#f97316',
        icon: 'architecture'
      },
      'Physics': {
        keywords: ['F', 'm', 'a', 'v', 'kg', 'm/s', 'N', 'J'],
        color: '#ec4899',
        icon: 'science'
      },
      'Structural': {
        keywords: ['stress', 'strain', 'MPa', 'Pa', 'beam'],
        color: '#3b82f6',
        icon: 'architecture'
      },
      'Electrical': {
        keywords: ['V', 'A', 'Ω', 'W', 'voltage', 'current'],
        color: '#eab308',
        icon: 'bolt'
      },
      'Finance': {
        keywords: ['PV', 'FV', 'NPV', 'IRR', '$', '%'],
        color: '#22c55e',
        icon: 'payments'
      }
    };
  }

  /**
   * 수식에서 카테고리 자동 감지
   */
  detectCategory(formula) {
    for (const [category, config] of Object.entries(this.categories)) {
      if (config.keywords.some(keyword => formula.includes(keyword))) {
        return category;
      }
    }
    return 'General';
  }

  getCategoryConfig(category) {
    return this.categories[category] || {
      color: '#6b7280',
      icon: 'calculate'
    };
  }

  getAllCategories() {
    return Object.keys(this.categories);
  }
}

export default new CategoryService();
```

### 3.4 Export 서비스 (exportService.js)

```javascript
// services/exportService.js
class ExportService {
  /**
   * CSV로 히스토리 내보내기
   */
  exportToCSV(history) {
    const headers = ['Date', 'Time', 'Category', 'Formula', 'Result', 'Unit'];
    const rows = history.map(item => {
      const date = new Date(item.timestamp);
      return [
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        item.category,
        `"${item.formula}"`,
        item.result,
        item.unit || ''
      ];
    });

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    this.downloadFile(csv, 'engcalc-history.csv', 'text/csv');
  }

  /**
   * JSON으로 내보내기
   */
  exportToJSON(history) {
    const json = JSON.stringify(history, null, 2);
    this.downloadFile(json, 'engcalc-history.json', 'application/json');
  }

  /**
   * 파일 다운로드
   */
  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * CSV 파일 가져오기
   */
  importFromCSV(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csv = e.target.result;
          const lines = csv.split('\n');
          const headers = lines[0].split(',');
          
          const data = lines.slice(1).map(line => {
            const values = line.split(',');
            return {
              timestamp: new Date(`${values[0]} ${values[1]}`).toISOString(),
              category: values[2],
              formula: values[3].replace(/"/g, ''),
              result: values[4],
              unit: values[5] || null
            };
          });
          
          resolve(data);
        } catch (error) {
          reject(new Error('CSV 파일 형식이 올바르지 않습니다'));
        }
      };
      reader.readAsText(file);
    });
  }
}

export default new ExportService();
```

---

## 4. 데이터 모델

### 4.1 History Entry
```typescript
interface HistoryEntry {
  id: string;                    // UUID
  formula: string;               // "sin(30°) + cos(60°)"
  result: string;                // "1.0"
  category: string;              // "Trigonometry"
  unit: string | null;           // "Pa", "N", null
  timestamp: string;             // ISO 8601
  tags?: string[];               // 사용자 정의 태그 (Phase 2)
}
```

### 4.2 Settings
```typescript
interface Settings {
  theme: 'dark' | 'light';       // 테마
  decimalPlaces: number;         // 소수점 자릿수 (2-15)
  angleUnit: 'degree' | 'radian'; // 각도 단위
  language: 'ko' | 'en';         // 언어
  autoSave: boolean;             // 자동 저장
}
```

### 4.3 Filter State
```typescript
interface FilterState {
  dateRange: 'all' | 'today' | 'last7days' | 'thisMonth';
  category: string | null;
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'highest' | 'lowest';
  viewMode: 'list' | 'grid';
}
```

---

## 5. API 설계 (내부 모듈)

### 5.1 Calculator API
```javascript
// 계산 실행
calculator.calculate(expression: string): Promise<CalculationResult>

// 히스토리 추가
calculator.addToHistory(calculation: Calculation): void

// 마지막 계산 가져오기
calculator.getLastCalculation(): Calculation | null
```

### 5.2 Storage API
```javascript
// 히스토리 CRUD
storage.saveCalculation(calc: Calculation): HistoryEntry
storage.getHistory(filters?: FilterState): HistoryEntry[]
storage.deleteHistory(id: string): void
storage.clearAllHistory(): void

// 설정 관리
storage.getSettings(): Settings
storage.saveSettings(settings: Settings): void
```

### 5.3 Export API
```javascript
// 내보내기
export.toCSV(history: HistoryEntry[]): void
export.toJSON(history: HistoryEntry[]): void

// 가져오기
export.fromCSV(file: File): Promise<HistoryEntry[]>
export.fromJSON(file: File): Promise<HistoryEntry[]>
```

---

## 6. UI 컴포넌트 설계

### 6.1 컴포넌트 계층 구조
```
App
├── Header
│   ├── Logo
│   ├── Navigation
│   └── UserProfile
├── Sidebar (Desktop)
│   ├── QuickActions
│   ├── DateFilter
│   ├── CategoryFilter
│   └── ProTip
├── MainContent
│   ├── Calculator (Page)
│   │   ├── Display
│   │   └── Keypad
│   └── History (Page)
│       ├── SearchBar
│       ├── FilterToolbar
│       ├── ActiveFilters
│       └── HistoryList
│           └── HistoryCard[]
└── Toast (Global)
```

### 6.2 주요 컴포넌트 Props

#### HistoryCard
```javascript
{
  id: string,
  formula: string,
  result: string,
  category: string,
  timestamp: string,
  unit: string | null,
  onRestore: (id) => void,
  onCopy: (id) => void,
  onEdit: (id) => void,
  onDelete: (id) => void
}
```

#### SearchBar
```javascript
{
  value: string,
  onChange: (query) => void,
  placeholder: string,
  onKeyboardShortcut: () => void  // Cmd+K
}
```

---

## 7. 스타일링 가이드

### 7.1 Tailwind 설정 (tailwind.config.js)
```javascript
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#137fec',
        'background-light': '#f6f7f8',
        'background-dark': '#101922',
        'card-dark': '#1c2936',
        'border-dark': '#2a3c4d',
        'text-secondary': '#92adc9',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

### 7.2 커스텀 CSS (custom.css)
```css
/* 스크롤바 커스터마이징 */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #101922;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #2a3c4d;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #137fec;
}

/* 애니메이션 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.2s ease-in-out;
}
```

---

## 8. 빌드 & 배포

### 8.1 Vite 설정 (vite.config.js)
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Calculator-demo/',  // GitHub Pages base path
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'math': ['mathjs', 'decimal.js']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

### 8.2 GitHub Actions (.github/workflows/deploy.yml)
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 8.3 Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js",
    "format": "prettier --write \"src/**/*.{js,css,html}\""
  }
}
```

---

## 9. 성능 최적화

### 9.1 번들 최적화
- **Code Splitting**: Math.js를 별도 청크로 분리
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Minification**: Terser로 압축

### 9.2 렌더링 최적화
- **Virtual Scrolling**: 대량 히스토리 항목 처리
- **Debouncing**: 검색 입력 디바운싱 (300ms)
- **Lazy Loading**: 이미지 및 컴포넌트 지연 로딩

### 9.3 캐싱 전략
```javascript
// Service Worker (Phase 2)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('engcalc-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/index.css',
        '/assets/index.js'
      ]);
    })
  );
});
```

---

## 10. 테스트 전략

### 10.1 단위 테스트 (Vitest)
```javascript
// tests/calculationEngine.test.js
import { describe, it, expect } from 'vitest';
import calculationEngine from '../src/services/calculationEngine';

describe('CalculationEngine', () => {
  it('should calculate basic arithmetic', () => {
    const result = calculationEngine.calculate('2 + 2');
    expect(result.result).toBe('4');
    expect(result.error).toBeNull();
  });

  it('should handle trigonometric functions', () => {
    const result = calculationEngine.calculate('sin(30 deg)');
    expect(parseFloat(result.result)).toBeCloseTo(0.5, 5);
  });

  it('should return error for invalid expression', () => {
    const result = calculationEngine.calculate('2 +');
    expect(result.error).toBeTruthy();
  });
});
```

### 10.2 UI 테스트 (수동)
UI 컴포넌트는 자동화 테스트 대신 **수동 테스트**로 진행합니다.

#### 테스트 체크리스트
```markdown
## Calculator 페이지
- [ ] 모든 버튼 클릭 동작
- [ ] 키보드 입력 (숫자, 연산자, Enter, Backspace, Escape)
- [ ] 계산 결과 정확성
- [ ] 에러 메시지 표시
- [ ] 히스토리 자동 저장

## History 페이지
- [ ] 검색 기능 (디바운싱 확인)
- [ ] 필터링 (날짜, 카테고리)
- [ ] 정렬 (최신순, 오래된순, 높은순, 낮은순)
- [ ] Export CSV 다운로드
- [ ] Copy, Edit, Delete, Restore 버튼

## 반응형
- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)

## 크로스 브라우저
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
```

---

## 11. 보안 고려사항

### 11.1 입력 검증
```javascript
// utils/validators.js
export function sanitizeInput(input) {
  // XSS 방지: HTML 태그 제거
  return input.replace(/<[^>]*>/g, '');
}

export function validateExpression(expression) {
  // 허용된 문자만 포함하는지 확인
  const allowedChars = /^[0-9+\-*/().\s°πe,a-z]+$/i;
  return allowedChars.test(expression);
}
```

### 11.2 CSP (Content Security Policy)
```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com;">
```

---

## 12. 모니터링 & 로깅

### 12.1 에러 추적
```javascript
// utils/errorLogger.js
class ErrorLogger {
  log(error, context) {
    console.error('[EngCalc Error]', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    });
    
    // Phase 2: Sentry 등 외부 서비스 연동
  }
}

export default new ErrorLogger();
```

### 12.2 사용자 분석 (Phase 2)
- Google Analytics 4
- 계산 횟수, 카테고리 사용률 추적
- 사용자 플로우 분석

---

## 13. 개발 워크플로우

### 13.1 브랜치 전략
```
main (production)
  └── develop
       ├── feature/calculator-ui
       ├── feature/history-page
       └── feature/export-csv
```

### 13.2 커밋 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드 설정 등
```

---

## 14. 의존성 목록

### 14.1 Production Dependencies
```json
{
  "mathjs": "^12.0.0",
  "decimal.js": "^10.4.0"
}
```

### 14.2 Development Dependencies
```json
{
  "vite": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "@tailwindcss/forms": "^0.5.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "vitest": "^1.0.0",
  "eslint": "^8.55.0",
  "prettier": "^3.1.0"
}
```

---

## 부록: 참고 자료

- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Math.js](https://mathjs.org/)
- [GitHub Pages Deployment](https://docs.github.com/en/pages)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

---

**문서 종료**
