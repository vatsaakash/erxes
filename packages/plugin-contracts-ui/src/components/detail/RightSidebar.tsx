import * as path from 'path';

import Box from '@erxes/ui/src/components/Box';
import { IContract } from '../../types';
import { List } from '../../styles';
import React from 'react';
import Sidebar from '@erxes/ui/src/layout/components/Sidebar';
import { __ } from 'coreui/utils';
import dayjs from 'dayjs';

type Props = {
  contract: IContract;
};

export default class RightSidebar extends React.Component<Props> {
  render() {
    const { contract } = this.props;

    return (
      <Sidebar>
        <Box title={__('Other')} name="showOthers">
          <List>
            <li>
              <div>{__('Created at')}: </div>{' '}
              <span>{dayjs(contract.createdAt).format('lll')}</span>
            </li>
            <li>
              <div>{__('Modified at')}: </div>{' '}
              <span>{dayjs(contract.modifiedAt).format('lll')}</span>
            </li>
          </List>
        </Box>
      </Sidebar>
    );
  }
}
