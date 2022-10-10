import React from 'react';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import LevelFilter from './LevelFilter';

type Props = {
  loadingMainQuery: boolean;
};

function Sidebar({ loadingMainQuery }: Props) {
  return (
    <Wrapper.Sidebar hasBorder>
      <>
        <LevelFilter />
      </>
    </Wrapper.Sidebar>
  );
}

export default Sidebar;
