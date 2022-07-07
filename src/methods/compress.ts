import path from 'path';

import { getTimestamp } from '../utils/date.js';
import { writeFileAsync } from '../utils/fs.js';
import { request } from '../utils/api.js';

import * as random from '../utils/random.js';

import Spinner from '../classes/Spinner.js';
import { type IApp } from '../classes/App.js';

export interface ICompressResult {
  files: string[];
  skipped: string[];
  errors: Error[];
}

export type CompressMethod = () => Promise<void>;

export default (async function (this: IApp) {
  if (!this.files.length) {
    this.log.error('COMPRESS_NO_IMAGES_ERROR');

    return;
  }

  if (this.args.force && !this.args.quiet) {
    this.log.warning('COMPRESS_FORCE_WARNING');
  }

  const timestamp = getTimestamp();

  const result: ICompressResult = {
    files: [],
    skipped: [],
    errors: [],
  };

  for (const file of this.files) {
    const { hash, relativePath } = file;

    let isSuccess = false;

    if (this.args.force || !this.isProcessed(hash)) {
      const spinner = new Spinner(file, this);

      if (!this.args.quiet) {
        spinner.start();
      }

      try {
        const output = await (this.args.demo
          ? random.request({
            file,
            delay: [300, 1500],
          })
          : request(file));

        if (output.data && output.size) {
          const { data, size } = output;

          try {
            await writeFileAsync(
              path.join(this.outputPath, relativePath),
              data,
            );

            this.addFile(hash, {
              date: getTimestamp(),
              path: file.path,
              size: [file.size, size],
            });

            result.files.push(hash);

            isSuccess = true;

            if (!this.args.quiet) {
              spinner.success();
            }
          } catch (e) {
            if (e instanceof Error) {
              result.errors.push(e);

              if (!this.args.quiet) {
                spinner.error(e);
              }
            }
          }
        } else {
          const e = output.error || new Error('Ошибка при обработке файла на сервере');

          result.errors.push(e);

          if (!this.args.quiet) {
            spinner.error(e);
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          result.errors.push(e);

          if (!this.args.quiet) {
            spinner.error(e);
          }
        }
      }
    } else {
      result.skipped.push(hash);
    }

    if (this.args.force && this.isProcessed(hash) && !isSuccess) {
      this.removeFile(hash);
    }
  }

  if (!this.args.quiet) {
    this.report(result, timestamp);
  }
}) as CompressMethod;
