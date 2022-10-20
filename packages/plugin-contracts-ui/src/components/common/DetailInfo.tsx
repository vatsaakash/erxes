import {
  FieldStyle,
  SidebarCounter,
  SidebarList
} from '@erxes/ui/src/layout/styles';
import { __ } from '@erxes/ui/src/utils/core';
import React from 'react';

import { IContract } from '../../types';

type Props = {
  contract: IContract;
};

class DetailInfo extends React.Component<Props> {
  renderRow = (label, value) => {
    return (
      <li>
        <FieldStyle>{__(`${label}`)}</FieldStyle>
        <SidebarCounter>{value || '-'}</SidebarCounter>
      </li>
    );
  };

  render() {
    const { contract } = this.props;

    return (
      <SidebarList className="no-link">
        {this.renderRow('Улсын дугаар', contract.name)}
        {this.renderRow('Арлын дугаар', contract.status)}
      </SidebarList>
    );
  }
}

export default DetailInfo;
