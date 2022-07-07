import { type IStore, type IStoreFile } from '../classes/Store.js';

export type StoreGetFileMethod = (hash: string) => IStoreFile | undefined;

export default (function (this: IStore, hash) {
  const storeId = this.getStoreId(hash);

  return this.store.get(storeId);
}) as StoreGetFileMethod;
