import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { Bulk, Alert, withProps, router } from '@erxes/ui/src';
import { IRouterProps } from '@erxes/ui/src/types';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PackageList from '../components/PackageList';
import { mutations, queries } from '../graphql';
import { PackagesQueryResponse } from '../types';

type Props = {
  queryParams: any;
  history: any;
};

type FinalProps = { packagesQuery: PackagesQueryResponse } & Props;

type State = {
  loading: boolean;
};

class PackageListContainer extends React.Component<FinalProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const { packagesQuery } = this.props;

    const packages = packagesQuery.packages || [];

    const updatedProps = {
      ...this.props,
      packages
    };

    const carsList = props => {
      return <PackageList {...updatedProps} {...props} />;
    };

    return <Bulk content={carsList} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, PackagesQueryResponse, {}>(gql(queries.packages), {
      name: 'packagesQuery'
    })
    // mutations
    // graphql<{}, RemoveMutationResponse, RemoveMutationVariables>(
    //   gql(mutations.carsRemove),
    //   {
    //     name: 'carsRemove',
    //     options: generateOptions
    //   }
    // ),
  )(PackageListContainer)
);
