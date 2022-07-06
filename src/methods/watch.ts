import nsfw from 'nsfw';

import { type IApp } from '../classes/App.js';

export type WatchMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const watcher = await nsfw(
    this.rootPath,
    async (events) => {
      const compressed = Object.values(this.compressed).map(({ path }) => path);

      try {
        events.forEach((event) => {
          if ('newFile' in event) {
            if (this.extensions.some((extension) => event.newFile.endsWith(`.${extension}`))) {
              throw new Error('BreakException');
            }
          }
        });

        this.files.forEach((file) => {
          if (!compressed.includes(file.path)) {
            throw new Error('BreakException');
          }
        });
      } catch (e) {
        if (e instanceof Error && e.message === 'BreakException') {
          await this.compress();
        }
      }
    },
    {
      excludedPaths: [this.outputPath],
    },
  );

  await watcher.start();

  if (!this.args.quiet) {
    console.log(this.message('WATCH_TITLE', 'bold', 'cyan'));
  }
}) as WatchMethod;
