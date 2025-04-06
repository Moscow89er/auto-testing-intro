import { vi } from "vitest";
import { playSound } from "../playSound";

describe("[playSound] проверяем функцию playSound", () => {
  test('проигрываем звук "drum"', () => {
    const soundCallback = vi.fn();
    playSound(soundCallback, "drum");
    // проверяем, что функция soundCallback была вызвана, так как звук не равен "silence"
    expect(soundCallback).toHaveBeenCalled();
  });

  test('не проигрываем "silence"', () => {
    const soundCallback = vi.fn();
    playSound(soundCallback, "silence");
    // проверяем, что функция soundCallback не была вызвана, так как звук равен "silence"
    expect(soundCallback).not.toHaveBeenCalled();
  });
});
