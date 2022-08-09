import React from 'react';
import { Header, Dropdown } from './styles';
import HorizontalScroll from '../../common/components/scrollMenu';
import SlotNumber from './SlotNumber';

function SlotsHeader() {
  return (
    <>
      <Dropdown>
        <p>Level 1 </p>
        <i className="icon-angle-down"></i>
      </Dropdown>
      <Header>
        <HorizontalScroll
          items={[
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 },
            { id: 10 },
            { id: 11 },
            { id: 12 },
            { id: 13 },
            { id: 14 },
            { id: 15 },
            { id: 16 },
            { id: 17 },
            { id: 18 },
            { id: 19 },
            { id: 20 }
          ]}
          ItemComponent={SlotNumber}
        />
      </Header>
    </>
  );
}

export default SlotsHeader;
