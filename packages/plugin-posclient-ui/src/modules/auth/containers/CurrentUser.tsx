import React from 'react';
import { queries } from '../graphql';
import { graphql, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { withProps } from '@erxes/ui/src/utils';

function CurrentUser({ children, currentUserQuery }) {
  console.log('currentUserQuery', currentUserQuery);
  // if (currentUserQuery.loading) {
  //   return <div>Loading...</div>;
  // }

  // const posCurrentUser = currentUserQuery.posCurrentUser;

  // if (posCurrentUser) {
  return children;
  // }
  // return <div>SignIn</div>;
}

export default CurrentUser;
// export default withProps(
//   compose(
//     graphql(gql(queries.posCurrentUser), {
//       name: 'currentUserQuery',
//     })
//   )(CurrentUser)
// );
