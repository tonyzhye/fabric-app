import React from 'react';
import { LoadingComponentProps } from 'react-loadable';

import './index.scss';

export function loadingPage(props: LoadingComponentProps) {
  if (props.error) {
    // When the loader has errored
    return (
      <div id="loading-page-wrap">
        <div className="loading">
          <div className="text">
            Loading Error
          </div>
        </div>
      </div>
    );
  } else if (props.timedOut) {
    // When the loader has taken longer than the timeout
    return (
      <div id="loading-page-wrap">
        <div className="loading">
          <div className="text">
            Loading Timeout
          </div>
        </div>
      </div>
    );
  } else if (props.pastDelay) {
    // When the loader has taken longer than the delay
    return (
      <div id="loading-page-wrap">
        <div className="loading">
          <div className="bounceball" />
          <div className="text">Loading ...</div>
        </div>
      </div>
    );
  } else {
    // When the loader has just started
    return null;
  }
}
