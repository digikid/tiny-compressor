import path from 'path';
import dree from 'dree';
import fs, { promises } from 'fs';

import { findDeep } from './object.js';

export const readFile = (file: string): string => fs.readFileSync(file, { encoding: 'utf8' });

export const readFileAsync = async (
  file: string,
  isBuffer: boolean = false,
) => {
  const data = await promises.readFile(file, 'utf8');

  return isBuffer ? Buffer.from(data) : data;
};

export const writeFileAsync = async (
  directory: string,
  data: string,
): Promise<void> => {
  await promises.mkdir(path.dirname(directory), {
    recursive: true,
  });

  await promises.writeFile(directory, data);
};

export const scanFiles = (path: string, options = {}) => {
  const tree = dree.scan(path, {
    showHidden: false,
    symbolicLinks: false,
    ...options,
  });

  return findDeep(tree, ({ type }) => type === 'file');
};
