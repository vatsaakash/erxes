import { ButtonMutate, withProps } from '@erxes/ui/src';
import { IButtonMutateProps } from '@erxes/ui/src/types';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';
import CategoryForm from '../../components/contractCategory/CategoryForm';

import { mutations, queries } from '../../graphql';
import {
  ContractCategoriesQueryResponse,
  IContractCategory
} from '../../types';

type Props = {
  contract?: IContractCategory;
  contractCategoriesQuery: IContractCategory[];
  closeModal: () => void;
};

type FinalProps = {
  contractCategoriesQuery: ContractCategoriesQueryResponse;
} & Props;

class CategoryFormContainer extends React.Component<FinalProps> {
  render() {
    const { contractCategoriesQuery } = this.props;

    if (contractCategoriesQuery.loading) {
      return null;
    }

    const renderButton = ({
      passedName,
      values,
      isSubmitted,
      callback,
      object
    }: IButtonMutateProps) => {
      return (
        <ButtonMutate
          mutation={
            object
              ? mutations.contractCategoryEdit
              : mutations.contractCategoryAdd
          }
          variables={values}
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

    const contractCategories = contractCategoriesQuery.contractCategories || [];

    const updatedProps = {
      ...this.props,
      renderButton,
      contractCategories
    };

    return <CategoryForm {...updatedProps} />;
  }
}

const getRefetchQueries = () => {
  return ['contractCategories', 'contractCategoriesTotalCount'];
};

export default withProps<FinalProps>(
  compose(
    graphql<Props, ContractCategoriesQueryResponse>(
      gql(queries.contractCategories),
      {
        name: 'contractCategoriesQuery'
      }
    )
  )(CategoryFormContainer)
);
