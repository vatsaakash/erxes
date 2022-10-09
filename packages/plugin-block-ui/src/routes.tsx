import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import asyncComponent from '@erxes/ui/src/components/AsyncComponent';

const PackageList = asyncComponent(() =>
  import(/* webpackChunkName: "PackageList" */ './containers/PackageList')
);

// const PackageDetails = asyncComponent(() =>
//   import(/* webpackChunkName: "PackageDetails" */ './containers/PackageDetails')
// );

// const details = ({ match }) => {
//   const id = match.params.id;

//   return <PackageDetails id={id} />;
// };

const list = ({ location, history }) => {
  return (
    <PackageList
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  );
};

const routes = () => {
  return (
    <React.Fragment>
      <Route
        key="/block/list"
        exact={true}
        path="/block/list"
        component={list}
      />

      {/* <Route
        key="/block/details/:id"
        exact={true}
        path="/block/details/:id"
        component={details}
      /> */}
    </React.Fragment>
  );
};

export default routes;
