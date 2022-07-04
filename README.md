<div align="center">
  <img alt="TinyCompressor" src="https://github.com/digikid/tiny-compressor/raw/main/logo.png" height="117" />
</div>

<div align="center">
  <h1>TinyCompressor</h1>
  <p>Компрессор JPG, PNG и WebP изображений, использующий TinyPNG API.<br><b>Не требует использования API ключа.</b></p>
  <img src="https://img.shields.io/github/release/digikid/tiny-compressor.svg?style=flat-square&logo=appveyor" alt="Release version">
  <img src="https://img.shields.io/github/languages/top/digikid/tiny-compressor.svg?style=flat-square&logo=appveyor" alt="TypeScript">
  <img src="https://img.shields.io/github/license/digikid/tiny-compressor.svg?style=flat-square&logo=appveyor" alt="MIT License">
  <br>
  <br>
</div>

## Преимущества

- В отличие от других компрессоров позволяет добиваться до 80% сжатия без ощутимой потери качества
- За счет кеширования снижается количество обращений к серверу и обрабатываются только изменившиеся файлы
- Написан на TypeScript

## Установка

```shell
npm i digikid/tiny-compressor
```

## Запуск

Перейдите в директорию с изображениями и запустите команду:

```shell
tiny-compressor
```

После этого обработанные изображения будут сохранены в папку `/compressed` с учетом вложенности.

## Настройка

### Список параметров

| Параметр            | Описание                                         |
|---------------------|--------------------------------------------------|
| <b>-c, --config</b> | Изменить настройки по умолчанию                  |
| <b>-f, --force</b>  | Обработать все файлы без учета кеша              |
| <b>-h, --help</b>   | Показать раздел справки                          |
| <b>-p, --path</b>   | Название директории для обработанных изображений |
| <b>-q, --quiet</b>  | Отключить уведомления                            |
| <b>-r, --reset</b>  | Очистить кеш                                     |
| <b>-s, --stat</b>   | Показать историю изменения файлов                |
| <b>-w, --watch</b>  | Запустить слежение за изменением файлов          |

### Кеширование

Для исключения повторной компрессии файлов и уменьшения количества запросов к серверу TinyPNG, все обработанные файлы по умолчанию попадают в кеш.

Если вы хотите запустить компрессию, игнорируя кэш, передайте флаг `-f`:

```shell
tiny-compressor -f
```

Для очистки кеша воспользуйтесь командой:

```shell
tiny-compressor -r
```

### Название папки

Изменить название для папки с обработанными изображениями (без сохранения в настройках) можно командой:

```shell
tiny-compressor -p compressed-images
```

### Изменение настроек

Настройки сохраняются локально и применяются при всех последующих запусках.

Чтобы изменить их, запустите компрессор с параметром `-c`:

```shell
tiny-compressor -c
```

### Показ уведомлений

По умолчанию при каждой обработке файлов генерируются уведомления, которые можно отключить через флаг `-q`:

```shell
tiny-compressor -q
```

### История изменения файлов

Для просмотра истории изменения файлов (кеша) используйте флаг `-s`:

```shell
tiny-compressor -s
```

### Слежение за файлами

Для запуска компрессии при каждом изменении файлов в текущей папке передайте параметр `-w`:

```shell
tiny-compressor -w
```

## Лицензия

[The MIT License (MIT)](LICENSE)
