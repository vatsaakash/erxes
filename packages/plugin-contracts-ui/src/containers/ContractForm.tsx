import { ButtonMutate, withProps } from '@erxes/ui/src';
import { IUser, UsersQueryResponse } from '@erxes/ui/src/auth/types';
import { IButtonMutateProps, IRouterProps } from '@erxes/ui/src/types';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import ContractForm from '../components/ContractForm';

import { mutations, queries } from '../graphql';
import {
  ContractCategoriesQueryResponse,
  ContractTemplatesQueryResponse,
  IContract
} from '../types';

type Props = {
  contract: IContract;
  queryParams: any;
  history: any;
  closeModal: () => void;
};

type FinalProps = {
  usersQuery: UsersQueryResponse;
  currentUser: IUser;
  contractCategoriesQuery: ContractCategoriesQueryResponse;
  contractTemplatesQuery: ContractTemplatesQueryResponse;
} & Props &
  IRouterProps;

class ContractFromContainer extends React.Component<FinalProps> {
  render() {
    const { contractCategoriesQuery, contractTemplatesQuery } = this.props;

    if (contractCategoriesQuery.loading || contractTemplatesQuery.loading) {
      return null;
    }

    const renderButton = ({
      passedName,
      values,
      isSubmitted,
      object
    }: IButtonMutateProps) => {
      const { closeModal } = this.props;

      const afterSave = data => {
        closeModal();
      };

      return (
        <ButtonMutate
          mutation={object ? mutations.contractsEdit : mutations.contractsAdd}
          variables={values}
          callback={afterSave}
          refetchQueries={getRefetchQueries()}
          isSubmitted={isSubmitted}
          type="submit"
          successMessage={`You successfully ${
            object ? 'updated' : 'added'
          } a ${passedName}`}
        />
      );
    };

    const contractCategories = contractCategoriesQuery.contractCategories || [];
    const contractTemplates = contractTemplatesQuery.contractTemplates || [];

    const updatedProps = {
      ...this.props,
      renderButton,
      contractCategories,
      contractTemplates
    };
    return <ContractForm {...updatedProps} />;
  }
}

const getRefetchQueries = () => {
  return [
    'contracts',
    'contractDetails',
    'contractCounts',
    'contractCategories',
    'contractCategoriesTotalCount'
  ];
};

export default withProps<Props>(
  compose(
    graphql<Props, ContractCategoriesQueryResponse>(
      gql(queries.contractCategories),
      {
        name: 'contractCategoriesQuery'
      }
    ),
    graphql<Props, ContractTemplatesQueryResponse>(
      gql(queries.contractTemplates),
      {
        name: 'contractTemplatesQuery',
        options: ({ queryParams }) => ({
          variables: {
            categoryId: queryParams.categoryId
          },
          fetchPolicy: 'network-only'
        })
      }
    )
  )(withRouter(ContractFromContainer))
);
