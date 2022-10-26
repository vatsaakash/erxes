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
import { Alert, confirm } from '@erxes/ui/src';

export const contractMenu = [
  { title: 'Contracts', link: '/contracts' },
  { title: 'Contract Template', link: '/contract-template' }
];

type Props = {
  contractTemplates: IContractTemplate[];
  contractTemplateTotalCounts: number;
  queryParams: any;
  loading: boolean;
  removeTemplate: (templateId: string) => void;
  duplicate: (templateId: string) => void;
};

type State = {};

class ContractTemplate extends React.Component<Props, State> {
  renderDate = (createdAt, modifiedAt) => {
    if (createdAt === modifiedAt) {
      if (createdAt === null) return '-';

      return dayjs(createdAt).format('DD MMM YYYY');
    }

    return dayjs(modifiedAt).format('DD MMM YYYY');
  };

  duplicateTemplate = id => {
    this.props.duplicate(id);
  };

  renderDuplicateAction(object) {
    return (
      <div onClick={this.duplicateTemplate.bind(this, object._id)}>
        <Icon icon="copy-1" />
        Duplicate
      </div>
    );
  }

  renderEditAction(object) {
    return (
      <Link to={`/contracts/edit/${object._id}`}>
        <div>
          <Icon icon="edit" />
          Edit
        </div>
      </Link>
    );
  }

  onDelete = templateId => this.props.removeTemplate(templateId);

  renderRow = () => {
    const { contractTemplates } = this.props;

    return contractTemplates.map((object, index) => {
      const { name, content, createdAt, modifiedAt, createdUser, _id } =
        object || {};

      return (
        <Template key={index} isLongName={name.length > 46}>
          <h5>{name}</h5>
          <TemplateBox>
            <Actions>
              {this.renderEditAction(object)}
              <div onClick={this.onDelete.bind(this, object._id)}>
                <Icon icon="cancel-1" /> Delete
              </div>
              {this.renderDuplicateAction(object)}
            </Actions>
            <IframePreview>
              <iframe title="content-iframe" srcDoc={content} />
            </IframePreview>
          </TemplateBox>
          <TemplateInfo>
            <p>{createdAt === modifiedAt ? `Created at` : `Modified at`}</p>
            <p>{this.renderDate(createdAt, modifiedAt)}</p>
          </TemplateInfo>
          <TemplateInfo>
            <p>Created by</p>
            {/* {createdUser ? (
              createdUser.details.fullName && (
                <p>{createdUser.details.fullName}</p>
              )
            ) : ( */}
            <p>erxes Inc</p>
            {/* )}  */}
          </TemplateInfo>
        </Template>
      );
    });
  };

  renderContent = () => {
    return <Templates>{this.renderRow()}</Templates>;
  };

  render() {
    const { contractTemplateTotalCounts, queryParams, loading } = this.props;

    const actionBarRight = (
      <BarItems>
        <FormControl
          type="text"
          placeholder={__('Type to search')}
          autoFocus={true}
        />

        <Link to="contracts/create">
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
            title={
              __(`Contract templates`) + ` (${contractTemplateTotalCounts})`
            }
            queryParams={queryParams}
            submenu={contractMenu}
          />
        }
        actionBar={actionBar}
        footer={<Pagination count={contractTemplateTotalCounts} />}
        leftSidebar={<Sidebar queryParams={queryParams} history={history} />}
        content={
          <DataWithLoader
            data={this.renderContent()}
            loading={loading}
            count={contractTemplateTotalCounts}
            emptyText="Add in your first contract-templates!"
            emptyImage="/images/actions/1.svg"
          />
        }
      />
    );
  }
}

export default ContractTemplate;
