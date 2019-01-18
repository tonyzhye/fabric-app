import React from 'react';
import { inject, observer } from 'mobx-react';

import { UserStore, KanbanStore, RouterStore } from '../../../stores';
import { STORE_USER, STORE_KANBAN, STORE_ROUTER } from '../../../constants';

import './index.scss';

export interface DashboardProps {
}

interface InjectedDashboardProps extends DashboardProps {
  user: UserStore;
  kanban: KanbanStore;
  router: RouterStore;
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
    const { user } = this.injected;
    user.loadUserInfoAndKanbans();
  }

  render() {
    return (
      <div>Dashboard</div>
    );
  }
}
