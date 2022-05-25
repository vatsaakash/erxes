import React from 'react';
import DanSettings from './components/DanSettings';
import Settings from './containers/Settings';
import asyncComponent from '@erxes/ui/src/components/AsyncComponent';
import { Route } from 'react-router-dom';

const Home = asyncComponent(() =>
  import(/* webpackChunkName: "Plugin emongolia" */ './components/DanSettings')
);

const danSettings = () => {
  return <Settings components={DanSettings}></Settings>;
};

const DanRoutes = () => (
  <Route path="/settings/dan-settings" component={danSettings} />
);

export default DanRoutes;
