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
import { IPackage } from '../types';
import PackageRow from './PackageRow';
import Sidebar from './Sidebar';

type Props = {
  history: any;
  type: string;
  queryParams: any;
  packages: IPackage[];
  loading: boolean;
  packageCount: number;
  searchValue: string;
  removePackage: (doc: { packageIds: string[] }, emptyBulk: () => void) => void;
  bulk: any[];
  isAllSelected: boolean;
  emptyBulk: () => void;
  toggleBulk: () => void;
  toggleAll: (targets: IPackage[], containerId: string) => void;
};

type State = {
  searchValue?: string;
};

class PackagesList extends React.Component<Props, State> {
  private timer?: NodeJS.Timer = undefined;

  constructor(props) {
    super(props);

    this.state = {
      searchValue: this.props.searchValue
    };
  }

  onChange = () => {
    const { toggleAll, packages } = this.props;

    toggleAll(packages, 'packages');
  };

  removePackages = packages => {
    const packageIds: string[] = [];

    packages.forEach((data: any) => {
      packageIds.push(data._id);
    });

    const { removePackage, emptyBulk } = this.props;

    removePackage({ packageIds }, emptyBulk);
  };

  search = e => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const { history } = this.props;
    const searchValue = e.target.value;

    console.log(searchValue, 'sdfghjk');

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
      packages,
      loading,
      packageCount,
      isAllSelected,
      toggleBulk,
      bulk
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
              <th>{__('level')}</th>
              <th>{__('price')}</th>
              <th>{__('profit')}</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(data => (
              <PackageRow
                data={data}
                key={data._id}
                history={history}
                isChecked={bulk.includes(data)}
                toggleBulk={toggleBulk}
              />
            ))}
          </tbody>
        </Table>
      </withTableWrapper.Wrapper>
    );

    const addTrigger = (
      <Button btnStyle="success" size="small" icon="plus-circle">
        Add package
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

    const packageForm = props => {
      return <>packageForm</>;
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
          title="New package"
          trigger={addTrigger}
          autoOpenKey="showPackageModal"
          size="xl"
          content={packageForm}
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
            title={__(`Packages`) + ` (${packageCount})`}
            queryParams={queryParams}
          />
        }
        actionBar={actionBar}
        footer={<Pagination count={packageCount} />}
        leftSidebar={<Sidebar loadingMainQuery={loading} />}
        content={
          <DataWithLoader
            data={mainContent}
            loading={loading}
            count={packageCount}
            emptyText="Add in your first package!"
            emptyImage="/images/actions/1.svg"
          />
        }
      />
    );
  }
}

export default PackagesList;
