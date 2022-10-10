import * as path from 'path';

import EmptyState from '@erxes/ui/src/components/EmptyState';
import LeftSidebar from './LeftSidebar';
import React from 'react';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import { __ } from 'coreui/utils';
import asyncComponent from '@erxes/ui/src/components/AsyncComponent';
import { isEnabled } from '@erxes/ui/src/utils/core';
import { IPackage } from '../../types';

const ActivityInputs = asyncComponent(
  () =>
    isEnabled('logs') &&
    import(
      /* webpackChunkName: "ActivityInputs" */ '@erxes/ui-log/src/activityLogs/components/ActivityInputs'
    )
);

const ActivityLogs = asyncComponent(
  () =>
    isEnabled('logs') &&
    import(
      /* webpackChunkName: "ActivityLogs" */ '@erxes/ui-log/src/activityLogs/containers/ActivityLogs'
    )
);

type Props = {
  data: IPackage;
};

class CarDetails extends React.Component<Props> {
  renderContent(content) {
    if (isEnabled('logs')) {
      return content;
    }

    return (
      <EmptyState
        image="/images/actions/5.svg"
        text={__('No results found')}
        size="full"
      />
    );
  }

  render() {
    const { data } = this.props;

    const title = data.name || 'Unknown';

    const breadcrumb = [
      { title: __('Packages'), link: '/block/list' },
      { title }
    ];

    const content = (
      <>
        <ActivityInputs
          contentTypeId={data._id}
          contentType="block"
          showEmail={false}
        />
        <ActivityLogs
          target={data.name || ''}
          contentId={data._id}
          contentType="block"
          extraTabs={[]}
        />
      </>
    );

    return (
      <Wrapper
        header={<Wrapper.Header title={title} breadcrumb={breadcrumb} />}
        leftSidebar={<LeftSidebar {...this.props} />}
        // rightSidebar={<RightSidebar car={car} />}
        content={this.renderContent(content)}
        transparent={true}
      />
    );
  }
}

export default CarDetails;
