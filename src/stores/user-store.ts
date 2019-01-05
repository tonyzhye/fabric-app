import { action, observable, computed, runInAction } from 'mobx';

import { BaseStore } from './base-store';
import { AppStore } from './app-store';
import { KanbanSummary, UserInfoModel, NetworkStatus } from '../types';
import { 
  getUserInfo,
  getUserOwnedKanbans
} from '../api';

const defaultUser = {
  id: 0,
  fullName: '',
  email: '',
  pictureUrl: ''
} as UserInfoModel;

export class UserStore implements BaseStore {
  @observable public currentUser: UserInfoModel = Object.assign({}, defaultUser);
  @observable public kanbans: KanbanSummary[] = [];

  // Status
  @observable public statusUserInfo: NetworkStatus = NetworkStatus.Idle;
  @observable public statusErrorUserInfo: string = '';
  @observable public isUserInfoLoaded: boolean = false;

  @observable public statusKanbans: NetworkStatus = NetworkStatus.Idle;
  @observable public statusErrorKanbans: string = '';
  @observable public isKanbansLoaded: boolean = false;

  @computed get isLoading(): boolean {
    return (this.statusUserInfo === NetworkStatus.Loading) || 
      (this.statusKanbans === NetworkStatus.Loading);
  }

  public appStore: AppStore;

  constructor(appStore: AppStore) {
    this.appStore = appStore;
  }

  @action public reset(): void {
    this.currentUser = Object.assign({}, defaultUser);
    this.kanbans = [];

    this.isUserInfoLoaded = false;
    this.isKanbansLoaded = false;

    this.resetStatus();
  }

  @action public resetStatus(): void {
    this.resetStatusUserInfo();
    this.resetStatusKanbans();
  }

  @action public resetStatusUserInfo(): void {
    this.statusUserInfo = NetworkStatus.Idle;
    this.statusErrorUserInfo = '';
  }

  @action public resetStatusKanbans(): void {
    this.statusKanbans = NetworkStatus.Idle;
    this.statusErrorKanbans = '';
  }

  @action public setUserName(fullName: string): void {
    this.currentUser.fullName = fullName;
  }

  @action public setUserInfo(userInfo: UserInfoModel): void {
    this.currentUser = userInfo;
  }

  @action public setUserOwnedKanbans(kanbans: KanbanSummary[]): void {
    this.kanbans = kanbans;
  }

  @action public loadUserInfo(): void {
    this.resetStatusUserInfo();
    this.statusUserInfo = NetworkStatus.Loading;

    getUserInfo().then((userInfo) => {
      runInAction(() => {
        this.currentUser = userInfo;
        this.isUserInfoLoaded = true;
        this.statusUserInfo = NetworkStatus.Idle;
      });
    }).catch((reason) => {
      runInAction(() => {
        this.statusErrorUserInfo = reason;
        this.statusUserInfo = NetworkStatus.Error;
      });
    });
  }

  @action public loadUserOwnedKanbans(): void {
    this.resetStatusKanbans();
    this.statusKanbans = NetworkStatus.Loading;

    getUserOwnedKanbans().then((kanbans) => {
      runInAction(() => {
        this.kanbans = kanbans;
        this.statusKanbans = NetworkStatus.Idle;
      });
    }).catch((reason) => {
      runInAction(() => {
        this.statusErrorKanbans = reason;
        this.statusKanbans = NetworkStatus.Error;
      });
    });
  }

  @action public loadUserInfoAndKanbans(): void {
    this.loadUserInfo();
    this.loadUserOwnedKanbans();
  }
}