import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { AppStore, UserStore } from '../../../stores';
import { STORE_APP, STORE_USER } from '../../../constants';

import './index.scss';

export interface BaseMasterProps
{
  leftHeading?: JSX.Element;
  showUserMenu?: boolean;
}

interface InjectedBaseMasterProps extends BaseMasterProps {
  user: UserStore;
  app: AppStore;
}

/**
 * The master template page for all kanban app pages.
 */
@inject(STORE_USER, STORE_APP)
@observer
export class BaseMaster extends React.Component<BaseMasterProps, {}> {

  constructor(props: BaseMasterProps) {
    super(props);
    // this.handleUserMenuClick = this.handleUserMenuClick.bind(this);
  }

  get injected() {
    return this.props as InjectedBaseMasterProps;
  }

  componentDidMount() {
    const { showUserMenu, user } = this.injected;
    if (showUserMenu && !user!.isUserInfoLoaded) {
      user!.loadUserInfoAndKanbans();
    }
  }

  public render() {
    return (
      <div>
        {this.renderHeader()}
        {this.props.children}
      </div>
    );
  }

  private renderHeader() {
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark kfo-navbar">
          {this.renderLeftHeading()}
        </nav>
      </header>
    );
  }

  private renderLeftHeading() {
    const { leftHeading } = this.props;
    if (leftHeading !== undefined) {
      return leftHeading;
    } else {
      return (
        <Link to="/" className="navbar-brand">
          Kanban <span className="kfo-short-desc">for One</span>
        </Link>
      );
    }
  }
}
