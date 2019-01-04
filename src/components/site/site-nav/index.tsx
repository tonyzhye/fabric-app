import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

import { getWebSiginUrl } from '../../../utils';

import './index.scss';

export const SiteNav: SFC<{}> = (props) => {
  const signInUrl = getWebSiginUrl();

  return (
    <nav className="top-nav">
      <div className="container-fluid no-gutters">
        <div className="row justify-content-between">
          <div className="col-8 col-md-6">
            <Link to="/" className="navbar-brand">Kanban for One</Link>
          </div>
          <div className="col-4 col-md-2">
            <Link to={signInUrl} className="nav-signin">Sign in</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
