import { History } from 'history';

import { AppStore, AppStoreImpl } from './app-store';

export function createStores(history: History): AppStore {
  return new AppStoreImpl(history);
}
