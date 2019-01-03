import React, { SFC } from 'react';

import './index.scss';

interface Props {}

export const SiteNav: SFC<Props> = (props) => {
  return (
    <nav className="top-nav">
      <div className="container-fluid no-gutters">
        <div className="row justify-content-between">
          <div className="col-8 col-md-6">
            <a className="navbar-brand" href="#">Kanban for One</a>
          </div>
          <div className="col-4 col-md-2">
            {props.children}
          </div>
        </div>
      </div>
    </nav>
  );
};
