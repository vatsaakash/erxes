import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import asyncComponent from '@erxes/ui/src/components/AsyncComponent';

const ContractList = asyncComponent(() =>
  import(/* webpackChunkName: "PackageList" */ './containers/ContractList')
);

const ContractDetails = asyncComponent(() =>
  import(
    /* webpackChunkName: "ContractDetails" */ './containers/detail/ContractDetails'
  )
);

const ContractTemplate = asyncComponent(() =>
  import(
    /* webpackChunkName: "ContractTemplate" */ './containers/template/ContractTemplate'
  )
);

const contractList = ({ location, history }) => {
  return (
    <ContractList
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const contractDetails = ({ match }) => {
  const id = match.params.id;

  return <ContractDetails id={id} />;
};

const contractTemplate = ({ location, history }) => {
  return (
    <ContractTemplate
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const routes = () => {
  return (
    <React.Fragment>
      <Route
        key="/contracts"
        exact={true}
        path="/contracts"
        component={contractList}
      />
      <Route
        key="/contract/details/:id"
        exact={true}
        path="/contract/details/:id"
        component={contractDetails}
      />
      <Route
        key="/contract-template"
        exact={true}
        path="/contract-template"
        component={contractTemplate}
      />
    </React.Fragment>
  );
};

export default routes;
