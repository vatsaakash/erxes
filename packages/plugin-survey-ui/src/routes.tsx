import asyncComponent from '@erxes/ui/src/components/AsyncComponent';
import React from 'react';
import { Route } from 'react-router-dom';

const List = asyncComponent(() =>
  import(/* webpackChunkName: "List - Surveys" */ './containers/List')
);

const surveys = ({ history }) => {
  return <List history={history} />;
};

const routes = () => {
  return <Route path="/surveys/" component={surveys} />;
};

export default routes;
