import { Alert, withProps } from '@erxes/ui/src';
import { IUser } from '@erxes/ui/src/auth/types';
import { IRouterProps } from '@erxes/ui/src/types';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import BasicInfoSection from '../../components/common/BasicInfoSection';
import { mutations } from '../../graphql';
import { ContractRemoveMutationResponse, IContract } from '../../types';

type Props = {
  contract: IContract;
};

type FinalProps = { currentUser: IUser } & Props &
  IRouterProps &
  ContractRemoveMutationResponse;

const BasicInfoContainer = (props: FinalProps) => {
  const { contract, contractsRemove, history } = props;

  const { _id } = contract;

  const remove = () => {
    contractsRemove({ variables: { contractIds: [_id] } })
      .then(() => {
        Alert.success('You successfully deleted a contract');
        history.push('/contracts');
      })
      .catch(e => {
        Alert.error(e.message);
      });
  };

  const updatedProps = {
    ...props,
    remove
  };

  return <BasicInfoSection {...updatedProps} />;
};

const generateOptions = () => ({
  refetchQueries: [
    'contracts',
    'contractCounts',
    'contractCategoriesTotalCount'
  ]
});

export default withProps<Props>(
  compose(
    graphql<{}, ContractRemoveMutationResponse, { contractIds: string[] }>(
      gql(mutations.contractsRemove),
      {
        name: 'contractsRemove',
        options: generateOptions
      }
    )
  )(withRouter<FinalProps>(BasicInfoContainer))
);
