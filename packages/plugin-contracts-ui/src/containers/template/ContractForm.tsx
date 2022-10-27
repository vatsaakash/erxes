import React from 'react';
import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { mutations, queries } from '../../graphql';
import {
  ContractCategoriesQueryResponse,
  ContractTemplateDetailQueryResponse,
  ContractTemplateEditQueryResponse,
  ContractTemplateMutationResponse,
  ContractTemplateMutationVariables,
  IContractTemplate
} from '../../types';
import Spinner from '@erxes/ui/src/components/Spinner';
import { Alert, confirm } from '@erxes/ui/src/utils';
import ContractForm from '../../components/template/ContractForm';

type Props = {
  id: string;
  queryParams: any;
  history: any;
  closeModal: () => void;
  contractTemplate: IContractTemplate;
};

type FinalProps = {
  contractCategoriesQuery: ContractCategoriesQueryResponse;
  contractTemplateDetailQuery: ContractTemplateDetailQueryResponse;
} & Props &
  ContractTemplateMutationResponse &
  ContractTemplateEditQueryResponse;

class ContractFormContainer extends React.Component<FinalProps> {
  render() {
    const {
      contractCategoriesQuery,
      history,
      contractTemplateDetailQuery,
      addContractTemplateMutation,
      editContractTemplateMutation
    } = this.props;

    if (
      (contractTemplateDetailQuery && contractTemplateDetailQuery.loading) ||
      contractCategoriesQuery.loading
    ) {
      return <Spinner objective={true} />;
    }

    const contractCategories = contractCategoriesQuery.contractCategories || [];

    const save = (name: string, categoryId: string, content: string) => {
      let method: any = addContractTemplateMutation;

      const variables: any = {
        name,
        categoryId,
        content
      };

      if (this.props.id) {
        method = editContractTemplateMutation;
        variables._id = this.props.id;
      }

      method({ variables })
        .then(() => {
          Alert.success(`Success`);

          history.push({
            pathname: '/contract-template'
          });
        })
        .catch(error => {
          Alert.error(error.message);
        });
    };

    let contractTemplate;

    if (contractTemplateDetailQuery) {
      contractTemplate = contractTemplateDetailQuery.contractTemplateDetails;
    }

    const updatedProps = {
      ...this.props,
      contractCategories,
      contractTemplate,
      save
    };

    return <ContractForm {...updatedProps} />;
  }
}

const getRefetchQueries = () => ({
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
  graphql<Props, ContractTemplateDetailQueryResponse, { _id: string }>(
    gql(queries.contractTemplateDetails),
    {
      name: 'contractTemplateDetailQuery',
      options: ({ id }) => ({
        variables: {
          _id: id
        }
      })
    }
  ),
  graphql<
    {},
    ContractTemplateMutationResponse,
    ContractTemplateMutationVariables
  >(gql(mutations.contractTemplateAdd), {
    name: 'addContractTemplateMutation',
    options: getRefetchQueries
  }),
  graphql<Props, ContractTemplateEditQueryResponse, { _id: string }>(
    gql(mutations.contractTemplateEdit),
    {
      name: 'editContractTemplateMutation',
      options: getRefetchQueries
    }
  )
)(ContractFormContainer);
