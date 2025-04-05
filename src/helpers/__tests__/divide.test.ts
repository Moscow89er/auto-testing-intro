import { divide } from '../divide';

describe('[divide] функция деления двух чисел', () => {
    describe('тесты с корректными данными', () => {
        test('деление положительных чисел', () => {
            const result = divide(4,2);
            expect(result).toBe(2);
        });

        test('деление отрицательных чисел', () => {
            const result = divide(-4,-2);
            expect(result).toBe(2);
        });
    });

    describe('тесты с некорректными данными', () => {
        test('деление на 0', () => {
            expect(() => divide(4,0)).toThrow();
        });
    });
});
