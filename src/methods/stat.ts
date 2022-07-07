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

  const filesText = `${this.text('STAT_TOTAL_FILES_TEXT', 'bold')} ${this.text(files.length, 'bold', 'cyan')}`;
  const originalSizeText = `${this.text('STAT_TOTAL_ORIGINAL_SIZE_TEXT', 'bold')} ${this.text(originalSize, 'bold', 'magenta')}`;
  const compressedSizeText = `${this.text('STAT_TOTAL_COMPRESSED_SIZE_TEXT', 'bold')} ${this.text(compressedSize, 'bold', 'green')} ${this.text(`[-${percent}%]`, 'bold', 'green')}`;

  sortByKey(files, 'date').forEach((file) => {
    const [originalSize, compressedSize] = file.size;
    const percent = (100 * (1 - compressedSize / originalSize)).toFixed(2);

    this.log.print(`${this.text('STAT_FILE_DATE_TEXT', 'bold')} ${this.text(formatDate(file.date), 'bold', 'blue')}`);
    this.log.print(`${this.text('STAT_FILE_PATH_TEXT', 'bold')}\n${this.text(file.path, 'bold', 'cyan')}`);
    this.log.print(`${this.text('STAT_FILE_ORIGINAL_SIZE_TEXT', 'bold')} ${this.text(`${formatBytes(originalSize)}`, 'bold', 'magenta')}`);
    this.log.print(`${this.text('STAT_FILE_COMPRESSED_SIZE_TEXT', 'bold')} ${this.text(`${formatBytes(compressedSize)} [-${percent}%]`, 'bold', 'green')}`);

    this.log.separate();
  });

  this.log.print(filesText);

  if (files.length) {
    this.log.print(originalSizeText);
    this.log.print(compressedSizeText);
  }
}) as StatMethod;
