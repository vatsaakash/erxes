import React from 'react';
import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { mutations, queries } from '../../graphql';
import {
  ContractCategoriesQueryResponse,
  ContractTemplateDetailQueryResponse,
  ContractTemplateEditQueryResponse
} from '../../types';
import Spinner from '@erxes/ui/src/components/Spinner';
import { Alert, confirm } from '@erxes/ui/src/utils';
import ContractForm from '../../components/template/ContractForm';

type Props = {
  id: string;
  queryParams: any;
  history: any;
  closeModal: () => void;
};

type State = {
  loading: boolean;
  doc?: {
    name: string;
    categoryId: string;
    content: string;
  };
};

type FinalProps = {
  contractCategoriesQuery: ContractCategoriesQueryResponse;
  contractTemplateDetailQuery: ContractTemplateDetailQueryResponse;
} & Props &
  ContractTemplateEditQueryResponse;

class ContractEditFormContainer extends React.Component<FinalProps, State> {
  constructor(props: FinalProps) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const {
      contractCategoriesQuery,
      history,
      contractTemplatesEdit,
      contractTemplateDetailQuery
    } = this.props;

    if (contractCategoriesQuery.loading || contractCategoriesQuery.loading) {
      return <Spinner objective={true} />;
    }

    if (contractTemplateDetailQuery.loading) {
      return null;
    }

    const contractTemplate =
      contractTemplateDetailQuery.contractTemplateDetails;

    const contractCategories = contractCategoriesQuery.contractCategories || [];

    const contractTemplateSave = (id: string) => {
      if (this.state.doc) {
        contractTemplatesEdit({
          variables: {
            _id: contractTemplate._id,
            ...this.state.doc
          }
        })
          .then(() => {
            Alert.success('You successfully edited a contract template');
            history.push('/contract-template');
          })

          .catch(error => {
            Alert.error(error.message);
          })
          .finally(() => {
            this.setState({ loading: false });
          });
      }
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
  graphql<Props, ContractTemplateEditQueryResponse, { _id: string }>(
    gql(mutations.contractTemplateEdit),
    {
      name: 'contractTemplatesEdit',
      options: getRefetchQueries
    }
  )
)(ContractEditFormContainer);
