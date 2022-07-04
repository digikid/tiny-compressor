import path from 'path';
import dree from 'dree';

import compress from '../methods/compress.js';
import config from '../methods/config.js';
import help from '../methods/help.js';
import reset from '../methods/reset.js';
import stat from '../methods/stat.js';
import watch from '../methods/watch.js';

import { arg } from '../utils/args.js';
import { findDeep } from '../utils/object.js';

import Store, { type IStore } from './Store.js';
import Logger, { type ILogger } from './Logger.js';

const paramArgs = ['demo', 'force', 'path', 'quiet', 'watch'] as const;
const methodArgs = ['config', 'help', 'reset', 'stat'] as const;
const methodKeys = [
  'compress',
  'config',
  'help',
  'reset',
  'stat',
  'watch',
] as const;

export type ArgParamsType = typeof paramArgs[number];
export type ArgMethodsType = typeof methodArgs[number];
export type MethodKeysType = typeof methodKeys[number];

export interface IFile {
  name: string;
  hash: string;
  path: string;
  relativePath: string;
  size: number;
}

export interface IApp extends IStore {
  readonly extensions: string[];
  readonly logger: ILogger;
  readonly outputPathName: string;
  readonly rootPath: string;
  readonly outputPath: string;
  readonly args: Record<ArgParamsType, boolean | string>;
  readonly methods: Record<MethodKeysType, () => Promise<void>>;

  get files(): IFile[];

  run(): Promise<void>;
}

export default class App extends Store implements IApp {
  public extensions = ['jpeg', 'jpg', 'png', 'webp'];

  public logger = new Logger();

  public args;

  public methods;

  public outputPathName;

  public rootPath;

  public outputPath;

  constructor() {
    super();

    this.outputPathName = arg('path', true) || this.path;

    this.rootPath = process.cwd();
    this.outputPath = path.join(this.rootPath, this.outputPathName);

    this.args = paramArgs.reduce((acc, param) => {
      acc[param] = arg(param, (param === 'path') as true);

      return acc;
    }, {} as Record<ArgParamsType, boolean | string>);

    this.methods = {
      compress,
      config,
      help,
      reset,
      stat,
      watch,
    };
  }

  get files() {
    const exclude = new RegExp(`/${this.outputPathName}/`);

    const tree = dree.scan(this.rootPath, {
      showHidden: false,
      symbolicLinks: false,
      extensions: this.extensions,
      exclude,
    });

    return findDeep(tree, ({ type }) => type === 'file').map(
      ({
        name, hash, path, relativePath, sizeInBytes,
      }) => ({
        name,
        hash,
        path,
        relativePath,
        size: sizeInBytes,
      } as IFile),
    );
  }

  public async run() {
    const method = methodArgs.find((param) => arg(param)) || 'compress';

    if (method in this.methods) {
      await this.methods[method].call(this);
    }

    if (arg('watch')) {
      await this.methods.watch.call(this as IApp);
    }
  }
}
