import Box from '@erxes/ui/src/components/Box';
import DataWithLoader from '@erxes/ui/src/components/DataWithLoader';
import Icon from '@erxes/ui/src/components/Icon';
import { FieldStyle, SidebarList } from '@erxes/ui/src/layout/styles';
import { IRouterProps } from '@erxes/ui/src/types';
import { __, router } from '@erxes/ui/src/utils';
import React from 'react';
import { withRouter } from 'react-router-dom';

export const LEVEL = ['high', 'mid', 'low'];

interface IProps extends IRouterProps {}

function LevelFilter({ history }: IProps) {
  const onRemove = () => {
    router.removeParams(history, 'level');
  };

  const extraButtons = (
    <>
      {router.getParam(history, 'level') && (
        <a href="#" tabIndex={0} onClick={onRemove}>
          <Icon icon="times-circle" />
        </a>
      )}
    </>
  );

  const data = (
    <SidebarList>
      {LEVEL.map(lv => {
        const onClick = () => {
          router.setParams(history, { level: lv });
          router.removeParams(history, 'page');
        };

        return (
          <li key={lv}>
            <a
              href="#filter"
              tabIndex={0}
              className={
                router.getParam(history, 'clientPortalId') === lv
                  ? 'active'
                  : ''
              }
              onClick={onClick}
            >
              <FieldStyle>{lv}</FieldStyle>
            </a>
          </li>
        );
      })}
    </SidebarList>
  );

  return (
    <Box
      title={__('Filter by Level')}
      extraButtons={extraButtons}
      name="showFilterByClientPortalId"
    >
      <DataWithLoader
        data={data}
        loading={false}
        emptyIcon="leaf"
        size="small"
        objective={true}
      />
    </Box>
  );
}

export default withRouter<IProps>(LevelFilter);
