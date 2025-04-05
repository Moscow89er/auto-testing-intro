import { timer } from '../timer';
import { vi } from 'vitest';

test('тест функции для отложенного выполнения колбека', () => {
    // мокаем функцию setTimeout, чтобы не ожидать 1000ms
    vi.useFakeTimers();
    // следим за выполнением setTimeout
    vi.spyOn(global, 'setTimeout');

    const callback = vi.fn();

    timer(callback);

    // благодаря spyOn можем проверить сколько раз был вызван setTimeout
    expect(setTimeout).toHaveBeenCalledTimes(1);
    // благодаря spyOn можем проверить с какими аргументами был вызван setTimeout
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 1000);
});
