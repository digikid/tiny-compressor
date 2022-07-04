import chalk from 'chalk';
import inquirer from 'inquirer';

import { type IApp } from '../classes/App.js';

export default async function (this: IApp) {
  console.log(chalk.bold('Настройки компрессора'));
  console.log('Пожалуйста, заполните все необходимые поля');

  const validate = (name: string): string | boolean => {
    if (
      !name.trim()
            || /[<>:"\/\\|?*\x00-\x1F]|^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/.test(
              name,
            )
    ) {
      return chalk.bold.red('Задайте корректное название для папки');
    }

    return true;
  };

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'path',
      message: 'Название папки с обработанными изображениями',
      default: 'compressed',
      validate,
    },
  ]);

  if ('path' in answers) {
    this.store.set('path', answers.path);
  }
}
