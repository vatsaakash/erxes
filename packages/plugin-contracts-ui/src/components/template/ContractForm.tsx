import React from 'react';
import { __ } from '@erxes/ui/src/utils/core';
import { IContractCategory } from '../../types';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import DataWithLoader from '@erxes/ui/src/components/DataWithLoader';

type Props = {
  contractCategories: IContractCategory[];
  contractCategoriesCount: number;
  queryParams: any;
};

function ContractForm(props: Props) {
  const { contractCategories, contractCategoriesCount, queryParams } = props;

  const breadcrumb = [
    { title: 'Contract Template', link: '/contract-template' },
    { title: __('Contract') }
  ];

  return (
    <Wrapper
      header={
        <Wrapper.Header
          title={__(`Contract Create`)}
          queryParams={queryParams}
          breadcrumb={breadcrumb}
        />
      }
      content={
        <DataWithLoader
          data={<>data</>}
          loading={false}
          count={0}
          emptyText="Add in your first contract-templates!"
          emptyImage="/images/actions/1.svg"
        />
      }
    />
  );
}

export default ContractForm;
