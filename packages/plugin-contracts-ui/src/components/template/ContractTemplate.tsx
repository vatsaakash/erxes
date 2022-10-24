import React from 'react';
import { __ } from '@erxes/ui/src/utils/core';
import { IContractCategory } from '../../types';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import Pagination from '@erxes/ui/src/components/pagination/Pagination';
import DataWithLoader from '@erxes/ui/src/components/DataWithLoader';
import { BarItems } from '@erxes/ui/src/layout/styles';
import FormControl from '@erxes/ui/src/components/form/Control';
import { Link } from 'react-router-dom';
import Button from '@erxes/ui/src/components/Button';
import Sidebar from '../../containers/template/SideBar';

export const contractMenu = [
  { title: 'Contracts', link: '/contracts' },
  { title: 'Contract Template', link: '/contract-template' }
];

type Props = {
  contractCategories: IContractCategory[];
  contractCategoriesCount: number;
  queryParams: any;
};

function ContractTemplate(props: Props) {
  const { contractCategories, contractCategoriesCount, queryParams } = props;

  const actionBarRight = (
    <BarItems>
      <FormControl
        type="text"
        placeholder={__('Type to search')}
        autoFocus={true}
      />

      <Link to="contract/create">
        <Button btnStyle="success" size="small" icon="plus-circle">
          Add contract
        </Button>
      </Link>
    </BarItems>
  );

  const actionBar = <Wrapper.ActionBar right={actionBarRight} />;

  return (
    <Wrapper
      header={
        <Wrapper.Header
          title={__(`Contract-Templates`) + ` (${0})`}
          queryParams={queryParams}
          submenu={contractMenu}
        />
      }
      actionBar={actionBar}
      footer={<Pagination count={0} />}
      leftSidebar={<Sidebar queryParams={queryParams} history={history} />}
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

export default ContractTemplate;
