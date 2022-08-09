import React from 'react';
import { Route } from 'react-router-dom';
import PosHome from './pages/PosHome';
import PosLayout from './modules/pos/components/PosLayout';
import CurrentUser from './modules/auth/containers/CurrentUser';

const routes = () => {
  return (
    <>
      {/* <CurrentUser> */}
      <PosLayout>
        <Route exact path="/" component={PosHome} key="posHome" />
      </PosLayout>
      {/* </CurrentUser> */}
    </>
  );
};

export default routes;
