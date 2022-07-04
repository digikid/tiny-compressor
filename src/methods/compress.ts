import path from 'path';
import chalk from 'chalk';

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

export default async function (this: IApp) {
  if (!this.files.length) {
    console.log(chalk.bold.red('Текущая директория не содержит изображений'));

    return;
  }

  if (this.args.force && !this.args.quiet) {
    console.log(
      chalk.bgYellowBright(
        'Параметр --force активен, поэтому все ранее обработанные изображения будут обработаны повторно',
      ),
    );
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

    if (this.args.force || !this.inStore(hash)) {
      const spinner = new Spinner(file);

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

    if (this.args.force && this.inStore(hash) && !isSuccess) {
      this.removeFile(hash);
    }
  }

  if (!this.args.quiet) {
    this.logger.report(result, timestamp);
  }
}
