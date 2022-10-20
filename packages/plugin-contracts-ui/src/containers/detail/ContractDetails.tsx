import { EmptyState, Spinner, withProps } from '@erxes/ui/src';
import { IUser } from '@erxes/ui/src/auth/types';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';

import ContractDetails from '../../components/detail/ContractDetails';
import { queries } from '../../graphql';
import { DetailQueryResponse } from '../../types';

type Props = {
  id: string;
};

type FinalProps = {
  contractDetailQuery: DetailQueryResponse;
  currentUser: IUser;
} & Props;

const ContractDetailsContainer = (props: FinalProps) => {
  const { id, contractDetailQuery, currentUser } = props;

  if (contractDetailQuery.loading) {
    return <Spinner objective={true} />;
  }

  if (!contractDetailQuery.contractDetails) {
    return (
      <EmptyState text="Contract not found" image="/images/actions/24.svg" />
    );
  }

  const contractDetails = contractDetailQuery.contractDetails;

  const updatedProps = {
    ...props,
    loading: contractDetailQuery.loading,
    contract: contractDetails,
    currentUser
  };

  return <ContractDetails {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<Props, DetailQueryResponse, { _id: string }>(
      gql(queries.contractDetails),
      {
        name: 'contractDetailQuery',
        options: ({ id }) => ({
          variables: {
            _id: id
          }
        })
      }
    )
  )(ContractDetailsContainer)
);
