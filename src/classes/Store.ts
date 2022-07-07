import path from 'path';
import ConfigStore from 'configstore';

import addFile, { type StoreAddFileMethod } from '../store/addFile.js';
import getFile, { type StoreGetFileMethod } from '../store/getFile.js';
import getRatio, { type StoreGetRatioMethod } from '../store/getRatio.js';
import getSizes, { type StoreGetSizesMethod } from '../store/getSizes.js';
import getStoreId, { type StoreGetIdMethod } from '../store/getStoreId.js';
import isProcessed, { type StoreIsProcessedMethod } from '../store/isProcessed.js';
import removeFile, { type StoreRemoveFileMethod } from '../store/removeFile.js';

import { __dirname } from '../utils/path.js';
import { readFile } from '../utils/fs.js';
import { arg, parse as parseArgs } from '../utils/args.js';

const paramArgs = ['demo', 'force', 'path', 'quiet', 'watch'] as const;

export type ParamArgsKeys = typeof paramArgs[number];
export type StoreFiles = Record<string, IStoreFile>;

export interface IPackageJson {
  name: string;
  version: string;
  homepage: string;
  repository: {
    url: string;
  }
}

export interface IStoreFile {
  date: number;
  path: string;
  size: [number, number];
}

export interface IStore {
  readonly store: ConfigStore;
  readonly packageJson: IPackageJson;
  readonly args: Record<ParamArgsKeys, boolean | string>;

  readonly addFile: StoreAddFileMethod;
  readonly getFile: StoreGetFileMethod;
  readonly getRatio: StoreGetRatioMethod;
  readonly getSizes: StoreGetSizesMethod;
  readonly getStoreId: StoreGetIdMethod;
  readonly isProcessed: StoreIsProcessedMethod;
  readonly removeFile: StoreRemoveFileMethod;

  get path(): string;
  get compressed(): StoreFiles;
}

export default class Store implements IStore {
  constructor() {
    this.packageJson = JSON.parse(
      readFile(path.join(__dirname, 'package.json')),
    );

    this.store = new ConfigStore(this.packageJson.name, {
      path: 'compressed',
      compressed: {},
    });
  }

  public store: ConfigStore;

  public packageJson: IPackageJson;

  public args = parseArgs<ParamArgsKeys>(paramArgs);

  public addFile = addFile;

  public getFile = getFile;

  public getRatio = getRatio;

  public getSizes = getSizes;

  public getStoreId = getStoreId;

  public isProcessed = isProcessed;

  public removeFile = removeFile;

  get path(): string {
    return arg('path', true) || this.store.get('path');
  }

  get compressed(): Record<string, IStoreFile> {
    return this.store.get('compressed');
  }
}
