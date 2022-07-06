import chalk from 'chalk';
import ora, { type Ora } from 'ora';
import cliSpinners, { type SpinnerName } from 'cli-spinners';

import { type IFile } from './App.js';
import { type Locale } from '../utils/locale.js';

import Store from './Store.js';

export type SpinnerStatus = 'start' | 'success' | 'error';

export interface ISpinnerStatus {
  color: string;
  text: string;
}

export interface ISpinner {
  readonly locale: Locale;
  readonly file: IFile;
  readonly type: SpinnerName;
  readonly spinner: Ora;
  readonly status: Record<SpinnerStatus, ISpinnerStatus>;

  print(status: SpinnerStatus): string;

  start(): void;

  success(): void;

  error(e: Error): void;
}

export default class Spinner extends Store implements ISpinner {
  public status: Record<SpinnerStatus, ISpinnerStatus>;

  public spinner: Ora;

  constructor(public locale: Locale, public file: IFile, public type: SpinnerName = 'bouncingBar') {
    super();

    this.status = {
      start: {
        color: 'cyan',
        text: locale[this.inStore(file.hash) ? 'SPINNER_START_FORCE_TEXT' : 'SPINNER_START_TEXT'],
      },
      success: {
        color: 'green',
        text: locale.SPINNER_SUCCESS_TEXT,
      },
      error: {
        color: 'red',
        text: locale[this.inStore(file.hash) ? 'SPINNER_ERROR_FORCE_TEXT' : 'SPINNER_ERROR_TEXT'],
      },
    };

    this.spinner = ora({
      spinner: cliSpinners[type],
    });
  }

  print(status: SpinnerStatus) {
    const { color, text } = this.status[status];

    const nameText = (chalk as any)[color](`[${this.file.name}] `);
    const messageText = status === 'error' ? chalk.red(text) : text;

    let result = `${nameText}${messageText}`;

    if (status === 'success') {
      const [originalSize, compressedSize] = this.getSizes(
        this.file.hash,
        true,
      );
      const percent = this.getRatio(this.file.hash, true);

      const sizesText = chalk.magenta(
        `[${originalSize} -> ${compressedSize}] `,
      );
      const percentText = chalk.green(`[-${percent}%] `);

      result = `${nameText}${sizesText}${percentText}${messageText}`;
    }

    return chalk.bold(result);
  }

  start() {
    this.spinner.start(this.print('start'));
  }

  success() {
    this.spinner.succeed(this.print('success'));
  }

  error(e: Error) {
    this.spinner.fail(this.print('error'));

    if (e.message) {
      console.log(chalk.italic.gray(e.message));
    }
  }
}
