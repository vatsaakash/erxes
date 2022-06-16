import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import { withProps } from '@erxes/ui/src/utils';
import { queries } from '../graphql';
import React from 'react';
import {
  ICommonFormProps,
  ICommonListProps
} from '@erxes/ui-settings/src/common/types';

type Props = ICommonListProps &
  ICommonFormProps & {
    templatesQuery: any;
  };

class ListContainer extends React.Component<Props> {
  render() {
    const { templatesQuery } = this.props;

    console.log(templatesQuery);
    return <div>123</div>;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, any>(gql(queries.templates), {
      name: 'templatesQuery'
    })
  )(ListContainer)
);
