
# tiny-compressor

![GitHub release](https://img.shields.io/github/release/digikid/tiny-compressor.svg)
[![dependencies Status](https://david-dm.org/digikid/tiny-compressor/status.svg)](https://david-dm.org/digikid/tiny-compressor)
[![devDependencies Status](https://david-dm.org/digikid/tiny-compressor/dev-status.svg)](https://david-dm.org/digikid/tiny-compressor?type=dev)

Автоматическая компрессия JPG и PNG изображений через сервис TinyPNG.

## Содержание

- [Подготовка к работе](#start)
- [Запуск](#run)
- [Настройки](#config)

<a name="start"></a>

## Подготовка к работе

Для запуска проекта необходимо наличие [Node.js](https://nodejs.org/), установите его с [официального сайта](https://nodejs.org/).

Проект запускается с использованием последней версии [Gulp](https://gulpjs.com/). Перед началом работы убедитесь, что Gulp установлен с помощью команды:

```shell
gulp -v
```

Для установки Gulp воспользуйтесь командой:

```shell
npm install --global gulp-cli
```

Если ранее вы уже устанавливали Gulp глобально, удалите его ([подробнее](https://medium.com/gulpjs/gulp-sips-command-line-interface-e53411d4467)) и установите пакет [gulp-cli](https://www.npmjs.com/package/gulp-cli):

```shell
npm rm --global gulp
npm install --global gulp-cli
```

После установки Gulp выполните установку необходимых зависимостей:

```shell
npm ci
```

<a name="build"></a>

## Запуск

1. Поместите изображения в директорию `/original`.

2. Воспользуйтесь командами:

```shell
# Перейдите в папку с проектом
cd /path/to/tiny-compressor/

# Запустите конвертацию
gulp
```
3. После конвертации запустится автоматическое слежение за файлами в папке  `/original`, поэтому вы можете добавлять в неё другие изображения без перезапуска скрипта.

> **Внимание!**
> Компрессия происходит через прямое обращение к серверу TinyPNG и поэтому является асинхронной операцией.
> Если в процессе выполнения произошли ошибки, добавьте или удалите изображения в папке `/original` либо запустите процесс заново.

<a name="config"></a>

## Настройки

Настройки проекта находятся в файле `./config.js`.

Параметр       | Тип     | По умолчанию     | Описание
-------------- | --------| ---------------- | -------------------------------------------------------------------------
paths          | object  | -                | Пути для входных и выходных файлов

## Лицензия

[The MIT License (MIT)](LICENSE)
