import React from 'react';
import { inject, observer } from 'mobx-react';

import { UserStore, KanbanStore, RouterStore } from '../../../stores';
import { STORE_USER, STORE_KANBAN, STORE_ROUTER } from '../../../constants';

import './index.scss';

interface DashboardProps {
  user?: UserStore;
  kanban?: KanbanStore;
  router?: RouterStore;
}

@inject(allStore => ({
  user: allStore[STORE_USER] as UserStore,
  kanban: allStore[STORE_KANBAN] as KanbanStore,
  router: allStore[STORE_ROUTER] as RouterStore,
}))
@observer
export default class Dashboard extends React.Component<DashboardProps, {}> {
  constructor(props: DashboardProps) {
    super(props);
  }

  public render() {
    return (
      <div>Dashboard</div>
    );
  }
}
