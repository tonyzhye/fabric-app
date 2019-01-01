import React, { SFC } from 'react';

import './index.scss';

interface Props {}

export const SiteNav: SFC<Props> = (props) => {
  return (
    <nav className="top-nav">
      {props.children}
    </nav>
  );
};
