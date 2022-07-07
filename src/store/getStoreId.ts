import { type IStore } from '../classes/Store.js';

export type StoreGetIdMethod = (hash: string) => string;

export default (function (this: IStore, hash) {
  const path = this.store.get('path');

  return `${path}.${hash}`;
}) as StoreGetIdMethod;
