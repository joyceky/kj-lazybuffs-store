import React from 'react';
import { Route, browserHistory, IndexRedirect } from 'react-router';
import Store from './components/Store';
import Login from './components/Login';
import StoreActive from './components/Store/StoreActive';
import StoreNewOrderForm from './components/Store/StoreNewOrderForm';
import StoreAnalytics from './components/Store/StoreAnalytics';
import StoreSettings from './components/Store/StoreSettings';

export default (
  <Route history={browserHistory}>
    <Route path="/" component={Store}>
      <IndexRedirect to='active' />
      <Route path='active' component={StoreActive} />
      <Route path='analytics' component={StoreAnalytics} />
      <Route path='new' component={StoreNewOrderForm} />
      <Route path='settings' component={StoreSettings} />
    </Route>
    <Route path="login" component={Login} />
  </Route>
);
