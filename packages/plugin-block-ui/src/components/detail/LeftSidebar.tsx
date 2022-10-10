import { Sidebar } from '@erxes/ui/src';
import React from 'react';
import BasicInfo from '../../containers/detail/BasicInfo';

import { IPackage } from '../../types';

type Props = {
  data: IPackage;
};

class LeftSidebar extends React.Component<Props> {
  render() {
    const { data } = this.props;

    return (
      <Sidebar wide={true}>
        <BasicInfo data={data} />
      </Sidebar>
    );
  }
}

export default LeftSidebar;
