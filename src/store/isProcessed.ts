import { type IStore } from '../classes/Store.js';

export type StoreIsProcessedMethod = (hash: string) => boolean;

export default (function (this: IStore, hash) {
  const storeId = this.getStoreId(hash);

  return this.store.has(storeId);
}) as StoreIsProcessedMethod;
