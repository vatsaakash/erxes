import React from 'react';
import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { mutations, queries } from '../../graphql';
import Spinner from '@erxes/ui/src/components/Spinner';
import { Alert, confirm, withProps } from '@erxes/ui/src/utils';
import { generatePaginationParams } from '@erxes/ui/src/utils/router';
import ContractTemplate from '../../components/template/ContractTemplate';
import {
  ContractTemplateDuplicateMutationResponse,
  ContractTemplateRemoveMutationResponse,
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
} & Props &
  ContractTemplateRemoveMutationResponse &
  ContractTemplateDuplicateMutationResponse;

type State = {
  loading: boolean;
};

class ContractTemplateContainer extends React.Component<FinalProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }
  render() {
    const {
      contractTemplatesQuery,
      contractTemplatesCountQuery,
      contractTemplateRemove,
      contractTemplatesDuplicate
    } = this.props;

    if (contractTemplatesQuery.loading) {
      return null;
    }

    const duplicate = (templateId: string) => {
      confirm().then(() => {
        contractTemplatesDuplicate({
          variables: { _id: templateId }
        })
          .then(() => {
            Alert.success('You successfully duplicate a contract template.');
          })
          .catch(e => {
            Alert.error(e.message);
          });
      });
    };

    const removeTemplate = (templateId: string) => {
      confirm().then(() => {
        contractTemplateRemove({
          variables: { _id: templateId }
        })
          .then(() => {
            Alert.success('You successfully deleted a contract template.');
          })
          .catch(e => {
            Alert.error(e.message);
          });
      });
    };

    const contractTemplates = contractTemplatesQuery.contractTemplates || [];
    const contractTemplateTotalCounts =
      contractTemplatesCountQuery.contractTemplateTotalCounts || 0;
    const searchValue = this.props.queryParams.searchValue || '';

    const updatedProps = {
      ...this.props,
      contractTemplates,
      contractTemplateTotalCounts,
      searchValue,
      loading: contractTemplatesQuery.loading || this.state.loading,
      removeTemplate,
      duplicate
    };

    return <ContractTemplate {...updatedProps} />;
  }
}

const generateOptions = () => ({
  refetchQueries: [
    'contractTemplates',
    'contractTemplateTotalCounts',
    'contracts',
    'contractCounts',
    'contractCategories',
    'contractCategoriesTotalCount',
    'contractDetails',
    'contractCategoryDetail'
  ]
});

export default withProps<Props>(
  compose(
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
    ),
    graphql<Props, ContractTemplateRemoveMutationResponse, { _id: string }>(
      gql(mutations.contractTemplateRemove),
      {
        name: 'contractTemplateRemove',
        options: generateOptions
      }
    ),
    graphql<Props, ContractTemplateDuplicateMutationResponse, { _id: string }>(
      gql(mutations.contractTemplateDuplicate),
      {
        name: 'contractTemplatesDuplicate',
        options: generateOptions
      }
    )
  )(ContractTemplateContainer)
);
