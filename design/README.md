# Design Files

이 디렉토리에는 EngCalc Pro의 UI/UX 디자인 참고 자료가 포함되어 있습니다.

## 파일 목록

### 1. screen.png
- **설명**: 계산 히스토리 페이지의 완성된 디자인 스크린샷
- **용도**: UI 구현 시 참고 자료
- **주요 특징**:
  - 다크 모드 중심 디자인
  - 3단 레이아웃 (헤더 + 사이드바 + 메인)
  - 카테고리별 컬러 코딩
  - 반응형 디자인

### 2. code.html
- **설명**: Tailwind CSS로 작성된 HTML 프로토타입
- **용도**: 컴포넌트 구조 및 스타일링 참고
- **주요 컴포넌트**:
  - Header with Navigation
  - Sidebar with Filters
  - History List with Cards
  - Search and Filter Toolbar

## 디자인 시스템

### 컬러 팔레트
```
Primary: #137fec
Background (Dark): #101922
Card (Dark): #1c2936
Border (Dark): #2a3c4d
Text Secondary: #92adc9
```

### 타이포그래피
- Display: Space Grotesk
- Body: Noto Sans

### 카테고리 컬러
- Algebra: #a855f7 (Purple)
- Structural: #3b82f6 (Blue)
- Electrical: #eab308 (Yellow)
- Physics: #ec4899 (Pink)
- Calculus: #9333ea (Purple)
- Trigonometry: #f97316 (Orange)
- Finance: #22c55e (Green)

## 사용 방법

1. **screen.png**: 전체적인 레이아웃과 디자인 방향성 파악
2. **code.html**: 브라우저에서 열어 실제 동작하는 프로토타입 확인
3. 구현 시 PRD.md와 TECH_SPEC.md를 함께 참고

## 참고 문서

- [PRD.md](../PRD.md) - 제품 요구사항 정의서
- [TECH_SPEC.md](../TECH_SPEC.md) - 기술 명세서
