import { action } from 'mobx';

import { BaseStore } from './base-store';
import { AppStore } from './app-store';
import { initRestAdapter, removeToken } from '../api';

export class AuthStore implements BaseStore {
  public authenticated: boolean = false;
  public token: string = '';
  public appStore: AppStore;

  constructor(appStore: AppStore) {
    this.appStore = appStore;
  }

  @action public reset(): void {
    this.authenticated = false;
    this.token = '';
  }

  @action public login(token: string): void {
    this.authenticated = true;
    this.token = token;
  }

  @action public initNetwork(): void {
    initRestAdapter();
  }

  @action public logout(): void {
    removeToken();
    this.authenticated = false;
    this.token = '';
  }
}
