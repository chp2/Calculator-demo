import './styles/index.css';
import Calculator from './components/Calculator/Calculator.js';

console.log('🧮 EngCalc Pro - Development Mode');

// Calculator 인스턴스 생성
const calculator = new Calculator();

// App container
const app = document.querySelector('#app');

// 화면 업데이트 함수
function updateDisplay() {
  const state = calculator.getState();
  const displayEl = document.querySelector('#display');
  const resultEl = document.querySelector('#result');
  const errorEl = document.querySelector('#error');

  if (displayEl) {
    displayEl.textContent = state.expression || '0';
  }

  if (resultEl) {
    resultEl.textContent = state.result ? `= ${state.result}` : '';
    resultEl.className = state.result ? 'text-2xl font-bold text-primary' : 'text-2xl font-bold text-gray-500';
  }

  if (errorEl) {
    errorEl.textContent = state.error || '';
    errorEl.className = state.error ? 'text-sm text-red-400 mt-2' : 'hidden';
  }
}

// 버튼 클릭 핸들러
function handleButtonClick(value) {
  if (value === 'C') {
    calculator.clear();
  } else if (value === 'DEL') {
    calculator.delete();
  } else if (value === '=') {
    calculator.calculate();
  } else {
    calculator.input(value);
  }
  updateDisplay();
}

// 키보드 입력 핸들러
function handleKeyPress(e) {
  const key = e.key;

  if (key === 'Enter') {
    e.preventDefault();
    calculator.calculate();
    updateDisplay();
  } else if (key === 'Backspace') {
    e.preventDefault();
    calculator.delete();
    updateDisplay();
  } else if (key === 'Escape') {
    e.preventDefault();
    calculator.clear();
    updateDisplay();
  } else if (/[0-9+\-*/().^]/.test(key)) {
    calculator.input(key);
    updateDisplay();
  }
}

// UI 렌더링
app.innerHTML = `
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 flex items-center justify-between border-b border-border-dark bg-background-dark/90 backdrop-blur-md px-6 py-3">
      <div class="flex items-center gap-4 text-white">
        <span class="material-symbols-outlined text-4xl text-primary">calculate</span>
        <h1 class="text-xl font-bold">EngCalc Pro</h1>
      </div>
      <nav class="hidden md:flex items-center gap-6">
        <a href="#" class="text-primary font-bold border-b-2 border-primary pb-1">Calculator</a>
        <a href="#" class="text-text-secondary hover:text-white transition-colors">History</a>
        <a href="#" class="text-text-secondary hover:text-white transition-colors">Settings</a>
      </nav>
    </header>
    
    <!-- Main Calculator -->
    <main class="flex-1 flex items-center justify-center p-4 md:p-8">
      <div class="w-full max-w-md">
        <!-- Display -->
        <div class="bg-card-dark rounded-xl p-6 mb-4 border border-border-dark">
          <div class="text-right">
            <div id="display" class="text-3xl font-mono text-white mb-2 min-h-[2.5rem] break-all">0</div>
            <div id="result" class="text-2xl font-bold text-gray-500"></div>
            <div id="error" class="hidden"></div>
          </div>
        </div>
        
        <!-- Keypad -->
        <div class="grid grid-cols-4 gap-2">
          <!-- Row 1 -->
          <button class="btn-secondary" data-value="C">C</button>
          <button class="btn-secondary" data-value="DEL">DEL</button>
          <button class="btn-secondary" data-value="(">(</button>
          <button class="btn-secondary" data-value=")">)</button>
          
          <!-- Row 2 -->
          <button class="btn-number" data-value="7">7</button>
          <button class="btn-number" data-value="8">8</button>
          <button class="btn-number" data-value="9">9</button>
          <button class="btn-operator" data-value="/">÷</button>
          
          <!-- Row 3 -->
          <button class="btn-number" data-value="4">4</button>
          <button class="btn-number" data-value="5">5</button>
          <button class="btn-number" data-value="6">6</button>
          <button class="btn-operator" data-value="*">×</button>
          
          <!-- Row 4 -->
          <button class="btn-number" data-value="1">1</button>
          <button class="btn-number" data-value="2">2</button>
          <button class="btn-number" data-value="3">3</button>
          <button class="btn-operator" data-value="-">−</button>
          
          <!-- Row 5 -->
          <button class="btn-number" data-value="0">0</button>
          <button class="btn-number" data-value=".">.</button>
          <button class="btn-primary" data-value="=">=</button>
          <button class="btn-operator" data-value="+">+</button>
          
          <!-- Row 6 - Advanced Functions -->
          <button class="btn-function" data-value="sin(">sin</button>
          <button class="btn-function" data-value="cos(">cos</button>
          <button class="btn-function" data-value="tan(">tan</button>
          <button class="btn-function" data-value="^">x^y</button>
          
          <!-- Row 7 -->
          <button class="btn-function" data-value="sqrt(">√</button>
          <button class="btn-function" data-value="log(">log</button>
          <button class="btn-function" data-value="ln(">ln</button>
          <button class="btn-function" data-value="pi">π</button>
        </div>
        
        <!-- Keyboard Hint -->
        <div class="mt-4 text-center text-text-secondary text-sm">
          <p>💡 Tip: 키보드로도 입력 가능 (Enter: 계산, Esc: 초기화)</p>
        </div>
      </div>
    </main>
  </div>
`;

// 이벤트 리스너 등록
document.querySelectorAll('button[data-value]').forEach(button => {
  button.addEventListener('click', () => {
    handleButtonClick(button.dataset.value);
  });
});

document.addEventListener('keydown', handleKeyPress);

console.log('✅ App initialized');
updateDisplay();
