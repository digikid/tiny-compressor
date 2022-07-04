import crypto from 'crypto';

import { type IFile } from '../classes/App.js';
import { type ApiOutput } from './api.js';

export const number = (min = 0, max = 100): number => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const data = (size = 100, encoding = 'utf8') => crypto.randomBytes(size).toString(encoding as BufferEncoding);

export interface RandomRequestParams {
  file: IFile;
  delay?: number | number[];
  errors?: number;
}

export const request = (
  { file, delay = 1500, errors = 0.5 } = {} as RandomRequestParams,
): Promise<ApiOutput> => {
  const ms = Array.isArray(delay) ? number(...delay) : delay;

  const randomNumber = number();
  const size = number(0, file.size);

  const value = randomNumber >= errors
    ? {
      data: data(size, 'hex'),
      size,
      error: null,
    }
    : {
      data: null,
      size: null,
      error: new Error('Connection Error'),
    };

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(value);

      clearTimeout(timeout);
    }, ms);
  });
};
