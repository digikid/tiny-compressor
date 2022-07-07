import { type IApp } from '../classes/App.js';
import { type ICompressResult } from './compress.js';
import { formatMs, getTimestamp } from '../utils/date.js';

export type ReportMethod = (result: ICompressResult, timestamp: number) => void;

export default (function (this: IApp, result: ICompressResult, timestamp: number) {
  const { files, skipped, errors } = result;

  const [originalSize, compressedSize] = this.getSizes(files, true);

  const percent = this.getRatio(files, true);

  const time = formatMs(this.locale, getTimestamp() - timestamp, true);

  const filesText = `${this.text('REPORT_TOTAL_FILES_TEXT')} ${this.text(files.length, 'cyan')}`;

  const skippedText = skipped.length
    ? `, ${this.text('REPORT_TOTAL_SKIPPED_TEXT')} ${this.text(skipped.length, 'gray')}`
    : '';

  const errorsText = errors.length
    ? `, ${this.text('REPORT_TOTAL_ERRORS_TEXT')} ${this.text(errors.length, 'red')}`
    : '';

  const originalSizeText = `${this.text('REPORT_ORIGINAL_SIZE_TEXT')} ${this.text(`${originalSize}`, 'magenta')}`;
  const compressedSizeText = `${this.text('REPORT_COMPRESSED_SIZE_TEXT')} ${this.text(`${compressedSize} [-${percent}%]`, 'green')}`;

  const completedText = this.text('REPORT_COMPLETED_TEXT');
  const timestampText = `${this.text('REPORT_TIME_TEXT')} ${this.text(time, 'blue')}`;

  if (files.length || errors.length) {
    this.log.separate();
    this.log.print(`${filesText}${skippedText}${errorsText}`, 'bold');

    if (files.length) {
      this.log.print(originalSizeText, 'bold');
      this.log.print(compressedSizeText, 'bold');
    }

    this.log.print(timestampText, 'bold');
  } else if (skipped.length) {
    this.log.success(completedText);
  }
}) as ReportMethod;
