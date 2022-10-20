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

const CarDetailsContainer = (props: FinalProps) => {
  const { id, contractDetailQuery, currentUser } = props;

  if (contractDetailQuery.loading) {
    return <Spinner objective={true} />;
  }

  if (!contractDetailQuery.contractDetail) {
    return <EmptyState text="Car not found" image="/images/actions/24.svg" />;
  }

  const contractDetail = contractDetailQuery.contractDetail;

  const updatedProps = {
    ...props,
    loading: contractDetailQuery.loading,
    contract: contractDetail,
    currentUser
  };

  return <ContractDetails {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<Props, DetailQueryResponse, { _id: string }>(
      gql(queries.contractDetail),
      {
        name: 'contractDetailQuery',
        options: ({ id }) => ({
          variables: {
            _id: id
          }
        })
      }
    )
  )(CarDetailsContainer)
);
