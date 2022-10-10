import {
  __,
  Alert,
  Button,
  confirm,
  DropdownToggle,
  Icon,
  MainStyleInfoWrapper as InfoWrapper,
  ModalTrigger,
  Sidebar
} from '@erxes/ui/src';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PackageForm from '../../containers/PackageForm';
import { Action, Name } from '../../styles';
import { IPackage } from '../../types';
import DetailInfo from './DetailInfo';

type Props = {
  data: IPackage;
  remove: () => void;
};

class BasicInfoSection extends React.Component<Props> {
  renderAction() {
    const { remove } = this.props;

    const onDelete = () =>
      confirm()
        .then(() => remove())
        .catch(error => {
          Alert.error(error.message);
        });

    return (
      <Action>
        <Dropdown>
          <Dropdown.Toggle as={DropdownToggle} id="dropdown-info">
            <Button btnStyle="simple" size="medium">
              {__('Action')}
              <Icon icon="angle-down" />
            </Button>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <li>
              <a href="#delete" onClick={onDelete}>
                {__('Delete')}
              </a>
            </li>
          </Dropdown.Menu>
        </Dropdown>
      </Action>
    );
  }

  render() {
    const { Section } = Sidebar;
    const { data } = this.props;

    const content = props => <PackageForm {...props} data={data} />;

    return (
      <Sidebar.Section>
        <InfoWrapper>
          <Name>{data.name}</Name>
          <ModalTrigger
            title="Edit basic info"
            trigger={<Icon icon="edit" />}
            size="lg"
            content={content}
          />
        </InfoWrapper>

        {this.renderAction()}
        <Section>
          <DetailInfo data={data} />
        </Section>
      </Sidebar.Section>
    );
  }
}

export default BasicInfoSection;
