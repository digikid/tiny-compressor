import inquirer from 'inquirer';

import { type IApp } from '../classes/App.js';

export type ResetMethod = () => Promise<void>;

export default (async function (this: IApp) {
  console.log(this.message('RESET_TITLE', 'bold'));
  console.log(this.message('RESET_TEXT_1'));
  console.log(this.message('RESET_TEXT_2'));

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'reset',
      message: this.message('RESET_QUESTION'),
      default: false,
    },
  ]);

  if (answers.reset) {
    this.store.set('compressed', {});
  }
}) as ResetMethod;
