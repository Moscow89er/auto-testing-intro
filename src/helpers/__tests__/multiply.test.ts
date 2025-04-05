import { multiply } from '../multiply';

describe('[multiply] функция умножения двух чисел', () => {
    test('умножение положительных чисел', () => {
        const result = multiply(2,4);
        expect(result).toBe(8);
    });
});
