import chalk from 'chalk';
import ora, { type Ora } from 'ora';
import cliSpinners, { type SpinnerName } from 'cli-spinners';

import { type IFile } from './App.js';

import Store from './Store.js';

export type SpinnerStatusType = 'start' | 'success' | 'error';

export interface ISpinnerStatus {
  color: string;
  text: string;
}

export interface ISpinner {
  readonly file: IFile;
  readonly type: SpinnerName;
  readonly spinner: Ora;
  readonly status: Record<SpinnerStatusType, ISpinnerStatus>;

  print(status: SpinnerStatusType): string;

  start(): void;

  success(): void;

  error(e: Error): void;
}

export default class Spinner extends Store implements ISpinner {
  public status: Record<SpinnerStatusType, ISpinnerStatus>;

  public spinner: Ora;

  constructor(public file: IFile, public type: SpinnerName = 'bouncingBar') {
    super();

    this.status = {
      start: {
        color: 'cyan',
        text: `${
          this.inStore(file.hash) ? 'Повторная о' : 'О'
        }бработка файла...`,
      },
      success: {
        color: 'green',
        text: 'Готово',
      },
      error: {
        color: 'red',
        text: `При ${
          this.inStore(file.hash) ? 'повторной ' : ''
        }обработке файла произошла ошибка`,
      },
    };

    this.spinner = ora({
      spinner: cliSpinners[type],
    });
  }

  print(status: SpinnerStatusType) {
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
