import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Route, Switch, Redirect } from 'react-router';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { isEmpty } from 'ramda';
import Loadable from 'react-loadable';

import { createStores } from './stores';
import { loadingPage } from './components/loading-page';
import { getToken, initRestAdapter } from './api';

const Site = Loadable({
  loader: () => import(/* webpackChunkName: 'site' */'./pages/site'),
  loading: loadingPage,
});
const Login = Loadable({
  loader: () => import(/* webpackChunkName: 'login' */'./pages/desktop/login'),
  loading: loadingPage,
});
const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: 'notfound' */'./pages/desktop/not-found'),
  loading: loadingPage,
});

// don't allow state modifications outside actions
configure({ enforceActions: 'observed' });

const history = createBrowserHistory();
const store = createStores(history);

const token = getToken();
if (!isEmpty(token)) {
  store.auth.login(token);
  initRestAdapter();
}

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
          path="/m/signin"
          component={Login}
        />
        <Route 
          path="/signin" 
          component={Login}
        />
        <Route
          path="/m/kanban*"
          render={(_) => (
            <Redirect to={this.getUrlPath('/m/signin')} />
          )}
        />
        <Route
          path="/kanban*"
          render={(_) => (
            <Redirect to={this.getUrlPath('/signin')} />
          )}
        />
        <Route
          path="/m/"
          exact={true}
          component={Site}
        />
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
        <Route component={NotFound} />
      </Switch>
    );
  }

  private renderAuthedRouters() {
    /*
        <Route
          path="/m/kanban/:id(\d+)"
          component={MobileKanban}
        />
        <Route
          path="/kanban/:id(\d+)"
          component={Kanban}
        />

        <Route
          path="/m/"
          exact={true}
          component={MobileDashboard}
        />
        <Route 
          path="/" 
          exact={true}
          component={Dashboard}
        />
    */
    return (
      <Switch>
        <Route 
          path="/m/signin" 
          render={_ => (
            <Redirect to="/" />
          )} 
        />
        <Route 
          path="/signin" 
          render={_ => (
            <Redirect to="/" />
          )} 
        />
        <Route component={NotFound} />
      </Switch>
    );
  }

  public render() {
    const { auth } = store;
    const isAuth = auth.authenticated;
    const routers = (isAuth) ? this.renderAuthedRouters() : this.renderNoneAuthRouters();

    return (
      <div className="wrapper">
        <Router history={history}>
          <Provider 
            store={store}
            auth={store.auth}
            user={store.user}
            kanban={store.kanban}
            router={store.router}
          >
            {routers}
          </Provider>
        </Router>
      </div>
    );
  }
}
