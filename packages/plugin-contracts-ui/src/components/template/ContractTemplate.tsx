import React from 'react';
import { __ } from '@erxes/ui/src/utils/core';
import { IContractTemplate } from '../../types';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import Pagination from '@erxes/ui/src/components/pagination/Pagination';
import DataWithLoader from '@erxes/ui/src/components/DataWithLoader';
import { BarItems } from '@erxes/ui/src/layout/styles';
import FormControl from '@erxes/ui/src/components/form/Control';
import { Link } from 'react-router-dom';
import Button from '@erxes/ui/src/components/Button';
import Sidebar from '../../containers/template/SideBar';
import {
  Actions,
  IframePreview,
  Template,
  TemplateBox,
  TemplateInfo,
  Templates
} from '../../styles';
import Icon from '@erxes/ui/src/components/Icon';
import dayjs from 'dayjs';

export const contractMenu = [
  { title: 'Contracts', link: '/contracts' },
  { title: 'Contract Template', link: '/contract-template' }
];

type Props = {
  contractTemplates: IContractTemplate[];
  contractTemplateTotalCounts: number;
  queryParams: any;
  loading: boolean;
};

function ContractTemplate(props: Props) {
  const {
    contractTemplates,
    contractTemplateTotalCounts,
    queryParams,
    loading
  } = props;

  const renderDate = (createdAt, modifiedAt) => {
    if (createdAt === modifiedAt) {
      if (createdAt === null) return '-';

      return dayjs(createdAt).format('DD MMM YYYY');
    }

    return dayjs(modifiedAt).format('DD MMM YYYY');
  };

  const renderRow = () => {
    return contractTemplates.map((object, index) => {
      const { name, content, createdAt, modifiedAt } = object || {};

      return (
        <Template key={index} isLongName={name.length > 46}>
          <h5>{name}</h5>
          <TemplateBox>
            <Actions>
              {/* {this.renderEditAction(object)} */}
              <div>
                <Icon icon="cancel-1" /> Delete
              </div>
              {/* {this.renderDuplicateAction(object)} */}
            </Actions>
            <IframePreview>
              <iframe title="content-iframe" srcDoc={content} />
            </IframePreview>
          </TemplateBox>
          <TemplateInfo>
            <p>{createdAt === modifiedAt ? `Created at` : `Modified at`}</p>
            <p>{renderDate(createdAt, modifiedAt)}</p>
          </TemplateInfo>
          <TemplateInfo>
            {/* <p>Created by</p>
            {createdUser ? (
              createdUser.details.fullName && (
                <p>{createdUser.details.fullName}</p>
              )
            ) : ( */}
            <p>erxes Inc</p>
            {/* )} */}
          </TemplateInfo>
        </Template>
      );
    });
  };

  const renderContent = () => {
    return <Templates>{renderRow()}</Templates>;
  };

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
          title={__(`Contract-Templates`) + ` (${contractTemplateTotalCounts})`}
          queryParams={queryParams}
          submenu={contractMenu}
        />
      }
      actionBar={actionBar}
      footer={<Pagination count={contractTemplateTotalCounts} />}
      leftSidebar={<Sidebar queryParams={queryParams} history={history} />}
      content={
        <DataWithLoader
          data={renderContent()}
          loading={loading}
          count={contractTemplateTotalCounts}
          emptyText="Add in your first contract-templates!"
          emptyImage="/images/actions/1.svg"
        />
      }
    />
  );
}

export default ContractTemplate;
