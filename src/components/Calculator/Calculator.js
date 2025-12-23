import CalculationEngine from '../services/calculationEngine.js';

class Calculator {
    constructor() {
        this.engine = new CalculationEngine();
        this.currentExpression = '';
        this.result = null;
        this.error = null;
    }

    /**
     * 숫자나 연산자를 입력합니다
     */
    input(value) {
        this.currentExpression += value;
        this.error = null;
        return this.currentExpression;
    }

    /**
     * 마지막 문자를 삭제합니다
     */
    delete() {
        this.currentExpression = this.currentExpression.slice(0, -1);
        return this.currentExpression;
    }

    /**
     * 전체를 삭제합니다
     */
    clear() {
        this.currentExpression = '';
        this.result = null;
        this.error = null;
        return '';
    }

    /**
     * 계산을 실행합니다
     */
    calculate() {
        if (!this.currentExpression) {
            return null;
        }

        const result = this.engine.calculate(this.currentExpression);

        if (result.error) {
            this.error = result.error;
            this.result = null;
        } else {
            this.result = result.value;
            this.error = null;
        }

        return result;
    }

    /**
     * 현재 상태를 반환합니다
     */
    getState() {
        return {
            expression: this.currentExpression,
            result: this.result,
            error: this.error
        };
    }
}

export default Calculator;
