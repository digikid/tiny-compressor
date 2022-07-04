const TIME_INSTANT = 'очень быстро';

const TIME_FORMAT = {
  days: {
    title: 'дн',
    duration: 1000 * 60 * 60 * 24,
  },
  hours: {
    title: 'ч',
    duration: 1000 * 60 * 60,
  },
  minutes: {
    title: 'мин',
    duration: 1000 * 60,
  },
  seconds: {
    title: 'сек',
    duration: 1000,
  },
  milliseconds: {
    title: 'мс',
    duration: 1,
  },
} as const;

export type TimeFormatType = {
  [key in keyof typeof TIME_FORMAT]: typeof TIME_FORMAT[key];
};

export type TimeFormatKeysType = (keyof typeof TIME_FORMAT)[];

export type ParsedTimeType = Record<keyof typeof TIME_FORMAT, number>;

export const getTimestamp = (): number => new Date().getTime();

export const parseTime = (ms: number): ParsedTimeType => {
  let remain = ms;

  return (Object.keys(TIME_FORMAT) as TimeFormatKeysType).reduce((acc, key) => {
    const { duration } = TIME_FORMAT[key];

    if (key === 'milliseconds') {
      acc[key] = remain;
    } else {
      acc[key] = Math.floor(remain / duration);
      remain %= duration;
    }

    return acc;
  }, {} as ParsedTimeType);
};

export const formatTime = (
  time: ParsedTimeType,
  useMilli = false,
  divider = ' ',
): string => {
  const parts: string[] = [];

  (Object.keys(TIME_FORMAT) as TimeFormatKeysType)
    .filter((key) => (key === 'milliseconds' ? useMilli : true))
    .forEach((key) => {
      if (time[key]) {
        parts.push(`${time[key]} ${TIME_FORMAT[key].title}`);
      }
    });

  return parts.length ? parts.join(divider) : TIME_INSTANT;
};

export const formatTimeHMS = (time: ParsedTimeType, divider = ':'): string => {
  const keys = ['hours', 'minutes', 'seconds'];

  return (Object.keys(TIME_FORMAT) as TimeFormatKeysType)
    .filter((key) => keys.includes(key))
    .map((key) => {
      const str = time[key].toString();

      return str.length === 1 ? `0${str}` : str;
    })
    .join(divider);
};

export const formatMsHMS = (ms: number, divider?: string): string => formatTimeHMS(parseTime(ms), divider);

export const formatMs = (
  ms: number,
  useMilli?: boolean,
  divider?: string,
): string => formatTime(parseTime(ms), useMilli, divider);

export const formatDate = (ms: number): string => new Date(ms).toLocaleString('ru-RU');
