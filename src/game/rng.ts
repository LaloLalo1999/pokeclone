// RNG utilities
// Provides helpers for weighted random selection and simple wrappers.

export function randInt(min: number, max: number): number {
  // inclusive min/max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function chance(p: number): boolean {
  // p in [0,1]
  return Math.random() < p;
}

export type Weighted<T> = { value: T; weight: number };

export function weightedPick<T>(items: Weighted<T>[]): T {
  const total = items.reduce((s, it) => s + Math.max(0, it.weight), 0);
  if (total <= 0) return items[0].value;
  let r = Math.random() * total;
  for (const it of items) {
    const w = Math.max(0, it.weight);
    if (r < w) return it.value;
    r -= w;
  }
  return items[items.length - 1].value;
}

