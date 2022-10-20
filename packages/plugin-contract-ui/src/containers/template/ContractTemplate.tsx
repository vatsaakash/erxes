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
import { Alert, confirm } from '@erxes/ui/src/utils';
import { generatePaginationParams } from '@erxes/ui/src/utils/router';
import ContractTemplate from '../../components/template/ContractTemplate';

type Props = {
  queryParams: any;
  history: any;
};

type FinalProps = {
  contractCategoriesQuery: ContractCategoriesQueryResponse;
  contractCategoriesCountQuery: ContractCategoriesCountQueryResponse;
} & Props;

function ContractTemplateContainer(props: FinalProps) {
  const { contractCategoriesQuery, contractCategoriesCountQuery } = props;

  if (contractCategoriesQuery.loading || contractCategoriesQuery.loading) {
    return <Spinner objective={true} />;
  }

  const contractCategories = contractCategoriesQuery.contractCategories || [];
  const contractCategoriesCount =
    contractCategoriesCountQuery.contractCategoriesTotalCount || 0;

  const updatedProps = {
    ...props,
    contractCategories,
    contractCategoriesCount
  };

  return <ContractTemplate {...updatedProps} />;
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
)(ContractTemplateContainer);
