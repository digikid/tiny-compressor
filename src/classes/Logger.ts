import chalk from 'chalk';

import { formatDate, formatMs, getTimestamp } from '../utils/date.js';
import { formatBytes } from '../utils/number.js';
import { sortByKey } from '../utils/object.js';

import Store, { type IStore } from './Store.js';
import { type ICompressResult } from '../methods/compress.js';

export interface ILogger extends IStore {
  report(result: ICompressResult, timestamp: number): void;

  reportAll(): void;
}

export default class Logger extends Store implements ILogger {
  report(result: ICompressResult, timestamp: number) {
    const { files, skipped, errors } = result;

    const [originalSize, compressedSize] = this.getSizes(files, true);
    const percent = this.getRatio(files, true);

    const time = formatMs(getTimestamp() - timestamp, true);

    const filesText = `Обработано файлов: ${chalk.cyan(files.length)}`;
    const skippedText = skipped.length
      ? `, пропущено: ${chalk.gray(skipped.length)}`
      : '';
    const errorsText = errors.length
      ? `, ошибок: ${chalk.red(errors.length)}`
      : '';
    const originalSizeText = `Размер до сжатия: ${chalk.magenta(
      `${originalSize}`,
    )}`;
    const compressedSizeText = `Размер после сжатия: ${chalk.green(
      `${compressedSize} [-${percent}%]`,
    )}`;
    const completedText = 'Все файлы в текущей директории обработаны';
    const timestampText = `Затраченное время: ${chalk.blue(time)}`;

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
  }

  reportAll() {
    const hashes = Object.keys(this.compressed);
    const files = Object.values(this.compressed);

    const [originalSize, compressedSize] = this.getSizes(hashes, true);

    const percent = this.getRatio(hashes, true);

    const filesText = `Всего обработано файлов: ${chalk.cyan(files.length)}`;
    const originalSizeText = `Размер до сжатия: ${chalk.magenta(originalSize)}`;
    const compressedSizeText = `Размер после сжатия: ${chalk.green(
      compressedSize,
    )} ${chalk.green(`[-${percent}%]`)}`;

    sortByKey(files, 'date').forEach((file) => {
      const [originalSize, compressedSize] = file.size;
      const percent = (100 * (1 - compressedSize / originalSize)).toFixed(2);

      console.log(
        `${chalk.bold('Дата обработки:')} ${chalk.bold.blue(
          formatDate(file.date),
        )}`,
      );
      console.log(
        `${chalk.bold('Расположение файла:')}\n${chalk.bold.cyan(file.path)}`,
      );
      console.log(
        `${chalk.bold('Размер до сжатия:')} ${chalk.bold.magenta(
          `${formatBytes(originalSize)}`,
        )}`,
      );
      console.log(
        `${chalk.bold('Размер после сжатия:')} ${chalk.bold.green(
          `${formatBytes(compressedSize)} [-${percent}%]`,
        )}`,
      );

      console.log('-'.repeat(process.stdout.columns));
    });

    console.log(chalk.bold(`${filesText}`));

    if (files.length) {
      console.log(chalk.bold(`${originalSizeText}`));
      console.log(chalk.bold(`${compressedSizeText}`));
    }
  }
}
