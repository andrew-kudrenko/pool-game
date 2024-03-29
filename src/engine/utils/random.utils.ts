export function randomFromArray<T>(array: T[]) {
  return array[randomInt(0, array.length)];
}

export function randomInt(from: number, to: number) {
  return Math.floor(randomDouble(from, to));
}

export function randomDouble(from: number, to: number) {
  return Math.random() * Math.abs(to - from) + Math.min(from, to);
}
