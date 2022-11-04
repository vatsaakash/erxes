import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import asyncComponent from '@erxes/ui/src/components/AsyncComponent';

const ContractList = asyncComponent(() =>
  import(/* webpackChunkName: "PackageList" */ './containers/ContractList')
);

const ContractTemplate = asyncComponent(() =>
  import(
    /* webpackChunkName: "ContractTemplate" */ './containers/template/ContractTemplate'
  )
);

const ContractForm = asyncComponent(() =>
  import(
    /* webpackChunkName: "ContractForm" */ './containers/template/ContractTemplateForm'
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

const contractTemplate = ({ location, history }) => {
  return (
    <ContractTemplate
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const contractForm = ({ location, history }) => {
  return (
    <ContractForm
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const contractEdit = ({ match, history }) => {
  const id = match.params.id;

  return <ContractForm id={id} history={history} />;
};

const routes = () => {
  return (
    <React.Fragment>
      <Route
        key="/contracts/create"
        path="/contracts/create"
        exact={true}
        component={contractForm}
      />
      <Route
        key="/contracts/edit/:id"
        path="/contracts/edit/:id"
        exact={true}
        component={contractEdit}
      />
      <Route
        key="/contracts"
        exact={true}
        path="/contracts"
        component={contractList}
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
