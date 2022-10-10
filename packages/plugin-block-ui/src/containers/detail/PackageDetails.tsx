import { EmptyState, Spinner, withProps } from '@erxes/ui/src';
import { IUser } from '@erxes/ui/src/auth/types';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';
import PackageDetails from '../../components/detail/PackageDetails';
import { queries } from '../../graphql';
import { DetailQueryResponse } from '../../types';

type Props = {
  id: string;
};

type FinalProps = {
  packageDetailQuery: DetailQueryResponse;
} & Props;

const PackageDetailsContainer = (props: FinalProps) => {
  const { id, packageDetailQuery } = props;

  if (packageDetailQuery.loading) {
    return <Spinner objective={true} />;
  }

  if (!packageDetailQuery.packageDetail) {
    return (
      <EmptyState text="Package not found" image="/images/actions/24.svg" />
    );
  }

  const packageDetail = packageDetailQuery.packageDetail;

  const updatedProps = {
    ...props,
    loading: packageDetailQuery.loading,
    data: packageDetail
  };

  return <PackageDetails {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<Props, DetailQueryResponse, { _id: string }>(
      gql(queries.packageDetail),
      {
        name: 'packageDetailQuery',
        options: ({ id }) => ({
          variables: {
            _id: id
          }
        })
      }
    )
  )(PackageDetailsContainer)
);
