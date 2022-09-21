import { IConversation } from '@erxes/ui-inbox/src/inbox/types';
import React from 'react';

type Props = {
  conversation: IConversation;
};

class Codihaus extends React.Component<Props, {}> {
  render() {
    const { conversation } = this.props;

    return <>test</>;
  }
}

export default Codihaus;
