import path from 'path';

import compress, { type CompressMethod } from '../methods/compress.js';
import config, { type ConfigMethod } from '../methods/config.js';
import help, { type HelpMethod } from '../methods/help.js';
import init, { type InitMethod } from '../methods/init.js';
import report, { type ReportMethod } from '../methods/report.js';
import reset, { type ResetMethod } from '../methods/reset.js';
import stat, { type StatMethod } from '../methods/stat.js';
import text, { type TextMethod } from '../methods/text.js';
import version, { type VersionMethod } from '../methods/version.js';
import watch, { type WatchMethod } from '../methods/watch.js';

import { scanFiles } from '../utils/fs.js';
import { type Locale } from '../utils/locale.js';

import Store, { type IStore } from './Store.js';
import Logger, { type ILogger } from './Logger.js';

export interface IFile {
  name: string;
  hash: string;
  path: string;
  relativePath: string;
  size: number;
}

export interface IApp extends IStore {
  readonly locale: Locale;
  readonly log: ILogger;

  readonly extensions: string[];
  readonly rootPath: string;
  readonly outputPath: string;

  readonly compress: CompressMethod;
  readonly config: ConfigMethod;
  readonly help: HelpMethod;
  readonly init: InitMethod;
  readonly report: ReportMethod;
  readonly reset: ResetMethod;
  readonly stat: StatMethod;
  readonly text: TextMethod;
  readonly version: VersionMethod;
  readonly watch: WatchMethod;

  get files(): IFile[];
}

export default class App extends Store implements IApp {
  constructor(public locale: Locale) {
    super();

    this.log = new Logger(locale);
  }

  public log: ILogger;

  public extensions = ['jpeg', 'jpg', 'png', 'webp'];

  public rootPath = process.cwd();

  public outputPath = path.join(this.rootPath, this.path);

  public compress = compress;

  public config = config;

  public help = help;

  public init = init;

  public report = report;

  public reset = reset;

  public stat = stat;

  public text = text;

  public version = version;

  public watch = watch;

  get files() {
    const exclude = new RegExp(`/${this.path}/`);

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
