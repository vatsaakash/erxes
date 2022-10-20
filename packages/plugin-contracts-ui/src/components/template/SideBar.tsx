import { __ } from '@erxes/ui/src/utils';
import Sidebar from '@erxes/ui/src/layout/components/Sidebar';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import React from 'react';
import { Link } from 'react-router-dom';
import { IContractCategory } from '../../types';
import { SidebarList } from '@erxes/ui/src/layout/styles';
import DataWithLoader from '@erxes/ui/src/components/DataWithLoader';
import { SidebarListItem } from '@erxes/ui-settings/src/styles';

const { Section } = Wrapper.Sidebar;

type Props = {
  queryParams: any;
  contractCategories: IContractCategory[];
  contractCategoriesCount: number;
  loading: boolean;
};

class SideBar extends React.Component<Props> {
  isActive = (id: string) => {
    const { queryParams } = this.props;
    const currentGroup = queryParams.categoryId || '';

    return currentGroup === id;
  };

  renderContent() {
    const { contractCategories } = this.props;

    const result: React.ReactNode[] = [];

    for (const category of contractCategories) {
      const order = category.order;

      const m = order.match(/[/]/gi);

      let space = '';

      if (m) {
        space = '\u00a0\u00a0'.repeat(m.length);
      }

      const name = category.isRoot ? (
        `${category.name} (${category.contractCount})`
      ) : (
        <span>
          {category.name} ({category.contractCount})
        </span>
      );

      result.push(
        <SidebarListItem
          key={category._id}
          isActive={this.isActive(category._id)}
        >
          <Link to={`?categoryId=${category._id}`}>
            {space}
            {name}
          </Link>
        </SidebarListItem>
      );
    }

    return result;
  }

  renderCategoryList() {
    const { contractCategoriesCount, loading } = this.props;

    return (
      <SidebarList>
        <DataWithLoader
          data={this.renderContent()}
          loading={loading}
          count={contractCategoriesCount}
          emptyText="There is no contract category"
          emptyIcon="folder-2"
          size="small"
        />
      </SidebarList>
    );
  }
  render() {
    return (
      <Sidebar wide={true}>
        <Section maxHeight={488} noShadow={true} noMargin={true}>
          {this.renderCategoryList()}
        </Section>
      </Sidebar>
    );
  }
}

export default SideBar;
