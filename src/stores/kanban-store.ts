import { action, observable, computed, runInAction } from 'mobx';

import { BaseStore } from './base-store';
import { AppStore } from './app-store';
import { 
  createKanban, 
  getKanban,
  updateKanban, 
  createMemo, 
  moveMemo, 
  updateMemo, 
  clearDoneMemos, 
  deleteMemo,
} from '../api';
import { KanbanModel, MemoModel, AccessLevel, Lane, RestError } from '../types';
import { ErrMsgMultiDoingMemos } from '../constants';

const defaultKanban = {
  id: 0,
  accessLevel: AccessLevel.Private,
  title: '',
  memos: [],
  createdAt: '',
  updatedAt: '',
} as KanbanModel;

function sortMemo(m1: MemoModel, m2: MemoModel): number {
  return m1.laneOrder - m2.laneOrder;
}
function filterMemo(memo: MemoModel, lane: Lane): boolean {
  return memo.lane === lane.toString();
}

export class KanbanStore implements BaseStore {
  
  @observable public id: number = 0;
  @observable public currentKanban: KanbanModel = Object.assign({}, defaultKanban);

  // Kanban page state
  @observable public mobilePageStateCurrentLane: number = 0;

  @computed get memos(): MemoModel[] { 
    return this.currentKanban.memos;
  }
  @computed get thingsTodoMemos(): MemoModel[] {
    return this.memos.filter(memo => filterMemo(memo, Lane.ThingsTodo)).sort(sortMemo);
  }
  @computed get nextMemos(): MemoModel[] {
    return this.memos.filter(memo => filterMemo(memo, Lane.Next)).sort(sortMemo);
  }
  @computed get waitingMemos(): MemoModel[] {
    return this.memos.filter(memo => filterMemo(memo, Lane.Waiting)).sort(sortMemo);
  }
  @computed get doingMemos(): MemoModel[] {
    return this.memos.filter(memo => filterMemo(memo, Lane.Doing)).sort(sortMemo);
  }
  @computed get doneMemos(): MemoModel[] {
    return this.memos.filter(memo => filterMemo(memo, Lane.Done)).sort(sortMemo);
  }
  @computed get notesMemos(): MemoModel[] {
    return this.memos.filter(memo => filterMemo(memo, Lane.Notes)).sort(sortMemo);
  }

  // Status
  public refLoadingCount: number = 0;
  @observable public isKanbanLoaded: boolean = false;
  @observable public errorMessage: string = '';
  @observable public loadFailed: boolean = false;
  @computed get isLoading(): boolean {
    return (this.refLoadingCount === 0);
  }

  public appStore: AppStore;

  constructor(appStore: AppStore) {
    this.appStore = appStore;
  }

  @action public reset(): void {
    this.id = 0;
    this.currentKanban = Object.assign({}, defaultKanban);
    this.refLoadingCount = 0;
    this.isKanbanLoaded = false;
    this.errorMessage = '';
    this.loadFailed = false;
  }

  @action public addRefCount(): void {
    this.refLoadingCount = this.refLoadingCount + 1;
  }

  @action public reduceRefCount(): void {
    if (this.refLoadingCount > 1) {
      this.refLoadingCount = this.refLoadingCount - 1;
    } else {
      this.refLoadingCount = 0;
    }
  }

  @action public createKanban(
    title: string, 
    withSampleData: boolean, 
    callback: (id: number | null, reason: string | null) => void
  ): void {
    this.addRefCount();
    createKanban(title, withSampleData).then((kanban) => {
      runInAction(() => {
        this.errorMessage = '';
      });
      this.appStore.user.loadUserOwnedKanbans();
      if (callback) {
        callback(kanban.id, null);
      }
    }).catch((reason) => {
      runInAction(() => {
        this.errorMessage = reason;
      });
      if (callback) {
        callback(null, reason);
      }
    }).then(() => {
      this.reduceRefCount();
    });
  }

  @action public getKanbanInfo(id: number): void {
    if (id < 1) { 
      return;
    }
    this.id = id;
    this.isKanbanLoaded = false;
    this.loadFailed = false;
    this.refreshKanban();
  }

  @action public updateKanbanTitle(title: string): void {
    const params = { title };

    this.addRefCount();
    updateKanban(this.id, params).then((kanban) => {
      // May just update title for better performance here
      this.refreshKanban();
    }).catch(() => {
      // handle error here
    }).then(() => {
      this.reduceRefCount();
    });
  }

  @action public refreshKanban(): void {
    if (this.id === 0) {
      return;
    }

    this.addRefCount();
    getKanban(this.id).then((kanban) => {
      runInAction(() => {
        this.currentKanban = kanban;
        this.errorMessage = '';
        this.isKanbanLoaded = true;
        this.loadFailed = false;
      });
    }).catch((reason: RestError) => {
      runInAction(() => {
        this.loadFailed = true;
        this.isKanbanLoaded = true;
        this.errorMessage = reason.message;
      });
    }).then(() => {
      this.reduceRefCount();
    });
  }

  @action public createMemo(
    subject: string, 
    lane: Lane, 
    laneOrder: number,
    description: string,
    callback?: (id: number | null, reason: string | null) => void
  ): void {
    // Should try using view model here later
    this.addRefCount();
    const params = {
      subject,
      lane: lane.toString(),
      laneOrder,
      description,
    };
    createMemo(this.id, params).then((memo) => {
      this.refreshKanban();
      if (callback) {
        callback(memo.id, null);
      }
    }).catch((reason) => {
      if (callback) {
        callback(null, reason);
      }
    }).then(() => {
      this.reduceRefCount();
    });
  }

  @action public updateMemoSubject(
    memoId: number, 
    subject: string,
    callback?: (reason: string | null) => void
  ): void {
    const params = {
      'subject': subject
    };

    this.addRefCount();
    updateMemo(this.id, memoId, params).then((newMemo) => {
      runInAction(() => {
        const index = this.getMemoIndexById(memoId);
        const memo = this.memos[index];
        this.memos[index] = Object.assign({}, memo, newMemo);
      });
      if (callback) {
        callback(null);
      }
    }).catch(reason => {
      if (callback) {
        callback(reason);
      }
    }).then(() => {
      this.reduceRefCount();
    });
  }

  @action public updateMemoDescription(
    memoId: number, 
    description: string,
    callback?: (reason: string | null) => void
  ): void {
    const params = {
      'description': description
    };

    this.addRefCount();
    updateMemo(this.id, memoId, params).then((newMemo) => {
      runInAction(() => {
        const index = this.getMemoIndexById(memoId);
        const memo = this.memos[index];
        this.memos[index] = Object.assign({}, memo, newMemo);
      });
      if (callback) {
        callback(null);
      }
    }).catch(reason => {
      if (callback) {
        callback(reason);
      }
    }).then(() => {
      this.reduceRefCount();
    });
  }

  @action public clearDoneMemos(): void {
    this.addRefCount();
    clearDoneMemos(this.id).then(() => {
      this.refreshKanban();
    }).catch(() => {
      // handle error here
    }).then(() => {
      this.reduceRefCount();
    });
  }

  @action public deleteMemo(memoId: number): void {
    this.addRefCount();
    deleteMemo(this.id, memoId).then(() => {
      this.refreshKanban();
    }).catch(() => {
      // handle error here
    }).then(() => {
      this.reduceRefCount();
    });
  }

  @action public moveMemo(
    memoId: number, 
    destLane: Lane, 
    destLaneOrder: number,
    callback?: (reason: string | null) => void
  ): void {
    const memo = this.memos.filter(m => m.id === memoId)[0];

    if (destLane === Lane.Doing && this.doingMemos.length > 0) {
      if (callback) {
        callback(ErrMsgMultiDoingMemos);
      }
      return;
    }

    this.addRefCount();
    // Should try using view model here later
    moveMemo(this.id, memo, destLane, destLaneOrder).then(() => {
      this.refreshKanban();
      if (callback) {
        callback(null);
      }
    }).catch((reason) => {
      if (callback) {
        callback(reason);
      }
    }).then(() => {
      this.reduceRefCount();
    });
  }

  @action public setMobilePageStateCurrentLane(index: number) {
    this.mobilePageStateCurrentLane = index;
  }

  public getMemoById = (memoId: number): MemoModel => {
    return this.memos[this.getMemoIndexById(memoId)];
  }

  public getMemoIndexById = (memoId: number): number => {
    return this.memos.findIndex(m => m.id === +memoId);
  }

  public getLane = (lane: string): MemoModel[] => {
    return this.memos.filter( x => x.lane.toString() === lane);
  }
}
