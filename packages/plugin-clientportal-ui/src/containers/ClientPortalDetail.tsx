import Spinner from '@erxes/ui/src/components/Spinner';
import Alert from '@erxes/ui/src/utils/Alert';
import * as routerUtils from '@erxes/ui/src/utils/router';
import { gql } from '@apollo/client';
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import ClientPortalDetail from '../components/ClientPortalDetail';
import mutations from '../graphql/mutations';
import queries from '../graphql/queries';
import { ClientPortalConfig, ClientPortalConfigQueryResponse } from '../types';

type Props = {
  queryParams: any;
  history: any;
  kind: string;
  isModal?: boolean;
  closeModal?: () => void;
};

function ClientPortalDetailContainer({
  queryParams,
  history,
  kind,
  isModal,
  closeModal
}: Props) {
  console.log('client portal detail container', kind);
  const { loading, data = {} } = useQuery<ClientPortalConfigQueryResponse>(
    gql(queries.getConfig),
    {
      variables: { _id: queryParams._id },
      skip: !queryParams._id
    }
  );

  const [mutate] = useMutation(gql(mutations.createOrUpdateConfig), {
    refetchQueries: [{ query: gql(queries.getConfigs) }]
  });

  if (loading) {
    return <Spinner />;
  }

  const handleUpdate = (doc: ClientPortalConfig) => {
    mutate({
      variables: {
        _id: queryParams._id,
        kind: kind === 'vendor' ? 'vendorPortal' : 'clientPortal',
        ...doc
      }
    })
      .then((response = {}) => {
        const { clientPortalConfigUpdate = {} } = response.data || {};

        if (clientPortalConfigUpdate) {
          routerUtils.setParams(history, { _id: clientPortalConfigUpdate._id });
        }

        Alert.success(
          `Successfully updated the ${
            history.location.pathname.includes('vendor')
              ? 'vendor portal'
              : 'client portal'
          } configs.`
        );

        if (closeModal) {
          closeModal();
        }
      })
      .catch(e => Alert.error(e.message));
  };

  const updatedProps = {
    kind,
    queryParams,
    history,
    loading,
    config: data.clientPortalGetConfig || { tokenPassMethod: 'cookie' },
    isModal,
    closeModal,
    handleUpdate
  };

  return <ClientPortalDetail {...updatedProps} />;
}

export default ClientPortalDetailContainer;
