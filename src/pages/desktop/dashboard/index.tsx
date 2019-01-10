import React from 'react';
import { inject, observer } from 'mobx-react';

import { UserStore, KanbanStore, RouterStore } from '../../../stores';
import { STORE_USER, STORE_KANBAN, STORE_ROUTER } from '../../../constants';

import './index.scss';

export interface DashboardProps {
}

interface InjectedDashboardProps extends DashboardProps {
  userStore: UserStore;
  kanbanStore: KanbanStore;
  routerStore: RouterStore;
}

/*
@inject(allStore => ({
  user: allStore[STORE_USER] as UserStore,
  kanban: allStore[STORE_KANBAN] as KanbanStore,
  router: allStore[STORE_ROUTER] as RouterStore,
}))
*/
@inject(STORE_USER, STORE_KANBAN, STORE_ROUTER)
@observer
export default class Dashboard extends React.Component<DashboardProps, {}> {
  constructor(props: DashboardProps) {
    super(props);
  }

  get injected() {
    return this.props as InjectedDashboardProps;
  }

  componentDidMount() {
    const { userStore } = this.injected;
    userStore.loadUserInfoAndKanbans();
  }

  render() {
    return (
      <div>Dashboard</div>
    );
  }
}
