import React, { FC } from 'react';
import { Header, GrayBorder } from './styles';
import PosHeaderMenu from './PosHeaderMenu';
import SlotsHeader from '../../slots/components/SlotsHeader';

interface PosHeaderProps {}

const PosHeader: FC<PosHeaderProps> = ({}) => {
  return (
    <Header>
      <div className="pos-header-wrapper">
        <PosHeaderMenu />
        <GrayBorder>
          <div className="logo">
            <img
              src="https://www.erxes.org/img/logo_dark.svg"
              width={80}
              loading="eager"
            />
          </div>
        </GrayBorder>
      </div>
      <SlotsHeader />
    </Header>
  );
};
export default React.memo(PosHeader);
