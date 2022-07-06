import chalk, { type Color as ChalkColors, Modifiers as ChalkModifiers } from 'chalk';

import { type IApp } from '../classes/App.js';

export type ChalkOptions = (ChalkColors | ChalkModifiers)[];

export type MessageMethod = (key: string, ...options: ChalkOptions) => string;

export default (function (this: IApp, key: string, ...options: ChalkOptions) {
  const text = (key in this.locale) ? this.locale[key] : '';

  if (options.length) {
    return options.reduce((acc, option) => chalk[option](acc), text);
  }

  return text;
}) as MessageMethod;
