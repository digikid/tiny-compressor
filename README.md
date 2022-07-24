<div align="center">
  <img alt="Tiny Compressor" src="https://github.com/digikid/tiny-compressor/raw/main/logo.png" height="117" />
  <h1>Tiny Compressor</h1>
  <p>A command line JPG, PNG and WebP images compressor using TinyPNG API.<br><b>API key is not required.</b></p>
  <p>
    <b>English</b> | <a href="https://github.com/digikid/tiny-compressor/blob/main/README.ru-RU.md">Русский</a></p>
  <img src="https://img.shields.io/github/release/digikid/tiny-compressor.svg?style=flat-square&logo=appveyor" alt="Release version">
  <img src="https://img.shields.io/github/languages/top/digikid/tiny-compressor.svg?style=flat-square&logo=appveyor" alt="TypeScript">
  <img src="https://img.shields.io/github/license/digikid/tiny-compressor.svg?style=flat-square&logo=appveyor" alt="MIT License">
</div>

## Why

- Provides up to 80% compression without noticeable quality loss
- Due to caching only changed files are uploaded to TinyPNG server
- Written in TypeScript

## Install

```shell
npm i -g digikid/tiny-compressor
```

## Usage

Navigate to folder containing images and run command:

```shell
cd path/to/images
tiny-compressor
```

The processed files will be saved to `/compressed` folder.

## Options

| Option             | Description                         |
|--------------------|-------------------------------------|
| <b>-f, --force</b> | Compress images regardless of cache |
| <b>-p, --path</b>  | Output folder name                  |
| <b>-q, --quiet</b> | Disable log                         |
| <b>-w, --watch</b> | Watch for file changes              |

### Caching

To avoid re-compression of files and reduce requests to TinyPNG server, all processed files are cached by default.

If you want to run compression regardless of cache, pass `-f` option:

```shell
tiny-compressor -f
```

### Output folder name

You can change output folder name (without saving in settings) by passing `-p` parameter:

```shell
tiny-compressor -p compressed-images
```

### Log

Notifications are generated each time files are processed. You can disable log with `-q` option:

```shell
tiny-compressor -q
```

### Watch

If you want to run compression whenever files in current folder are changed, pass `-w` option:

```shell
tiny-compressor -w
```

## Commands

| Command        | Description                   |
|----------------|-------------------------------|
| <b>config</b>  | Update settings               |
| <b>help</b>    | Display usage guide           |
| <b>reset</b>   | Clear cache                   |
| <b>stat</b>    | Print processed file history  |
| <b>version</b> | Print current package version |

### Config

Settings are saved locally and applied on all subsequent launches.

For settings update, run `config` command:

```shell
tiny-compressor config
```

### Help

The `help` command displays a help section with a list of available options and commands list:

```shell
tiny-compressor help
```

### Reset

Use `reset` command to clear processed files cache:

```shell
tiny-compressor reset
```

### Stat

For printing processed file history use command `stat`:

```shell
tiny-compressor stat
```

### Version

You can check installed package version with `version` command:

```shell
tiny-compressor version
```

## License

[The MIT License (MIT)](LICENSE)
