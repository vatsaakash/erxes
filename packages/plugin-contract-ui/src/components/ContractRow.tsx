import _ from 'lodash';
import { FormControl } from '@erxes/ui/src';
import React from 'react';
import { IContract } from '../types';

type Props = {
  contract: IContract;
  history: any;
  isChecked: boolean;
  toggleBulk: (contract: IContract, isChecked?: boolean) => void;
};

function ContractRow({ contract, toggleBulk, isChecked, history }: Props) {
  const onChange = e => {
    if (toggleBulk) {
      toggleBulk(contract, e.target.checked);
    }
  };

  //   const onTrClick = () => {
  //     history.push(`/block/details/${data._id}`);
  //   };

  return (
    <tr>
      <td>
        <FormControl
          componentClass="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
      </td>

      <td>{contract.name} </td>
      <td>{contract.status}</td>
      <td>{contract.orderCreatedDate}</td>
    </tr>
  );
}

export default ContractRow;
