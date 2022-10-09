import _ from 'lodash';
import { FormControl } from '@erxes/ui/src';
import React from 'react';
import { IPackage } from '../types';

type Props = {
  data: IPackage;
};

function PackageRow({ data }: Props) {
  return (
    <tr>
      <td>
        <FormControl componentClass="checkbox" />
      </td>

      <td>{data.name} </td>
      <td>{data.level}</td>
      <td>{data.price}</td>
      <td>{data.profit}</td>
    </tr>
  );
}

export default PackageRow;
