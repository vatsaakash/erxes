import { __, router } from '@erxes/ui/src/utils';
import Sidebar from '@erxes/ui/src/layout/components/Sidebar';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import React from 'react';
import { Link } from 'react-router-dom';
import { IContractCategory } from '../../types';
import { SidebarList } from '@erxes/ui/src/layout/styles';
import DataWithLoader from '@erxes/ui/src/components/DataWithLoader';
import { SidebarListItem } from '@erxes/ui-settings/src/styles';
import Tip from '@erxes/ui/src/components/Tip';
import Icon from '@erxes/ui/src/components/Icon';

const { Section } = Wrapper.Sidebar;

type Props = {
  history: any;
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

  clearCategoryFilter = () => {
    router.setParams(this.props.history, { categoryId: null });
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
        `${category.name} (${category.contractTemplateCount})`
      ) : (
        <span>
          {category.name} ({category.contractTemplateCount})
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

  renderCategoryHeader() {
    return (
      <>
        <Section.Title>
          {__('Categories')}
          <Section.QuickButtons>
            {router.getParam(this.props.history, 'categoryId') && (
              <a href="#cancel" tabIndex={0} onClick={this.clearCategoryFilter}>
                <Tip text={__('Clear filter')} placement="bottom">
                  <Icon icon="cancel-1" />
                </Tip>
              </a>
            )}
          </Section.QuickButtons>
        </Section.Title>
      </>
    );
  }

  render() {
    return (
      <Sidebar wide={true}>
        <Section maxHeight={488} noShadow={true} noMargin={true}>
          {this.renderCategoryHeader()}
          {this.renderCategoryList()}
        </Section>
      </Sidebar>
    );
  }
}

export default SideBar;
