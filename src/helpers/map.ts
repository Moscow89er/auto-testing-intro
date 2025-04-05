export function map(elements: number[], callback: (value: number) => void): void {
    for (let element of elements) {
        callback(element);
    }
};
