export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("на ноль делить нельзя!");
  }
  return a / b;
}
