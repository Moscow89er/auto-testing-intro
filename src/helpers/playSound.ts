import { Mock } from "vitest";

export function playSound(callback: Mock<(...args: any[]) => any>, sound: string) {
    if (sound !== 'silence') {
        callback(sound);
    }
};
