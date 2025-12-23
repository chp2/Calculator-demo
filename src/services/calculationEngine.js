import { create, all } from 'mathjs';
import Decimal from 'decimal.js';

class CalculationEngine {
    constructor(precision = 15) {
        this.math = create(all);
        this.precision = precision;
    }

    /**
     * 수식을 계산합니다
     * @param {string} expression - 계산할 수식
     * @returns {Object} { value, error, unit }
     */
    calculate(expression) {
        try {
            const result = this.math.evaluate(expression);

            // Infinity 체크 (0으로 나누기)
            if (typeof result === 'number' && !isFinite(result)) {
                return {
                    value: null,
                    error: '0으로 나눌 수 없습니다',
                    unit: null
                };
            }

            return {
                value: this.formatResult(result),
                error: null,
                unit: this.extractUnit(result)
            };
        } catch (error) {
            return {
                value: null,
                error: this.parseError(error),
                unit: null
            };
        }
    }

    /**
     * 결과를 포맷팅합니다
     */
    formatResult(value) {
        if (typeof value === 'number') {
            return new Decimal(value)
                .toSignificantDigits(this.precision)
                .toString();
        }
        return String(value);
    }

    /**
     * 단위를 추출합니다
     */
    extractUnit(result) {
        return result?.unit?.toString() || null;
    }

    /**
     * 에러 메시지를 한글화합니다
     */
    parseError(error) {
        const errorMap = {
            'Undefined symbol': '정의되지 않은 기호입니다',
            'Unexpected end of expression': '수식이 완성되지 않았습니다',
            'Division by zero': '0으로 나눌 수 없습니다',
            'Value expected': '값이 필요합니다'
        };

        const message = error.message || String(error);

        // 에러 메시지에서 매칭되는 키 찾기
        for (const [key, value] of Object.entries(errorMap)) {
            if (message.includes(key)) {
                return value;
            }
        }

        return '계산 오류가 발생했습니다';
    }
}

export default CalculationEngine;
