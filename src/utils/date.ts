import { type Locale } from './locale.js';

const keys = ['days', 'hours', 'minutes', 'seconds', 'milliseconds'] as const;

export type TimeLocale = Locale;
export type TimeFormatKeys = typeof keys[number];
export type ParsedTimeObject = Record<typeof keys[number], number>;

export const getTimestamp = (): number => new Date().getTime();

export const getTimeFormat = (locale: TimeLocale) => ({
  days: {
    title: locale.TIME_DAYS || 'd',
    duration: 1000 * 60 * 60 * 24,
  },
  hours: {
    title: locale.TIME_HOURS || 'h',
    duration: 1000 * 60 * 60,
  },
  minutes: {
    title: locale.TIME_MINUTES || 'm',
    duration: 1000 * 60,
  },
  seconds: {
    title: locale.TIME_SECONDS || 's',
    duration: 1000,
  },
  milliseconds: {
    title: locale.TIME_MILLISECONDS || 'ms',
    duration: 1,
  },
});

export const parseTime = (locale: TimeLocale, ms: number): ParsedTimeObject => {
  const format = getTimeFormat(locale);

  let remain = ms;

  return (Object.keys(format) as TimeFormatKeys[]).reduce((acc, key) => {
    const { duration } = format[key];

    if (key === 'milliseconds') {
      acc[key] = remain;
    } else {
      acc[key] = Math.floor(remain / duration);
      remain %= duration;
    }

    return acc;
  }, {} as ParsedTimeObject);
};

export const formatTime = (
  locale: TimeLocale,
  time: ParsedTimeObject,
  useMilli = false,
  divider = ' ',
): string => {
  const format = getTimeFormat(locale);

  const parts: string[] = [];

  (Object.keys(format) as TimeFormatKeys[])
    .filter((key) => (key === 'milliseconds' ? useMilli : true))
    .forEach((key) => {
      if (time[key]) {
        parts.push(`${time[key]} ${format[key].title}`);
      }
    });

  return parts.length ? parts.join(divider) : locale.TIME_INSTANT || 'quickly';
};

export const formatTimeHMS = (locale: TimeLocale, time: ParsedTimeObject, divider = ':'): string => {
  const format = getTimeFormat(locale);

  const formattedKeys = ['hours', 'minutes', 'seconds'];

  return (Object.keys(format) as TimeFormatKeys[])
    .filter((key) => formattedKeys.includes(key))
    .map((key) => {
      const str = time[key].toString();

      return str.length === 1 ? `0${str}` : str;
    })
    .join(divider);
};

export const formatMsHMS = (locale: TimeLocale, ms: number, divider?: string): string => formatTimeHMS(locale, parseTime(locale, ms), divider);

export const formatMs = (
  locale: TimeLocale,
  ms: number,
  useMilli?: boolean,
  divider?: string,
): string => formatTime(locale, parseTime(locale, ms), useMilli, divider);

export const formatDate = (ms: number): string => new Date(ms).toLocaleString('ru-RU');
