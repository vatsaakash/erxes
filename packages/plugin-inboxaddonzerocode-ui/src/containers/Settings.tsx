import * as compose from 'lodash.flowright';
import { Alert, withProps } from '@erxes/ui/src/utils';
import { queries, mutations } from '../graphql';
import Settings from '../components/Settings';
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SettingsContainer extends React.Component<any> {
  save = variables => {
    const { saveMutation } = this.props;

    return saveMutation({ variables })
      .then(() => {
        Alert.success('Success');
      })
      .catch(e => {
        Alert.error(e.message);
      });
  };

  render() {
    const { configDetailQuery } = this.props;

    if (configDetailQuery.loading) {
      return null;
    }

    const updatedProps = {
      configDetail: configDetailQuery.inboxZerocodeConfig || {},
      save: this.save
    };

    return <Settings {...updatedProps} />;
  }
}

export default withProps(
  compose(
    graphql(gql(mutations.save), {
      name: 'saveMutation'
    }),
    graphql(gql(queries.configDetail), {
      name: 'configDetailQuery'
    })
  )(SettingsContainer)
);
