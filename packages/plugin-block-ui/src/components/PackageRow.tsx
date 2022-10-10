import _ from 'lodash';
import { FormControl } from '@erxes/ui/src';
import React from 'react';
import { IPackage } from '../types';

type Props = {
  data: IPackage;
  history: any;
  isChecked: boolean;
  toggleBulk: (clientPortalUser: IPackage, isChecked?: boolean) => void;
};

function PackageRow({ data, toggleBulk, isChecked, history }: Props) {
  const onChange = e => {
    if (toggleBulk) {
      toggleBulk(data, e.target.checked);
    }
  };

  const onTrClick = () => {
    history.push(`/block/details/${data._id}`);
  };

  return (
    <tr onClick={onTrClick}>
      <td>
        <FormControl
          componentClass="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
      </td>

      <td>{data.name} </td>
      <td>{data.level}</td>
      <td>{data.price}</td>
      <td>{data.profit}</td>
    </tr>
  );
}

export default PackageRow;
