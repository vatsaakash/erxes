import {
  Box,
  EmptyState,
  Icon,
  ModalTrigger,
  MainStyleButtonRelated as ButtonRelated,
  __,
  SectionBodyItem
} from '@erxes/ui/src';
import React from 'react';
import { Link } from 'react-router-dom';

import GetConformity from '@erxes/ui-cards/src/conformity/containers/GetConformity';

type Props = {
  name: string;

  mainType?: string;
  mainTypeId?: string;
  collapseCallback?: () => void;
};

function Component(
  this: any,
  {
    name,

    mainType = '',
    mainTypeId = '',
    collapseCallback
  }: Props
) {
  const carTrigger = (
    <button>
      <Icon icon="plus-circle" />
    </button>
  );

  const relCarTrigger = (
    <ButtonRelated>
      <span>{__('See related cars..')}</span>
    </ButtonRelated>
  );

  return (
    <Box
      title={__('ClientPortal')}
      name="showCars"
      extraButtons={''}
      isOpen={true}
      callback={collapseCallback}
    >
      {}
    </Box>
  );
}

type IProps = {
  mainType?: string;
  mainTypeId?: string;
  isOpen?: boolean;
  collapseCallback?: () => void;
};

export default (props: IProps) => {
  return (
    <GetConformity
      {...props}
      relType="car"
      component={Component}
      queryName="cars"
      itemsQuery={''}
      alreadyItems={''}
    />
  );
};
