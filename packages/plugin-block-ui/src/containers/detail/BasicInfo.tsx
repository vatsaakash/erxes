import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { Alert, withProps } from '@erxes/ui/src';
import { mutations, queries } from '../../graphql';
import BasicInfoSection from '../../components/detail/BasicInfoSection';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { IUser } from '@erxes/ui/src/auth/types';
import { IRouterProps } from '@erxes/ui/src/types';
import { IPackage, packageRemoveMutationResponse } from '../../types';

type Props = {
  data: IPackage;
};

type FinalProps = Props & IRouterProps & packageRemoveMutationResponse;

const BasicInfoContainer = (props: FinalProps) => {
  const { data, packagesRemove, history } = props;

  const { _id } = data;

  const remove = () => {
    packagesRemove({ variables: { packageIds: [_id] } })
      .then(() => {
        Alert.success('You successfully deleted a package');
        history.push('/block/list');
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

const getRefetchQueries = () => {
  return ['packageCounts', 'packages'];
};

const options = () => ({
  refetchQueries: getRefetchQueries()
});

export default withProps<Props>(
  compose(
    graphql<{}, packageRemoveMutationResponse, { packageIds: string[] }>(
      gql(mutations.packagesRemove),
      {
        name: 'packagesRemove',
        options
      }
    )
  )(withRouter<FinalProps>(BasicInfoContainer))
);
