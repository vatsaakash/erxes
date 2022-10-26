import React from 'react';
import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { mutations, queries } from '../../graphql';
import {
  ContractCategoriesQueryResponse,
  ContractTemplateMutationResponse,
  ContractTemplateMutationVariables,
  IContractTemplate,
  IContractTemplateDoc
} from '../../types';
import Spinner from '@erxes/ui/src/components/Spinner';
import { Alert, confirm } from '@erxes/ui/src/utils';
import ContractForm from '../../components/template/ContractForm';

type Props = {
  queryParams: any;
  history: any;
  closeModal: () => void;
  contractTemplate: IContractTemplate;
};

type FinalProps = {
  contractCategoriesQuery: ContractCategoriesQueryResponse;
} & Props &
  ContractTemplateMutationResponse;

class ContractFormContainer extends React.Component<FinalProps> {
  render() {
    const {
      contractCategoriesQuery,
      history,
      addContractTemplateMutation
    } = this.props;

    if (contractCategoriesQuery.loading || contractCategoriesQuery.loading) {
      return <Spinner objective={true} />;
    }

    const contractCategories = contractCategoriesQuery.contractCategories || [];

    const contractTemplateSave = (doc: IContractTemplateDoc) => {
      addContractTemplateMutation({
        variables: doc
      })
        .then(() => {
          Alert.success('You successfully added a template');
          history.push({
            pathname: `/contract-template`
          });
        })
        .catch(error => {
          Alert.error(error.message);
        });
    };

    const updatedProps = {
      ...this.props,
      contractCategories,
      contractTemplateSave
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
  graphql<
    {},
    ContractTemplateMutationResponse,
    ContractTemplateMutationVariables
  >(gql(mutations.contractTemplateAdd), {
    name: 'addContractTemplateMutation',
    options: getRefetchQueries
  })
)(ContractFormContainer);
