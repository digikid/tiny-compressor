import { type IStore } from '../classes/Store.js';

export type StoreRemoveFileMethod = (hash: string) => void;

export default (function (this: IStore, hash) {
  const storeId = this.getStoreId(hash);

  this.store.delete(storeId);
}) as StoreRemoveFileMethod;
