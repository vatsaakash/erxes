import asyncComponent from '@erxes/ui/src/components/AsyncComponent';
import React from 'react';
import { Route } from 'react-router-dom';

const List = asyncComponent(() =>
  import(/* webpackChunkName: "List - Templates" */ './containers/List')
);

const templates = ({ history }) => {
  return <List history={history} />;
};

const routes = () => {
  return <Route path="/templates/" component={templates} />;
};

export default routes;
