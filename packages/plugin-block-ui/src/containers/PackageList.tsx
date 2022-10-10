import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { Bulk, Alert, withProps, router } from '@erxes/ui/src';
import { IRouterProps } from '@erxes/ui/src/types';
import { generatePaginationParams } from '@erxes/ui/src/utils/router';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PackageList from '../components/PackageList';
import { mutations, queries } from '../graphql';
import {
  packageRemoveMutationResponse,
  PackagesQueryResponse,
  packageTotalCountQueryResponse
} from '../types';

type Props = {
  queryParams: any;
  history: any;
  type?: string;
};

type FinalProps = {
  packagesQuery: PackagesQueryResponse;
  packageTotalCountQuery: packageTotalCountQueryResponse;
} & Props &
  IRouterProps &
  packageRemoveMutationResponse;

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
    const {
      packagesQuery,
      packageTotalCountQuery,
      queryParams,
      packagesRemove
    } = this.props;

    const removePackage = ({ packageIds }, emptyBulk) => {
      packagesRemove({
        variables: { packageIds }
      })
        .then(() => {
          emptyBulk();
          Alert.success('You successfully deleted a packages');
        })
        .catch(e => {
          Alert.error(e.message);
        });
    };

    const packages = packagesQuery.packages || [];

    const searchValue = this.props.queryParams.searchValue || '';

    const updatedProps = {
      ...this.props,
      packages,
      queryParams,
      searchValue,
      packageCount: packageTotalCountQuery.packageCounts || 0,
      loading: packagesQuery.loading || this.state.loading,
      removePackage
    };

    const carsList = props => {
      return <PackageList {...updatedProps} {...props} />;
    };

    return <Bulk content={carsList} />;
  }
}

const getRefetchQueries = () => {
  return ['packageCounts', 'packages'];
};

const options = () => ({
  refetchQueries: getRefetchQueries()
});

export default withProps<Props>(
  compose(
    graphql<Props, PackagesQueryResponse, { page: number; perPage: number }>(
      gql(queries.packages),
      {
        name: 'packagesQuery',
        options: ({ queryParams }) => ({
          variables: {
            searchValue: queryParams.searchValue,
            level: queryParams.level,
            type: queryParams.type,
            ...generatePaginationParams(queryParams)
          },
          fetchPolicy: 'network-only'
        })
      }
    ),
    graphql<Props, packageTotalCountQueryResponse>(gql(queries.packageCounts), {
      name: 'packageTotalCountQuery',
      options: () => ({
        fetchPolicy: 'network-only'
      })
    }),
    // mutations
    graphql<{}, packageRemoveMutationResponse, { packageIds: string[] }>(
      gql(mutations.packagesRemove),
      {
        name: 'packagesRemove',
        options
      }
    )
  )(withRouter<IRouterProps>(PackageListContainer))
);
