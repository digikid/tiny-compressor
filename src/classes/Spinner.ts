import ora, { type Ora } from 'ora';
import cliSpinners, { type SpinnerName } from 'cli-spinners';

import { type IApp, type IFile } from './App.js';

const statuses = ['start', 'success', 'error'] as const;
const colors = ['cyan', 'green', 'red'] as const;

export type SpinnerStatus = typeof statuses[number];
export type SpinnerColors = typeof colors[number];

export interface ISpinnerStatus {
  color: SpinnerColors;
  text: string;
}

export interface ISpinner {
  readonly file: IFile;
  readonly app: IApp;
  readonly type: SpinnerName;
  readonly spinner: Ora;
  readonly status: Record<SpinnerStatus, ISpinnerStatus>;

  print(status: SpinnerStatus): string;

  start(): void;

  success(): void;

  error(e: Error): void;
}

export default class Spinner implements ISpinner {
  public status: Record<SpinnerStatus, ISpinnerStatus>;

  public spinner: Ora;

  constructor(public file: IFile, public app: IApp, public type: SpinnerName = 'bouncingBar') {
    this.app = app;

    this.status = {
      start: {
        color: 'cyan',
        text: app.locale[app.isProcessed(file.hash) ? 'SPINNER_START_FORCE_TEXT' : 'SPINNER_START_TEXT'],
      },
      success: {
        color: 'green',
        text: app.locale.SPINNER_SUCCESS_TEXT,
      },
      error: {
        color: 'red',
        text: app.locale[app.isProcessed(file.hash) ? 'SPINNER_ERROR_FORCE_TEXT' : 'SPINNER_ERROR_TEXT'],
      },
    } as const;

    this.spinner = ora({
      spinner: cliSpinners[type],
    });
  }

  print(status: SpinnerStatus) {
    const { color, text } = this.status[status];

    const nameText = this.app.text(`[${this.file.name}] `, color);
    const messageText = status === 'error' ? this.app.text(text, 'red') : text;

    let result = `${nameText}${messageText}`;

    if (status === 'success') {
      const [originalSize, compressedSize] = this.app.getSizes(
        this.file.hash,
        true,
      );
      const percent = this.app.getRatio(this.file.hash, true);

      const sizesText = this.app.text(`[${originalSize} -> ${compressedSize}] `, 'magenta');
      const percentText = this.app.text(`[-${percent}%] `, 'green');

      result = `${nameText}${sizesText}${percentText}${messageText}`;
    }

    return this.app.text(result, 'bold');
  }

  start() {
    this.spinner.start(this.print('start'));
  }

  success() {
    this.spinner.succeed(this.print('success'));
  }

  error(e: Error) {
    this.spinner.fail(this.print('error'));

    this.app.log.error('', e);
  }
}
