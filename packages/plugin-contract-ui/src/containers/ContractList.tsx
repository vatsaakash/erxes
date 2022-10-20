import { Alert, Bulk, router, withProps } from '@erxes/ui/src';
import { IRouterProps } from '@erxes/ui/src/types';
import { generatePaginationParams } from '@erxes/ui/src/utils/router';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import queryString from 'query-string';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import ContractList from '../components/ContractList';

import { mutations, queries } from '../graphql';
import {
  ContractRemoveMutationResponse,
  ContractsQueryResponse,
  ContractTotalCountQueryResponse
} from '../types';

type Props = {
  queryParams: any;
  history: any;
};

type FinalProps = {
  contractsQuery: ContractsQueryResponse;
  contractsTotalCountQuery: ContractTotalCountQueryResponse;
} & Props &
  IRouterProps &
  ContractRemoveMutationResponse;

type State = {
  loading: boolean;
};

const generateQueryParams = ({ location }) => {
  return queryString.parse(location.search);
};

class ContractListContainer extends React.Component<FinalProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const {
      contractsQuery,
      contractsRemove,
      contractsTotalCountQuery
    } = this.props;
    console.log(contractsQuery, 'nknjkjk');

    const removeContracts = ({ contractIds }, emptyBulk) => {
      contractsRemove({
        variables: { contractIds }
      })
        .then(() => {
          emptyBulk();
          Alert.success('You successfully deleted a contract');
        })
        .catch(e => {
          Alert.error(e.message);
        });
    };

    const searchValue = this.props.queryParams.searchValue || '';

    const contracts = contractsQuery.contracts || [];

    const totalCount = contractsTotalCountQuery.contractCounts || 0;

    const updatedProps = {
      ...this.props,
      totalCount,
      searchValue,
      contracts,
      loading: contractsQuery.loading || this.state.loading,
      removeContracts
    };

    const contractsList = props => {
      return (
        <ContractList
          {...updatedProps}
          {...props}
          {...router.generatePaginationParams(this.props.queryParams)}
        />
      );
    };

    return <Bulk content={contractsList} />;
  }
}

const generateOptions = () => ({
  refetchQueries: ['contracts', 'contractCounts', 'contractDetail']
});

export default withProps<Props>(
  compose(
    graphql<Props, ContractsQueryResponse, { page: number; perPage: number }>(
      gql(queries.contracts),
      {
        name: 'contractsQuery',
        options: ({ queryParams }) => ({
          variables: {
            searchValue: queryParams.searchValue,
            categoryId: queryParams.categoryId,
            ...generatePaginationParams(queryParams)
          },
          fetchPolicy: 'network-only'
        })
      }
    ),
    graphql<Props, ContractTotalCountQueryResponse>(
      gql(queries.contractCounts),
      {
        name: 'contractsTotalCountQuery',
        options: ({ queryParams }) => ({
          variables: {
            searchValue: queryParams.searchValue,
            categoryId: queryParams.categoryId,
            ...generatePaginationParams(queryParams)
          },
          fetchPolicy: 'network-only'
        })
      }
    ),
    // mutations
    graphql<{}, ContractRemoveMutationResponse, { contractIds: string[] }>(
      gql(mutations.contractsRemove),
      {
        name: 'contractsRemove',
        options: generateOptions
      }
    )
  )(withRouter<IRouterProps>(ContractListContainer))
);
