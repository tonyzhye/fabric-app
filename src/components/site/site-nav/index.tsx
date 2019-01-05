import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

import { getWebSiginUrl } from '../../../utils';

import './index.scss';

export interface SiteNavProps {
  showSignIn?: boolean;
}

export const SiteNav: SFC<SiteNavProps> = (props) => {
  let signInPlace = null;
  if (props.showSignIn) {
    const url = getWebSiginUrl();
    signInPlace = (
      <Link to={url} className="nav-signin">Sign in</Link>
    );
  }

  return (
    <nav className="top-nav">
      <div className="container-fluid no-gutters">
        <div className="row justify-content-between">
          <div className="col-8 col-md-6">
            <Link to="/" className="navbar-brand">Kanban for One</Link>
          </div>
          <div className="col-4 col-md-2">
            {signInPlace}
          </div>
        </div>
      </div>
    </nav>
  );
};

SiteNav.defaultProps = {
  showSignIn: true,
};
