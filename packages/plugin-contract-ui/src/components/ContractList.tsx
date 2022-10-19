import { confirm, router } from '@erxes/ui/src/utils';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import Pagination from '@erxes/ui/src/components/pagination/Pagination';
import Alert from '@erxes/ui/src/utils/Alert';
import Table from '@erxes/ui/src/components/table';
import withTableWrapper from '@erxes/ui/src/components/table/withTableWrapper';
import DataWithLoader from '@erxes/ui/src/components/DataWithLoader';
import { BarItems } from '@erxes/ui/src/layout/styles';
import FormControl from '@erxes/ui/src/components/form/Control';
import { __ } from '@erxes/ui/src/utils/core';
import Button from '@erxes/ui/src/components/Button';
import { ModalTrigger } from '@erxes/ui/src/components';
import React from 'react';
import { IContract } from '../types';
import ContractRow from './ContractRow';
import Sidebar from './SideBar';
import { IButtonMutateProps } from '@erxes/ui/src/types';

type Props = {
  history: any;
  type: string;
  queryParams: any;
  contracts: IContract[];
  loading: boolean;
  totalCount: number;
  searchValue: string;
  removeContracts: (
    doc: { contractIds: string[] },
    emptyBulk: () => void
  ) => void;
  bulk: any[];
  isAllSelected: boolean;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  emptyBulk: () => void;
  toggleBulk: () => void;
  toggleAll: (targets: IContract[], containerId: string) => void;
};

type State = {
  searchValue?: string;
};

class ContractsList extends React.Component<Props, State> {
  private timer?: NodeJS.Timer = undefined;

  constructor(props) {
    super(props);

    this.state = {
      searchValue: this.props.searchValue
    };
  }

  onChange = () => {
    const { toggleAll, contracts } = this.props;

    toggleAll(contracts, 'contracts');
  };

  removePackages = contracts => {
    const contractIds: string[] = [];

    contracts.forEach((data: any) => {
      contractIds.push(data._id);
    });

    const { removeContracts, emptyBulk } = this.props;

    removeContracts({ contractIds }, emptyBulk);
  };

  search = e => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const { history } = this.props;
    const searchValue = e.target.value;

    this.setState({ searchValue });

    this.timer = setTimeout(() => {
      router.removeParams(history, 'page');
      router.setParams(history, { searchValue });
    }, 500);
  };

  moveCursorAtTheEnd(e) {
    const tmpValue = e.target.value;

    e.target.value = '';
    e.target.value = tmpValue;
  }

  render() {
    const {
      history,
      queryParams,
      contracts,
      loading,
      totalCount,
      isAllSelected,
      toggleBulk,
      bulk,
      renderButton
    } = this.props;

    const mainContent = (
      <withTableWrapper.Wrapper>
        <Table
          whiteSpace="nowrap"
          hover={true}
          bordered={true}
          responsive={true}
          wideHeader={true}
        >
          <thead>
            <tr>
              <th>
                <FormControl
                  componentClass="checkbox"
                  checked={isAllSelected}
                  onChange={this.onChange}
                />
              </th>
              <th>{__('name')}</th>
              <th>{__('stats')}</th>
              <th>{__('orderCreatedDate')}</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(contract => (
              <ContractRow
                contract={contract}
                key={contract._id}
                history={history}
                isChecked={bulk.includes(contract)}
                toggleBulk={toggleBulk}
              />
            ))}
          </tbody>
        </Table>
      </withTableWrapper.Wrapper>
    );

    const addTrigger = (
      <Button btnStyle="success" size="small" icon="plus-circle">
        Add contract
      </Button>
    );

    let actionBarLeft: React.ReactNode;

    if (bulk.length > 0) {
      const onClick = () =>
        confirm()
          .then(() => {
            this.removePackages(bulk);
          })
          .catch(e => {
            Alert.error(e.message);
          });

      actionBarLeft = (
        <BarItems>
          <Button
            btnStyle="danger"
            size="small"
            icon="cancel-1"
            onClick={onClick}
          >
            Delete
          </Button>
        </BarItems>
      );
    }

    const contractForm = props => {
      return <>contractForm</>;
    };

    const actionBarRight = (
      <BarItems>
        <FormControl
          type="text"
          placeholder={__('Type to search')}
          autoFocus={true}
          onChange={this.search}
          value={this.state.searchValue}
          onFocus={this.moveCursorAtTheEnd}
        />

        <ModalTrigger
          title="New contract"
          trigger={addTrigger}
          autoOpenKey="showContractModal"
          size="xl"
          content={contractForm}
          backDrop="static"
        />
      </BarItems>
    );

    const actionBar = (
      <Wrapper.ActionBar right={actionBarRight} left={actionBarLeft} />
    );

    return (
      <Wrapper
        header={
          <Wrapper.Header
            title={__(`Packages`) + ` (${totalCount})`}
            queryParams={queryParams}
          />
        }
        actionBar={actionBar}
        footer={<Pagination count={totalCount} />}
        leftSidebar={
          <Sidebar
            loadingMainQuery={loading}
            queryParams={queryParams}
            history={history}
            renderButton={renderButton}
          />
        }
        content={
          <DataWithLoader
            data={mainContent}
            loading={loading}
            count={totalCount}
            emptyText="Add in your first contract!"
            emptyImage="/images/actions/1.svg"
          />
        }
      />
    );
  }
}

export default ContractsList;
