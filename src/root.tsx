import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Route, Switch } from 'react-router';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
// import { isEmpty } from 'ramda';
import Loadable from 'react-loadable';

import { createStores } from './stores';
import { loadingPage } from './components/loading-page';

const Site = Loadable({
  loader: () => import(/* webpackChunkName: 'site' */'./pages/site'),
  loading: loadingPage,
});

// don't allow state modifications outside actions
configure({ enforceActions: 'observed' });

const history = createBrowserHistory();
const store = createStores(history);

/*
const token = getToken();
if (!isEmpty(token)) {
  store.auth.login(token);
  initRestAdapter();
}
*/

export default class Root extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  private getUrlPath(to: string): string {
    const encodeUrl = encodeURIComponent(window.location.href);
    return `${to}?url=${encodeUrl}`;
  }

  private renderNoneAuthRouters() {
    return (
      <Switch>
        <Route
          path="/m/"
          exact={true}
          component={Site}
        />
        <Route 
          path="/" 
          exact={true}
          component={Site}
        />
      </Switch>
    );
  }

  public render() {
    // const { auth } = store;
    // const isAuth = auth.authenticated;
    // const routers = (isAuth) ? this.renderAuthedRouters() : this.renderNoneAuthRouters();
    const routers = this.renderNoneAuthRouters();

    return (
      <div className="wrapper">
        <Router history={history}>
          <Provider 
            store={store}
            // auth={store.auth}
            // user={store.user}
            // kanban={store.kanban}
            router={store.router}
          >
            {routers}
          </Provider>
        </Router>
      </div>
    );
  }
}
