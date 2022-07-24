<div align="center">
  <img alt="Tiny Compressor" src="https://github.com/digikid/tiny-compressor/raw/main/logo.png" height="117" />
  <h1>Tiny Compressor</h1>
  <p>Компрессор JPG, PNG и WebP изображений, использующий TinyPNG API.<br><b>Не требует использования API ключа.</b></p>
  <p>
    <a href="https://github.com/digikid/tiny-compressor/blob/main/README.md">English</a> | <b>Русский</b></p>
  <img src="https://img.shields.io/github/release/digikid/tiny-compressor.svg?style=flat-square&logo=appveyor" alt="Release version">
  <img src="https://img.shields.io/github/languages/top/digikid/tiny-compressor.svg?style=flat-square&logo=appveyor" alt="TypeScript">
  <img src="https://img.shields.io/github/license/digikid/tiny-compressor.svg?style=flat-square&logo=appveyor" alt="MIT License">
</div>

## Преимущества

- Обеспечивает сжатие до 80% от исходного размера файла без ощутимой потери качества
- За счет кеширования снижается количество обращений к серверу и обрабатываются только изменившиеся файлы
- Написан на TypeScript

## Установка

```shell
npm i -g digikid/tiny-compressor
```

## Запуск

Перейдите в папку с изображениями и запустите команду:

```shell
cd path/to/images
tiny-compressor
```

После этого обработанные изображения будут сохранены в папку `/compressed` с учетом вложенности.

## Настройка

| Параметр            | Описание                                |
|---------------------|-----------------------------------------|
| <b>-f, --force</b>  | Обработать все файлы без учета кеша     |
| <b>-p, --path</b>   | Имя папки для обработанных изображений  |
| <b>-q, --quiet</b>  | Отключить уведомления                   |
| <b>-w, --watch</b>  | Запустить слежение за изменением файлов |

### Кеширование

Для исключения повторной компрессии файлов и уменьшения количества запросов к серверу TinyPNG, все обработанные файлы по умолчанию попадают в кеш.

Если вы хотите запустить компрессию, игнорируя кэш, передайте параметр `-f`:

```shell
tiny-compressor -f
```

### Имя папки

Изменить имя для папки с обработанными изображениями (без сохранения в настройках) можно через передачу параметра `-p`:

```shell
tiny-compressor -p compressed-images
```

### Лог

По умолчанию при каждой обработке файлов генерируются уведомления, которые можно отключить через параметр `-q`:

```shell
tiny-compressor -q
```

### Слежение за файлами

Для запуска компрессии при каждом изменении файлов в текущей папке передайте параметр `-w`:

```shell
tiny-compressor -w
```

## Команды

| Команда        | Описание                          |
|----------------|-----------------------------------|
| <b>config</b>  | Изменить настройки по умолчанию   |
| <b>help</b>    | Показать раздел справки           |
| <b>reset</b>   | Очистить кеш                      |
| <b>stat</b>    | Показать историю изменения файлов |
| <b>version</b> | Показать текущую версию           |

### Изменение настроек

Настройки сохраняются локально и применяются при всех последующих запусках.

Чтобы изменить их, запустите команду `config`:

```shell
tiny-compressor config
```

### Раздел справки

Команда `help` отображает справочный раздел со списком доступных параметров и команд:

```shell
tiny-compressor help
```

### Очистка кеша

Для очистки кеша воспользуйтесь командой `reset`:

```shell
tiny-compressor reset
```

### История изменения файлов

Для просмотра истории изменения файлов вызовите команду `stat`:

```shell
tiny-compressor stat
```

### Текущая версия

Для просмотра текущей версии установленного пакета запустите команду `version`:

```shell
tiny-compressor version
```

## Лицензия

[The MIT License (MIT)](LICENSE)
