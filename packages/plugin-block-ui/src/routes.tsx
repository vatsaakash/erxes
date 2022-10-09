import App from './App';
import React from 'react';
import { Route } from 'react-router-dom';

const blocks = () => {
  return <App />;
};

const routes = () => {
  return <Route path="/blocks/" component={blocks} />;
};

export default routes;
