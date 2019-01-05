import { History } from 'history';
import { action } from 'mobx';

import { RouterStore } from './router-store';
import { AuthStore } from './auth-store';
import { UserStore } from './user-store';
import { KanbanStore } from './kanban-store';

export interface AppStore {
  router: RouterStore;
  auth: AuthStore;
  user: UserStore;
  kanban: KanbanStore;

  reset(): void;
}

export class AppStoreImpl implements AppStore {
  public router: RouterStore;
  public auth: AuthStore;
  public user: UserStore;
  public kanban: KanbanStore;

  constructor(history: History) {
    this.router = new RouterStore(history);
    this.auth = new AuthStore(this);
    this.user = new UserStore(this);
    this.kanban = new KanbanStore(this);
  }

  @action public reset() {
    this.auth.reset();
    this.user.reset();
    this.kanban.reset();
  }
}