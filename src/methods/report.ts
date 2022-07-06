import chalk from 'chalk';

import { IApp } from '../classes/App.js';
import { type ICompressResult } from './compress.js';
import { formatMs, getTimestamp } from '../utils/date.js';

export type ReportMethod = (result: ICompressResult, timestamp: number) => void;

export default (function (this: IApp, result: ICompressResult, timestamp: number) {
  const { files, skipped, errors } = result;

  const [originalSize, compressedSize] = this.getSizes(files, true);
  const percent = this.getRatio(files, true);

  const time = formatMs(this.locale, getTimestamp() - timestamp, true);

  const filesText = `${this.message('REPORT_TOTAL_FILES_TEXT')} ${chalk.cyan(files.length)}`;
  const skippedText = skipped.length
    ? `, ${this.message('REPORT_TOTAL_SKIPPED_TEXT')} ${chalk.gray(skipped.length)}`
    : '';
  const errorsText = errors.length
    ? `, ${this.message('REPORT_TOTAL_ERRORS_TEXT')} ${chalk.red(errors.length)}`
    : '';
  const originalSizeText = `${this.message('REPORT_ORIGINAL_SIZE_TEXT')} ${chalk.magenta(
    `${originalSize}`,
  )}`;
  const compressedSizeText = `${this.message('REPORT_COMPRESSED_SIZE_TEXT')} ${chalk.green(
    `${compressedSize} [-${percent}%]`,
  )}`;
  const completedText = this.message('REPORT_COMPLETED_TEXT');
  const timestampText = `${this.message('REPORT_TIME_TEXT')} ${chalk.blue(time)}`;

  if (files.length || errors.length) {
    console.log('-'.repeat(process.stdout.columns));
    console.log(chalk.bold(`${filesText}${skippedText}${errorsText}`));

    if (files.length) {
      console.log(chalk.bold(`${originalSizeText}`));
      console.log(chalk.bold(`${compressedSizeText}`));
    }

    console.log(chalk.bold(timestampText));
  } else if (skipped.length) {
    console.log(chalk.bold.green(completedText));
  }
}) as ReportMethod;
