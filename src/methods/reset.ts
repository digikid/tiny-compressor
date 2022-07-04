import chalk from 'chalk';
import inquirer from 'inquirer';

import { type IApp } from '../classes/App.js';

export default async function (this: IApp) {
  console.log(chalk.bold('Очистка истории изменения файлов'));
  console.log(
    'После очистки истории информация о ранее обработанных изображениях будет удалена.',
  );
  console.log(
    'Это вызовет повторную отправку файлов на сервер TinyPNG, что может привести к уменьшению лимита на количество изображений или блокировке IP.',
  );

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'reset',
      message: 'Очистить историю?',
      default: false,
    },
  ]);

  if ('reset' in answers && answers.reset) {
    this.store.set('compressed', {});
  }
}
