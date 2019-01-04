import React, { SFC } from 'react';
import { SiteNav } from '../../../components/site/site-nav';

import './index.scss';

const NotFound: SFC<{}> = () => {
  return (
    <div>
      <SiteNav />
      <div className="container yt-nomatch-bigmessage">
        <div className="row">
          <div className="col col-md-8 offset-md-2">
            <h1 className="no-match-header">The page your requested was not found</h1>

            <h4 className="no-match-sub-header">Follow a link from here?</h4>
            <p className="no-match-desc">
              If you reached this page from another part of our site, 
              please let us know so we can correct our mistake.
            </p>

            <h4 className="no-match-sub-header">Follow a link from another site?</h4>
            <p className="no-match-desc">
              Links from other sites can sometimes be 
              outdated or misspelled. 
              Let us know where you came from and 
              we can try to contact the other site in order to fix the problem.
            </p>

            <h4 className="no-match-sub-header">Type the text manually?</h4>
            <p className="no-match-desc">
              You may have typed the address (URL) incorrectly. 
              Check to make sure you’ve got the exact right spelling, 
              capitalization, etc. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
