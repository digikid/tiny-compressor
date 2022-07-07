import { type IStore } from '../classes/Store.js';
import { formatBytes } from '../utils/number.js';

export type StoreGetSizesMethod = (hash: string | string[], format?: boolean) => number[] | string[];

export default (function (this: IStore, hash, format?) {
  const hashes = Array.isArray(hash) ? hash : [hash];

  const sizes = [0, 0];

  hashes.forEach((hash) => {
    const file = this.getFile(hash);

    if (file) {
      file.size.forEach((size, i) => {
        sizes[i] += size;
      });
    }
  });

  return format === true ? sizes.map(formatBytes) : sizes;
}) as StoreGetSizesMethod;
