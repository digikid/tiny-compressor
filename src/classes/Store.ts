import path from 'path';

import ConfigStore from 'configstore';

import { __dirname } from '../utils/path.js';
import { readFile } from '../utils/fs.js';
import { formatBytes } from '../utils/number.js';

export interface IPackageJson {
  name: string;
  version: string;
  homepage: string;

  [key: string]: string;
}

export interface IStoreFile {
  date: number;
  path: string;
  size: [number, number];
}

export interface IStore {
  readonly store: ConfigStore;
  readonly packageJson: IPackageJson;

  get path(): string;

  get compressed(): Record<string, IStoreFile>;

  getStoreId(hash: string): string;

  getFile(hash: string): IStoreFile | undefined;

  getSizes(hash: string | string[], format?: boolean): string[] | number[];

  getRatio(hash: string | string[], format?: boolean): string;

  addFile(hash: string, data: IStoreFile): void;

  removeFile(hash: string): void;

  inStore(hash: string): boolean;
}

export default class Store implements IStore {
  public store: ConfigStore;

  public packageJson: IPackageJson;

  constructor() {
    this.packageJson = JSON.parse(
      readFile(path.join(__dirname, 'package.json')),
    );

    this.store = new ConfigStore(this.packageJson.name, {
      path: 'compressed',
      compressed: {},
    });
  }

  get path(): string {
    return this.store.get('path');
  }

  get compressed(): Record<string, IStoreFile> {
    return this.store.get('compressed');
  }

  public getStoreId(hash: string) {
    const path = this.store.get('path');

    return `${path}.${hash}`;
  }

  public getFile(hash: string): IStoreFile | undefined {
    const storeId = this.getStoreId(hash);

    return this.store.get(storeId);
  }

  public getSizes(hash: string | string[], format?: false): number[];
  public getSizes(hash: string | string[], format?: true): string[];
  public getSizes(
    hash: string | string[],
    format?: boolean,
  ): number[] | string[] {
    const hashes = Array.isArray(hash) ? hash : [hash];

    const sizes = [0, 0];

    hashes.forEach((hash) => {
      const file = this.getFile(hash);

      if (file) {
        file.size.forEach((size, i) => {
          sizes[i] += size;
        });
      }
    });

    return format ? sizes.map(formatBytes) : sizes;
  }

  public getRatio(hash: string | string[], format?: boolean) {
    const hashes = Array.isArray(hash) ? hash : [hash];

    const ratio = hashes.reduce((acc, hash) => {
      const [original, compressed] = this.getSizes(hash);

      return acc + (1 - compressed / original);
    }, 0) / hashes.length;

    return (format ? ratio * 100 : ratio).toFixed(2);
  }

  public addFile(hash: string, data: IStoreFile) {
    const storeId = this.getStoreId(hash);

    this.store.set(storeId, data);
  }

  public removeFile(hash: string) {
    const storeId = this.getStoreId(hash);

    this.store.delete(storeId);
  }

  public inStore(hash: string) {
    const storeId = this.getStoreId(hash);

    return this.store.has(storeId);
  }
}
