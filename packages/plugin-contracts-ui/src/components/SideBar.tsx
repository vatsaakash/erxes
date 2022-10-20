import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import { IButtonMutateProps } from '@erxes/ui/src/types';
import React from 'react';
import CategoryList from '../containers/contractCategory/CategoryList';

function Sidebar({
  loadingMainQuery,
  history,
  queryParams,
  renderButton
}: {
  loadingMainQuery: boolean;
  history: any;
  queryParams: any;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
}) {
  return (
    <Wrapper.Sidebar>
      <CategoryList
        queryParams={queryParams}
        history={history}
        renderButton={renderButton}
      />
    </Wrapper.Sidebar>
  );
}

export default Sidebar;
