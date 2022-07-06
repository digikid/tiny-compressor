import path from 'path';

import compress, { type CompressMethod } from '../methods/compress.js';
import config, { type ConfigMethod } from '../methods/config.js';
import help, { type HelpMethod } from '../methods/help.js';
import init, { type InitMethod } from '../methods/init.js';
import message, { type MessageMethod } from '../methods/message.js';
import report, { type ReportMethod } from '../methods/report.js';
import reset, { type ResetMethod } from '../methods/reset.js';
import stat, { type StatMethod } from '../methods/stat.js';
import version, { type VersionMethod } from '../methods/version.js';
import watch, { type WatchMethod } from '../methods/watch.js';

import { arg, parse as parseArgs } from '../utils/args.js';
import { get as getLocale, type Locale } from '../utils/locale.js';
import { scanFiles } from '../utils/fs.js';

import Store, { type IStore } from './Store.js';

const paramArgs = ['demo', 'force', 'path', 'quiet', 'watch'] as const;

export type ParamArgsKeys = typeof paramArgs[number];

export interface IFile {
  name: string;
  hash: string;
  path: string;
  relativePath: string;
  size: number;
}

export interface IApp extends IStore {
  readonly locale: Locale;
  readonly extensions: string[];
  readonly outputPathName: string;
  readonly rootPath: string;
  readonly outputPath: string;
  readonly args: Record<ParamArgsKeys, boolean | string>;

  readonly compress: CompressMethod;
  readonly config: ConfigMethod;
  readonly help: HelpMethod;
  readonly init: InitMethod;
  readonly message: MessageMethod;
  readonly report: ReportMethod;
  readonly reset: ResetMethod;
  readonly stat: StatMethod;
  readonly version: VersionMethod;
  readonly watch: WatchMethod;

  get files(): IFile[];
}

export default class App extends Store implements IApp {
  constructor(locale: string) {
    super();

    this.locale = getLocale(locale);
  }

  public locale;

  public extensions = ['jpeg', 'jpg', 'png', 'webp'];

  public args = parseArgs<ParamArgsKeys>(paramArgs);

  public outputPathName = arg('path', true) || this.path;

  public rootPath = process.cwd();

  public outputPath = path.join(this.rootPath, this.outputPathName);

  public compress = compress;

  public config = config;

  public help = help;

  public init = init;

  public message = message;

  public report = report;

  public reset = reset;

  public stat = stat;

  public version = version;

  public watch = watch;

  get files() {
    const exclude = new RegExp(`/${this.outputPathName}/`);

    return scanFiles(this.rootPath, {
      extensions: this.extensions,
      exclude,
    }).map(
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
}
