import{c as i,D as c,a as d}from"./math-C1eAB1Bg.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();class b{constructor(t=15){this.math=i(d),this.precision=t}calculate(t){try{const n=this.math.evaluate(t);return typeof n=="number"&&!isFinite(n)?{value:null,error:"0으로 나눌 수 없습니다",unit:null}:{value:this.formatResult(n),error:null,unit:this.extractUnit(n)}}catch(n){return{value:null,error:this.parseError(n),unit:null}}}formatResult(t){return typeof t=="number"?new c(t).toSignificantDigits(this.precision).toString():String(t)}extractUnit(t){var n;return((n=t==null?void 0:t.unit)==null?void 0:n.toString())||null}parseError(t){const n={"Undefined symbol":"정의되지 않은 기호입니다","Unexpected end of expression":"수식이 완성되지 않았습니다","Division by zero":"0으로 나눌 수 없습니다","Value expected":"값이 필요합니다"},o=t.message||String(t);for(const[r,s]of Object.entries(n))if(o.includes(r))return s;return"계산 오류가 발생했습니다"}}class p{constructor(){this.engine=new b,this.currentExpression="",this.result=null,this.error=null}input(t){return this.currentExpression+=t,this.error=null,this.currentExpression}delete(){return this.currentExpression=this.currentExpression.slice(0,-1),this.currentExpression}clear(){return this.currentExpression="",this.result=null,this.error=null,""}calculate(){if(!this.currentExpression)return null;const t=this.engine.calculate(this.currentExpression);return t.error?(this.error=t.error,this.result=null):(this.result=t.value,this.error=null),t}getState(){return{expression:this.currentExpression,result:this.result,error:this.error}}}console.log("🧮 EngCalc Pro - Development Mode");const a=new p,f=document.querySelector("#app");function l(){const e=a.getState(),t=document.querySelector("#display"),n=document.querySelector("#result"),o=document.querySelector("#error");t&&(t.textContent=e.expression||"0"),n&&(n.textContent=e.result?`= ${e.result}`:"",n.className=e.result?"text-2xl font-bold text-primary":"text-2xl font-bold text-gray-500"),o&&(o.textContent=e.error||"",o.className=e.error?"text-sm text-red-400 mt-2":"hidden")}function m(e){e==="C"?a.clear():e==="DEL"?a.delete():e==="="?a.calculate():a.input(e),l()}function v(e){const t=e.key;t==="Enter"?(e.preventDefault(),a.calculate(),l()):t==="Backspace"?(e.preventDefault(),a.delete(),l()):t==="Escape"?(e.preventDefault(),a.clear(),l()):/[0-9+\-*/().^]/.test(t)&&(a.input(t),l())}f.innerHTML=`
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
`;document.querySelectorAll("button[data-value]").forEach(e=>{e.addEventListener("click",()=>{m(e.dataset.value)})});document.addEventListener("keydown",v);console.log("✅ App initialized");l();
//# sourceMappingURL=index-DiNzmnTi.js.map
