import commandLineUsage from 'command-line-usage';

import { type IApp } from '../classes/App.js';

export type HelpMethod = () => Promise<void>;

export default (async function (this: IApp) {
  const sections = [
    {
      header: `${this.message('HELP_NAME')} ${this.packageJson.version}`,
      content: this.message('HELP_DESCRIPTION'),
    },
    {
      header: this.message('HELP_SYNOPSIS_TITLE'),
      content: [
        `$ ${this.packageJson.name} <options> <command>`,
        `$ ${this.packageJson.name} {bold --force} ...`,
        `$ ${this.packageJson.name} {bold -f -p} {underline compressed-images} ...`,
      ],
    },
    {
      header: this.message('HELP_OPTIONS_TITLE'),
      optionList: [
        {
          name: 'force',
          alias: 'f',
          type: Boolean,
          description: this.message('HELP_OPTIONS_FORCE_TEXT'),
        },
        {
          name: 'path',
          alias: 'p',
          type: String,
          description: this.message('HELP_OPTIONS_PATH_TEXT'),
        },
        {
          name: 'quiet',
          alias: 'q',
          type: Boolean,
          description: this.message('HELP_OPTIONS_QUIET_TEXT'),
        },
        {
          name: 'watch',
          alias: 'w',
          type: Boolean,
          description: this.message('HELP_OPTIONS_WATCH_TEXT'),
        },
      ],
    },
    {
      header: this.message('HELP_COMMANDS_TITLE'),
      content: [
        { name: 'config', summary: this.message('HELP_COMMANDS_CONFIG_TEXT') },
        { name: 'help', summary: this.message('HELP_COMMANDS_HELP_TEXT') },
        { name: 'reset', summary: this.message('HELP_COMMANDS_RESET_TEXT') },
        { name: 'stat', summary: this.message('HELP_COMMANDS_STAT_TEXT') },
        { name: 'version', summary: this.message('HELP_COMMANDS_VERSION_TEXT') },
      ],
    },
    {
      header: this.message('HELP_MORE_TITLE'),
      content: `${this.message('HELP_MORE_TEXT')} {underline ${this.packageJson.homepage}}`,
    },
  ];

  const usage = await commandLineUsage(sections);

  console.log(usage);
}) as HelpMethod;
