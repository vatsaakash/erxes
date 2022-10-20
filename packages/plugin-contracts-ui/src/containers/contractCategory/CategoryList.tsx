import { Alert, ButtonMutate, confirm, withProps } from '@erxes/ui/src';
import { IButtonMutateProps } from '@erxes/ui/src/types';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';
import CategoryList from '../../components/contractCategory/CategoryList';

import { mutations, queries } from '../../graphql';
import {
  ContractCategoriesCountQueryResponse,
  ContractCategoriesQueryResponse,
  ContractCategoryRemoveMutationResponse
} from '../../types';

type Props = {
  history: any;
  queryParams: any;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
};

type FinalProps = {
  contractCategoriesQuery: ContractCategoriesQueryResponse;
  contractCategoriesCountQuery: ContractCategoriesCountQueryResponse;
} & Props &
  ContractCategoryRemoveMutationResponse;

class ContractListContainer extends React.Component<FinalProps> {
  render() {
    const {
      contractCategoriesQuery,
      contractCategoriesCountQuery,
      contractCategoriesRemove
    } = this.props;

    const renderButton = ({
      passedName,
      values,
      isSubmitted,
      callback,
      object
    }: IButtonMutateProps) => {
      const attachment = values.attachment || undefined;

      values.attachment = attachment
        ? { ...attachment, __typename: undefined }
        : null;

      return (
        <ButtonMutate
          mutation={object}
          variables={object}
          callback={callback}
          refetchQueries={getRefetchQueries()}
          isSubmitted={isSubmitted}
          type="submit"
          uppercase={false}
          successMessage={`You successfully ${
            object ? 'updated' : 'added'
          } a ${passedName}`}
        />
      );
    };

    const remove = contractId => {
      confirm().then(() => {
        contractCategoriesRemove({
          variables: { _id: contractId }
        })
          .then(() => {
            contractCategoriesQuery.refetch();
            contractCategoriesCountQuery.refetch();

            Alert.success(`You successfully deleted a contract category`);
          })
          .catch(error => {
            Alert.error(error.message);
          });
      });
    };

    const contractCategories = contractCategoriesQuery.contractCategories || [];

    const updatedProps = {
      ...this.props,
      remove,
      renderButton,
      refetch: contractCategoriesQuery.refetch,
      contractCategories,
      loading: contractCategoriesQuery.loading,
      contractCategoriesCount:
        contractCategoriesCountQuery.contractCategoriesTotalCount || 0
    };

    return <CategoryList {...updatedProps} />;
  }
}

const getRefetchQueries = () => {
  return ['contractCategories', 'contractCategoriesTotalCount'];
};

const options = () => ({
  refetchQueries: getRefetchQueries()
});

export default withProps<Props>(
  compose(
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
    ),
    graphql<Props, ContractCategoryRemoveMutationResponse, { _id: string }>(
      gql(mutations.contractCategoryRemove),
      {
        name: 'contractCategoriesRemove',
        options
      }
    )
  )(ContractListContainer)
);
