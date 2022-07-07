import { type IApp } from '../classes/App.js';
import { command } from '../utils/args.js';

export type InitMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const commandArgs = ['config', 'help', 'reset', 'stat', 'version'] as const;

  const method = commandArgs.find((arg) => command(arg)) || 'compress';

  await this[method]();

  if (this.args.watch) {
    await this.watch();
  }
}) as InitMethod;
