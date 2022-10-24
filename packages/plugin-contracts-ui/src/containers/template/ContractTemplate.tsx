import React from 'react';
import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { queries } from '../../graphql';
import Spinner from '@erxes/ui/src/components/Spinner';
import { Alert, confirm } from '@erxes/ui/src/utils';
import { generatePaginationParams } from '@erxes/ui/src/utils/router';
import ContractTemplate from '../../components/template/ContractTemplate';
import {
  ContractTemplatesCountQueryResponse,
  ContractTemplatesQueryResponse
} from '../../types';

type Props = {
  queryParams: any;
  history: any;
};

type FinalProps = {
  contractTemplatesQuery: ContractTemplatesQueryResponse;
  contractTemplatesCountQuery: ContractTemplatesCountQueryResponse;
} & Props;

function ContractTemplateContainer(props: FinalProps) {
  const { contractTemplatesQuery, contractTemplatesCountQuery } = props;
  console.log('ContractTemplateContainer');
  if (contractTemplatesQuery.loading || contractTemplatesQuery.loading) {
    return <Spinner objective={true} />;
  }

  const contractTemplates = contractTemplatesQuery.contractTemplates || [];
  const contractTemplateTotalCounts =
    contractTemplatesCountQuery.contractTemplateTotalCounts || 0;

  const updatedProps = {
    ...props,
    contractTemplates,
    contractTemplateTotalCounts,
    loading: contractTemplatesQuery.loading
  };

  return <ContractTemplate {...updatedProps} />;
}

export default compose(
  graphql<
    Props,
    ContractTemplatesQueryResponse,
    { page: number; perPage: number }
  >(gql(queries.contractTemplates), {
    name: 'contractTemplatesQuery',
    options: ({ queryParams }) => ({
      variables: {
        searchValue: queryParams.searchValue,
        categoryId: queryParams.categoryId,
        ...generatePaginationParams(queryParams)
      },
      fetchPolicy: 'network-only'
    })
  }),
  graphql<Props, ContractTemplatesCountQueryResponse>(
    gql(queries.contractTemplateTotalCounts),
    {
      name: 'contractTemplatesCountQuery',
      options: ({ queryParams }) => ({
        variables: {
          searchValue: queryParams.searchValue,
          categoryId: queryParams.categoryId,
          ...generatePaginationParams(queryParams)
        },
        fetchPolicy: 'network-only'
      })
    }
  )
)(ContractTemplateContainer);
