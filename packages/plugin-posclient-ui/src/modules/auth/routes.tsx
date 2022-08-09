import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import SignInContainer from './containers/SignIn';

const SignIn = () => (
  <AuthLayout>
    <SignInContainer />
  </AuthLayout>
);

const routes = () => {
  return (
    <Switch>
      <Route path="*" component={SignIn} />
    </Switch>
  );
};

export default routes;
