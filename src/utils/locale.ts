import path from 'path';

import { __dirname } from './path.js';
import { readFile, scanFiles } from './fs.js';

export type Locale = Record<string, string>;

export type Locales = {
  [key: string]: Locale;
};

export const defaultLocale = 'en-US';

export const get = (locale: string = defaultLocale): Locale => {
  const rootPath = path.join(__dirname, 'src/locale');

  const locales = scanFiles(rootPath, {
    extensions: ['json'],
  }).reduce((acc, file) => {
    const name = file.name.replace('.json', '');

    acc[name] = JSON.parse(
      readFile(path.join(rootPath, file.relativePath)),
    );

    return acc;
  }, {} as Locales);

  return locales[locale in locales ? locale : defaultLocale];
};
