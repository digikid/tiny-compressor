import inquirer from 'inquirer';
import isValidFilename from 'valid-filename';

import { type IApp } from '../classes/App.js';

export type ConfigMethod = () => Promise<void>;

export default (async function (this: IApp) {
  this.log.print('CONFIG_TITLE', 'bold');
  this.log.print('CONFIG_TEXT');

  const validate = (name: string): string | boolean => {
    if (!isValidFilename(name)) {
      return this.text('CONFIG_ERROR', 'bold', 'red');
    }

    return true;
  };

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'path',
      message: this.text('CONFIG_FOLDER_NAME'),
      default: this.store.get('path'),
      validate,
    },
  ]);

  Object.entries(answers).forEach(([key, value]) => this.store.set(key, value));
}) as ConfigMethod;
