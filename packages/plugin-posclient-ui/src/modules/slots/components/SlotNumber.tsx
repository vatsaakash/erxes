import React from 'react';
import Button from '@erxes/ui/src/components/Button';

function SlotNumber({ id }) {
  return (
    <Button btnStyle="success" className="slot-number">
      00{id}
    </Button>
  );
}

export default SlotNumber;
