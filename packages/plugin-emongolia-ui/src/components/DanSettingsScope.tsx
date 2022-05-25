import {
  __,
  Button,
  CollapseContent,
  ControlLabel,
  FormControl,
  FormGroup,
  MainStyleModalFooter as ModalFooter
} from '@erxes/ui/src';
import React from 'react';
import { IConfigsMap } from '../types';
import Select from 'react-select-plus';
import { TYPES } from '../constants';

type Props = {
  configsMap: IConfigsMap;
  config: any;
  currentConfigKey: string;
  save: (configsMap: IConfigsMap) => void;
  delete: (currentConfigKey: string) => void;
  onChange: (name: string, value: any) => void;
};

type State = {
  config: any;
  hasOpen: boolean;
  types: string[];
};

class PerSettings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      config: props.config,
      hasOpen: false,
      types: []
    };
  }

  onSave = e => {
    e.preventDefault();
    const { configsMap, currentConfigKey } = this.props;
    const { config } = this.state;

    delete configsMap.danConfig[currentConfigKey];
    configsMap.danConfig = config;
    this.props.save(configsMap);
  };

  onDelete = e => {
    e.preventDefault();

    this.props.delete(this.props.currentConfigKey);
  };

  onChangeConfig = (code: string, value) => {
    const { config } = this.state;
    config[code] = value;
    this.setState({ config });
  };

  onChangeInput = (code: string, e) => {
    this.onChangeConfig(code, e.target.value);
  };

  onChangeDate = (code: string, value) => {
    this.onChangeConfig(code, value);
  };
  onSelectTypes = values => {
    this.setState({ types: values.map(val => val.value) });
  };

  render() {
    const { config } = this.state;

    return (
      <CollapseContent
        title={__(config.title)}
        open={this.props.currentConfigKey === 'newEbarimtConfig' ? true : false}
      >
        <FormGroup>
          <ControlLabel>{'Title'}</ControlLabel>
          <FormControl
            defaultValue={config['title']}
            onChange={this.onChangeInput.bind(this, 'title')}
            required={true}
            autoFocus={true}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>{'Response_type'}</ControlLabel>
          <FormControl
            defaultValue={config['response_type']}
            onChange={this.onChangeInput.bind(this, 'response_type')}
            required={true}
            autoFocus={true}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>{'Redirect_URI'}</ControlLabel>
          <FormControl
            defaultValue={config['redirect_uri']}
            onChange={this.onChangeInput.bind(this, 'redirect_uri')}
            required={true}
            autoFocus={true}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>{'Scope'}</ControlLabel>
          <Select
            multi={true}
            defaultValue={config['scope']}
            autoFocus={true}
            required={true}
            className="flex-item"
            placeholder={'Choose e-mongolia service'}
            value={this.state.types}
            onChange={this.onSelectTypes}
            options={TYPES.map(key => ({
              label: key.label,
              value: key.serviceName
            }))}
          />
        </FormGroup>

        <ModalFooter>
          <Button
            btnStyle="simple"
            icon="cancel-1"
            onClick={this.onDelete}
            uppercase={false}
          >
            Delete
          </Button>

          <Button
            btnStyle="primary"
            icon="check-circle"
            onClick={this.onSave}
            uppercase={false}
          >
            Save
          </Button>
        </ModalFooter>
      </CollapseContent>
    );
  }
}
export default PerSettings;
