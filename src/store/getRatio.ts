import { type IStore } from '../classes/Store.js';

export type StoreGetRatioMethod = (hash: string | string[], format?: boolean) => string;

export default (function (this: IStore, hash, format?) {
  const hashes = Array.isArray(hash) ? hash : [hash];

  const ratio = hashes.reduce((acc, hash) => {
    const [original, compressed] = this.getSizes(hash) as number[];

    return acc + (1 - compressed / original);
  }, 0) / hashes.length;

  return (format ? ratio * 100 : ratio).toFixed(2);
}) as StoreGetRatioMethod;
