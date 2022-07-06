import chalk from 'chalk';

import { sortByKey } from '../utils/object.js';
import { formatDate } from '../utils/date.js';
import { formatBytes } from '../utils/number.js';

import { type IApp } from '../classes/App.js';

export type StatMethod = () => void;

export default (function (this: IApp) {
  const hashes = Object.keys(this.compressed);
  const files = Object.values(this.compressed);

  const [originalSize, compressedSize] = this.getSizes(hashes, true);

  const percent = this.getRatio(hashes, true);

  const filesText = `${this.message('STAT_TOTAL_FILES_TEXT')} ${chalk.cyan(files.length)}`;
  const originalSizeText = `${this.message('STAT_TOTAL_ORIGINAL_SIZE_TEXT')} ${chalk.magenta(originalSize)}`;
  const compressedSizeText = `${this.message('STAT_TOTAL_COMPRESSED_SIZE_TEXT')} ${chalk.green(
    compressedSize,
  )} ${chalk.green(`[-${percent}%]`)}`;

  sortByKey(files, 'date').forEach((file) => {
    const [originalSize, compressedSize] = file.size;
    const percent = (100 * (1 - compressedSize / originalSize)).toFixed(2);

    console.log(
      `${this.message('STAT_FILE_DATE_TEXT', 'bold')} ${chalk.bold.blue(
        formatDate(file.date),
      )}`,
    );
    console.log(
      `${this.message('STAT_FILE_PATH_TEXT', 'bold')}\n${chalk.bold.cyan(file.path)}`,
    );
    console.log(
      `${this.message('STAT_FILE_ORIGINAL_SIZE_TEXT', 'bold')} ${chalk.bold.magenta(
        `${formatBytes(originalSize)}`,
      )}`,
    );
    console.log(
      `${this.message('STAT_FILE_COMPRESSED_SIZE_TEXT', 'bold')} ${chalk.bold.green(
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
}) as StatMethod;
