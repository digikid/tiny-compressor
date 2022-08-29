export const findDeep = <T extends Record<string, any>>(obj: T, cb: (obj: T) => boolean): T[] => {
  const keys = (Object.keys(obj) as (keyof typeof obj)[]) || [];

  let result: T[] = [];

  if (cb(obj)) {
    result = [...result, obj];
  }

  for (let i = 0; i < keys.length; i++) {
    const value = obj[keys[i]];

    if (typeof value === 'object' && value != null) {
      const o = findDeep(value as any, cb);

      if (o != null && Array.isArray(o)) {
        result = [...result, ...o];
      }
    }
  }

  return result;
};

export const sortByKey = <T>(
  arr: T[],
  key: keyof T,
  reverse: boolean = false,
): T[] => {
  const result = [...arr].sort((a, b) => {
    const valueA = +a[key] || 0;
    const valueB = +b[key] || 0;

    if (valueA < valueB) {
      return -1;
    }

    if (valueA > valueB) {
      return 1;
    }

    return 0;
  });

  return reverse ? result.reverse() : result;
};
