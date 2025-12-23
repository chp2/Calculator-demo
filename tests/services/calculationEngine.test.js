import { describe, it, expect, beforeEach } from 'vitest';
import CalculationEngine from '../../src/services/calculationEngine.js';

describe('CalculationEngine', () => {
    let engine;

    beforeEach(() => {
        engine = new CalculationEngine();
    });

    describe('기본 사칙연산', () => {
        it('덧셈을 계산해야 함', () => {
            const result = engine.calculate('2 + 2');
            expect(result.value).toBe('4');
            expect(result.error).toBeNull();
        });

        it('뺄셈을 계산해야 함', () => {
            const result = engine.calculate('5 - 3');
            expect(result.value).toBe('2');
            expect(result.error).toBeNull();
        });

        it('곱셈을 계산해야 함', () => {
            const result = engine.calculate('3 * 4');
            expect(result.value).toBe('12');
            expect(result.error).toBeNull();
        });

        it('나눗셈을 계산해야 함', () => {
            const result = engine.calculate('10 / 2');
            expect(result.value).toBe('5');
            expect(result.error).toBeNull();
        });
    });

    describe('고급 함수', () => {
        it('삼각함수 sin을 계산해야 함', () => {
            const result = engine.calculate('sin(30 deg)');
            expect(parseFloat(result.value)).toBeCloseTo(0.5, 5);
            expect(result.error).toBeNull();
        });

        it('지수 연산을 계산해야 함', () => {
            const result = engine.calculate('2^3');
            expect(result.value).toBe('8');
            expect(result.error).toBeNull();
        });

        it('로그를 계산해야 함', () => {
            const result = engine.calculate('log(100, 10)');
            expect(result.value).toBe('2');
            expect(result.error).toBeNull();
        });
    });

    describe('에러 처리', () => {
        it('0으로 나누기 시 에러를 반환해야 함', () => {
            const result = engine.calculate('10 / 0');
            expect(result.value).toBeNull();
            expect(result.error).toBeTruthy();
        });

        it('잘못된 구문 시 에러를 반환해야 함', () => {
            const result = engine.calculate('2 +');
            expect(result.value).toBeNull();
            expect(result.error).toBeTruthy();
        });

        it('정의되지 않은 함수 시 에러를 반환해야 함', () => {
            const result = engine.calculate('unknownFunc(5)');
            expect(result.value).toBeNull();
            expect(result.error).toBeTruthy();
        });
    });

    describe('복잡한 수식', () => {
        it('괄호가 있는 수식을 계산해야 함', () => {
            const result = engine.calculate('(2 + 3) * 4');
            expect(result.value).toBe('20');
            expect(result.error).toBeNull();
        });

        it('중첩 괄호를 처리해야 함', () => {
            const result = engine.calculate('((2 + 3) * 4) / 2');
            expect(result.value).toBe('10');
            expect(result.error).toBeNull();
        });
    });
});
