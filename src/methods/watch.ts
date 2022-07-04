import chalk from 'chalk';
import nsfw from 'nsfw';

import { type IApp } from '../classes/App.js';

export default async function (this: IApp) {
  const watcher = await nsfw(
    this.rootPath,
    async (events) => {
      const compressed = Object.values(this.compressed).map(({ path }) => path);

      let isUpdated = false;

      for (const event of events) {
        if (
          'newFile' in event
                    && this.extensions.some((extension) => event.newFile.endsWith(`.${extension}`))
        ) {
          isUpdated = true;

          break;
        } else {
          for (const file of this.files) {
            if (!compressed.includes(file.path)) {
              isUpdated = true;

              break;
            }
          }
        }

        if (isUpdated) {
          await this.methods.compress.call(this);

          break;
        }
      }
    },
    {
      excludedPaths: [this.outputPath],
    },
  );

  await watcher.start();

  console.log(chalk.bold.cyan('Слежение за обновлением файлов...'));
}
