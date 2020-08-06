import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateOrderComponent from '../component/CreateOrderComponent';
import OrderListComponent from '../component/OrderListComponent';
import AppHeaderComponent from '../component/AppHeaderComponent';

export default function AppRouter() {
  return (
    <Router>
      <AppHeaderComponent />
      <Switch>
        <Route exact path='/' component={CreateOrderComponent} />
        <Route exact path='/list' component={OrderListComponent} />
      </Switch>
    </Router>
  );
}
