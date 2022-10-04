import asyncComponent from '@erxes/ui/src/components/AsyncComponent';
import React from 'react';
import { Route } from 'react-router-dom';

const Settings = asyncComponent(() =>
  import(
    /* webpackChunkName: "Zerocodeai - Settings" */ './containers/Settings'
  )
);

const routes = () => (
  <Route path="/settings/inboxaddon-zerocodeai/" component={Settings} />
);

export default routes;
