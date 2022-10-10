import { __, FieldStyle, SidebarCounter, SidebarList } from '@erxes/ui/src';
import React from 'react';
import { Description } from '../../styles';
import { IPackage } from '../../types';

type Props = {
  data: IPackage;
};

class DetailInfo extends React.Component<Props> {
  renderRow = (label, value) => {
    return (
      <li>
        <FieldStyle>{__(`${label}`)}</FieldStyle>
        <SidebarCounter>{value || '-'}</SidebarCounter>
      </li>
    );
  };

  renderColor = colorCode => {
    return (
      <li>
        <FieldStyle>{__(`Color`)}</FieldStyle>
        <SidebarCounter
          style={{ backgroundColor: colorCode, width: 30, height: 15 }}
        />
      </li>
    );
  };

  render() {
    const { data } = this.props;

    return (
      <SidebarList className="no-link">
        {this.renderRow('Name', data.name)}
        {this.renderRow('Description', data.description)}
        {this.renderRow('WP Id', data.wpId)}
        {this.renderRow('Project WP Id', data.projectWpId)}
        {this.renderRow('Project Id', data.projectId)}
        {this.renderRow('Price', data.price)}
        {this.renderRow('Duration', data.duration)}
        {this.renderRow('Profit', data.profit)}
        <li>
          <FieldStyle>{__(`Description`)}</FieldStyle>
        </li>
        <Description
          dangerouslySetInnerHTML={{
            __html: data.description
          }}
        />
      </SidebarList>
    );
  }
}

export default DetailInfo;
