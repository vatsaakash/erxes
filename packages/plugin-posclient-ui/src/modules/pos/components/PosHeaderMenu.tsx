import React, { FC } from 'react';
import { GrayBorder, HeaderMenu } from './styles';

interface PosHeaderMenuProps {}

const PosHeaderMenu: FC<PosHeaderMenuProps> = ({}) => {
  return (
    <GrayBorder>
      <HeaderMenu className="header-menu">
        <i className="icon-bars" />
      </HeaderMenu>
    </GrayBorder>
  );
};
export default PosHeaderMenu;
