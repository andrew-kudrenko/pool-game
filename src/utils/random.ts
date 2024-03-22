export function randomFromArray<T>(array: T[]) {
  return array[randomInt(0, array.length)];
}

export function randomInt(min: number, max: number) {
  return Math.floor(randomDouble(min, max));
}

export function randomDouble(min: number, max: number) {
  return Math.random() * Math.abs(max - min) + min;
}
