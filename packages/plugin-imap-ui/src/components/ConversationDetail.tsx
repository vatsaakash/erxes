import React from 'react';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import { __ } from 'coreui/utils';
import { queries } from '../graphql';

class Detail extends React.Component<any> {
  render() {
    return <>content</>;
  }
}

const WithQuery = compose(
  graphql<any>(gql(queries.detail), {
    name: 'messagesQuery',
    options: ({ currentId }) => {
      return {
        variables: {
          conversationId: currentId
        },
        fetchPolicy: 'network-only'
      };
    }
  })
)(Detail);

export default WithQuery;
