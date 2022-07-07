import { type IStore, type IStoreFile } from '../classes/Store.js';

export type StoreAddFileMethod = (hash: string, data: IStoreFile) => void;

export default (function (this: IStore, hash, data) {
  const storeId = this.getStoreId(hash);

  this.store.set(storeId, data);
}) as StoreAddFileMethod;
