import chalk from 'chalk';

import { parseRepoUrl, getVersion, isVersionOutdated } from '../utils/repo.js';

import { type IApp } from '../classes/App.js';

export type VersionMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const [current, latest] = await getVersion(this.packageJson);

  const { owner, name } = parseRepoUrl(this.packageJson);

  if (current) {
    console.log(this.message('VERSION_TITLE', 'bold'));
    console.log(current);

    if (latest && isVersionOutdated(current, latest)) {
      console.log(this.message('VERSION_LATEST_TITLE', 'bold', 'green'));
      console.log(chalk.bold.green(latest));
      console.log(this.message('VERSION_TEXT', 'bold'));
      console.log(chalk.italic.gray(`npm i -g ${owner}/${name}`));
    }
  }
}) as VersionMethod;
