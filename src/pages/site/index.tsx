import React, { SFC } from 'react';

import { SiteNav } from '../../components/site/site-nav';

const Site: SFC<{}> = () => {
  return (
    <div>
      <SiteNav>
        Navs here !!!
      </SiteNav>
      <main id="main-site-content">
        Site page
      </main>
    </div>
  );
};

export default Site;
