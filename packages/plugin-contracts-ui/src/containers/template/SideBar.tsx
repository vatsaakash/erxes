import React from 'react';
import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { queries } from '../../graphql';
import {
  ContractCategoriesCountQueryResponse,
  ContractCategoriesQueryResponse
} from '../../types';
import Spinner from '@erxes/ui/src/components/Spinner';
import SideBar from '../../components/template/SideBar';

type Props = {
  queryParams: any;
  history: any;
};

type FinalProps = {
  contractCategoriesQuery: ContractCategoriesQueryResponse;
  contractCategoriesCountQuery: ContractCategoriesCountQueryResponse;
} & Props;

class SideBarContainer extends React.Component<FinalProps> {
  render() {
    const {
      contractCategoriesQuery,
      contractCategoriesCountQuery
    } = this.props;

    if (contractCategoriesQuery.loading || contractCategoriesQuery.loading) {
      return <Spinner objective={true} />;
    }

    const contractCategories = contractCategoriesQuery.contractCategories || [];
    const contractCategoriesCount =
      contractCategoriesCountQuery.contractCategoriesTotalCount || 0;

    const updatedProps = {
      ...this.props,
      contractCategories,
      loading: contractCategoriesQuery.loading,
      contractCategoriesCount
    };

    return <SideBar {...updatedProps} />;
  }
}

export default compose(
  graphql<Props, ContractCategoriesQueryResponse, { parentId: string }>(
    gql(queries.contractCategories),
    {
      name: 'contractCategoriesQuery',
      options: {
        fetchPolicy: 'network-only'
      }
    }
  ),
  graphql<Props, ContractCategoriesCountQueryResponse>(
    gql(queries.contractCategoriesTotalCount),
    {
      name: 'contractCategoriesCountQuery'
    }
  )
)(SideBarContainer);
