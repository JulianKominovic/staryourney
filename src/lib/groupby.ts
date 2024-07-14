export function groupBy<T, K extends keyof any>(xs: T[], getKey: (i: T) => K) {
  return xs.reduce((r, x) => {
    let key = getKey(x);
    r[key] = [...(r[key] || []), x];
    return r;
  }, {} as Record<K, T[]>);
}
