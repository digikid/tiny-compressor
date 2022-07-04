import { type IApp } from '../classes/App.js';

export default async function (this: IApp) {
  this.logger.reportAll();
}
