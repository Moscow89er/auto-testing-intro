import { vi } from "vitest";
import { map } from '../map';

test('тест функции map', () => {
    // создаём функцию-заглушку с реализацией
    const callback = vi.fn((element) => element * 2);

    map([1, 2, 3], callback);

    // проверяем, что заглушка callback была вызвана 3 раза – для каждого элемента массива
    expect(callback.mock.calls).toHaveLength(3);
    // тоже проверяем, что callback был вызван трижды, но в другой записи
    expect(callback).toHaveBeenCalledTimes(3);

    // проверяем, что результат первого вызова равен 2
    expect(callback.mock.results[0].value).toBe(2);

    // проверяем, что результат второго вызова равен 4
    expect(callback.mock.results[1].value).toBe(4);

    // проверяем, что результат третьего вызова равен 6
    expect(callback.mock.results[2].value).toBe(6);
});
