import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
// import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import './index.scss';
import Root from './root';
import { gaCode, isMobile } from './config';
// TODO: enable PWA later
// import registerServiceWorker from './register-service-worker';

// Redirect to mobile version if needed
function redirectForMobile() {
  if (isMobile) {
    const pathname = window.location.pathname;
    const prefix = pathname.substring(0, 3);
    if (prefix !== '/m/') {
      const newPathname = '/m' + pathname;
      const origin = window.location.origin;
      const redirectUrl = origin + newPathname;
      window.location.href = redirectUrl;
    }
  }
}

function loadResource() {
  // tslint:disable-next-line
  if (window['Promise'] === undefined) {
    require('es6-promise').polyfill();
  }

  if (isMobile) {
    /**
     * Load needed resource for mobile
     */
    // require('./mobile-base.css');
  } else {
    /**
     * Load needed resource for desktop
     */
    // require('./desktop-base.css');
  }
}

initializeIcons();

redirectForMobile();

loadResource();

if (gaCode !== '') {
  ReactGA.initialize(gaCode);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(
  <Root />,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();