import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { Bulk, Spinner } from '@erxes/ui/src/components';
import { Alert, withProps, router } from '@erxes/ui/src/utils';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { IRouterProps } from '@erxes/ui/src/types';
import List from '../components/List';
import { mutations, queries } from '../graphql';
import {
  CheckSyncItemsQueryResponse,
  CheckItemsMutationResponse
} from '../types';

type Props = {
  queryParams: any;
  history: any;
};

type FinalProps = {
  checkSyncItemsQuery: CheckSyncItemsQueryResponse;
} & Props &
  IRouterProps &
  CheckItemsMutationResponse;

type State = {
  loading: boolean;
};

class VoucherListContainer extends React.Component<FinalProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const { checkSyncItemsQuery, checkItems, history } = this.props;

    if (checkSyncItemsQuery.loading) {
      return <Spinner />;
    }

    const bulkCheckItems = ({ ids, contentType }, emptyBulk) => {
      checkItems({
        variables: { ids, contentType }
      })
        .then(data => {
          // emptyBulk();
          Alert.success('You successfully deleted a voucher');
        })
        .catch(e => {
          Alert.error(e.message);
        });
    };

    const searchValue = this.props.queryParams.searchValue || '';

    const updatedProps = {
      ...this.props,
      totalCount,
      searchValue,
      vouchers: list,
      currentCampaign,
      bulkCheckItems
    };

    const vouchersList = props => {
      return <List {...updatedProps} {...props} />;
    };

    const refetch = () => {
      this.props.vouchersMainQuery.refetch();
    };

    return <Bulk content={vouchersList} refetch={refetch} />;
  }
}

const generateParams = ({ queryParams }) => ({
  ...router.generatePaginationParams(queryParams || {}),
  ids: queryParams.ids,
  campaignId: queryParams.campaignId,
  status: queryParams.status,
  ownerId: queryParams.ownerId,
  ownerType: queryParams.ownerType,
  searchValue: queryParams.searchValue,
  sortField: queryParams.sortField,
  sortDirection: Number(queryParams.sortDirection) || undefined
});

const generateOptions = () => ({
  refetchQueries: [
    'vouchersMain',
    'voucherCounts',
    'voucherCategories',
    'voucherCategoriesTotalCount'
  ]
});

export default withProps<Props>(
  compose(
    graphql<{ queryParams: any }, MainQueryResponse>(
      gql(queries.vouchersMain),
      {
        name: 'vouchersMainQuery',
        options: ({ queryParams }) => ({
          variables: generateParams({ queryParams }),
          fetchPolicy: 'network-only'
        })
      }
    ),
    graphql<Props, VoucherCampaignDetailQueryResponse>(
      gql(campaignQueries.voucherCampaignDetail),
      {
        name: 'voucherCampaignDetailQuery',
        options: ({ queryParams }) => ({
          variables: {
            _id: queryParams.campaignId
          }
        }),
        skip: ({ queryParams }) => !queryParams.campaignId
      }
    ),
    // mutations
    graphql<{}, RemoveMutationResponse, RemoveMutationVariables>(
      gql(mutations.vouchersRemove),
      {
        name: 'vouchersRemove',
        options: generateOptions
      }
    )
  )(withRouter<IRouterProps>(VoucherListContainer))
);
