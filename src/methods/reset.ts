import inquirer from 'inquirer';

import { type IApp } from '../classes/App.js';

export type ResetMethod = () => Promise<void>;

export default (async function (this: IApp) {
  this.log.print('RESET_TITLE', 'bold');
  this.log.print('RESET_TEXT_1');
  this.log.print('RESET_TEXT_2');

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'reset',
      message: this.text('RESET_QUESTION'),
      default: false,
    },
  ]);

  if (answers.reset) {
    this.store.set('compressed', {});
  }
}) as ResetMethod;
