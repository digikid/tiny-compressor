#!/usr/bin/env node

import { osLocale } from 'os-locale';

import App from './classes/App.js';

(async () => {
  const locale = await osLocale();
  const app = new App(locale);

  await app.init();
})();
