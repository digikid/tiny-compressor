import commandLineUsage from 'command-line-usage';

import { type IApp } from '../classes/App.js';

export default async function (this: IApp) {
  const sections = [
    {
      header: `Tiny Compressor ${this.packageJson.version}`,
      content:
                'Компрессор JPG, PNG и WebP изображений, использующий TinyPNG API.',
    },
    {
      header: 'Использование',
      content: [
        `$ ${this.packageJson.name}`,
        `$ ${this.packageJson.name} {bold --force} ...`,
        `$ ${this.packageJson.name} {bold --path} {underline compressed-images} ...`,
      ],
    },
    {
      header: 'Параметры',
      optionList: [
        {
          name: 'force',
          alias: 'f',
          type: Boolean,
          description: 'Обработать все файлы без учета кеша',
        },
        {
          name: 'path',
          alias: 'p',
          type: String,
          description: 'Название директории для обработанных изображений',
        },
        {
          name: 'quiet',
          alias: 'q',
          type: Boolean,
          description: 'Отключить уведомления',
        },
        {
          name: 'watch',
          alias: 'w',
          type: Boolean,
          description: 'Запустить слежение за изменением файлов',
        },
      ],
    },
    {
      header: 'Команды',
      optionList: [
        {
          name: 'config',
          alias: 'c',
          type: Boolean,
          description: 'Изменить настройки по умолчанию',
        },
        {
          name: 'help',
          alias: 'h',
          type: Boolean,
          description: 'Показать раздел справки',
        },
        {
          name: 'reset',
          alias: 'r',
          type: Boolean,
          description: 'Очистить кеш',
        },
        {
          name: 'stat',
          alias: 's',
          type: Boolean,
          description: 'Показать историю изменения файлов',
        },
      ],
    },
    {
      header: 'Подробнее',
      content: `Домашняя страница: {underline ${this.packageJson.homepage}}`,
    },
  ];

  const usage = await commandLineUsage(sections);

  console.log(usage);
}
