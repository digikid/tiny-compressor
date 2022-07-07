import commandLineUsage from 'command-line-usage';

import { type IApp } from '../classes/App.js';

export type HelpMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const sections = [
    {
      header: `${this.text('HELP_NAME')} ${this.packageJson.version}`,
      content: this.text('HELP_DESCRIPTION'),
    },
    {
      header: this.text('HELP_SYNOPSIS_TITLE'),
      content: [
        `$ ${this.packageJson.name} <options> <command>`,
        `$ ${this.packageJson.name} {bold --force} ...`,
        `$ ${this.packageJson.name} {bold -f -p} {underline compressed-images} ...`,
      ],
    },
    {
      header: this.text('HELP_OPTIONS_TITLE'),
      optionList: [
        {
          name: 'force',
          alias: 'f',
          type: Boolean,
          description: this.text('HELP_OPTIONS_FORCE_TEXT'),
        },
        {
          name: 'path',
          alias: 'p',
          type: String,
          description: this.text('HELP_OPTIONS_PATH_TEXT'),
        },
        {
          name: 'quiet',
          alias: 'q',
          type: Boolean,
          description: this.text('HELP_OPTIONS_QUIET_TEXT'),
        },
        {
          name: 'watch',
          alias: 'w',
          type: Boolean,
          description: this.text('HELP_OPTIONS_WATCH_TEXT'),
        },
      ],
    },
    {
      header: this.text('HELP_COMMANDS_TITLE'),
      content: [
        { name: 'config', summary: this.text('HELP_COMMANDS_CONFIG_TEXT') },
        { name: 'help', summary: this.text('HELP_COMMANDS_HELP_TEXT') },
        { name: 'reset', summary: this.text('HELP_COMMANDS_RESET_TEXT') },
        { name: 'stat', summary: this.text('HELP_COMMANDS_STAT_TEXT') },
        { name: 'version', summary: this.text('HELP_COMMANDS_VERSION_TEXT') },
      ],
    },
    {
      header: this.text('HELP_MORE_TITLE'),
      content: `${this.text('HELP_MORE_TEXT')} {underline ${this.packageJson.homepage}}`,
    },
  ];

  const usage = await commandLineUsage(sections);

  this.log.print(usage);
}) as HelpMethod;
