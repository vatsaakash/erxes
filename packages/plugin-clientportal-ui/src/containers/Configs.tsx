import BoardSelect from '@erxes/ui-cards/src/boards/containers/BoardSelect';
import { IConfigsMap } from '@erxes/ui-settings/src/general/types';
import CollapseContent from '@erxes/ui/src/components/CollapseContent';
import FormControl from '@erxes/ui/src/components/form/Control';
import FormGroup from '@erxes/ui/src/components/form/Group';
import ControlLabel from '@erxes/ui/src/components/form/Label';
import { __ } from '@erxes/ui/src/utils/core';
import React from 'react';
import { SMSConfig } from '../types';
import { SMS_INTERGRATION_TYPES } from '../constants';
import { Formgroup } from '@erxes/ui/src/components/form/styles';

type Props = {
  onChangeConfig: (code: string, value: any) => void;
  configsMap: IConfigsMap;
};

const MobinetConfigs = (props: Props) => {
  const configs: SMSConfig = props.configsMap.CLIENT_PORTAL_SMS_CONFIGS || {
    messageProApiKey: '',
    messageProPhone: '',
    skytelToken: ''
  };

  React.useEffect(() => {
    props.onChangeConfig(
      'CLIENT_PORTAL_SMS_CONFIGS',
      props.configsMap.CLIENT_PORTAL_SMS_CONFIGS
    );
  }, [props.configsMap]);

  const onChange = e => {
    const { name, value } = e.target;

    props.onChangeConfig('CLIENT_PORTAL_SMS_CONFIGS', {
      ...configs,
      [name]: value
    });
  };

  const renderItem = (
    key: string,
    label: string,
    description?: string,
    componentClass?: string,
    type?: string
  ) => {
    return (
      <FormGroup>
        <ControlLabel uppercase={false}>{label}</ControlLabel>
        {description && <p>{__(description)}</p>}
        <FormControl
          id={key}
          name={key}
          componentClass={componentClass}
          defaultValue={configs[key]}
          onChange={onChange}
          type={type}
        />
      </FormGroup>
    );
  };

  return (
    <>
      <CollapseContent title="Client portal sms">
        {SMS_INTERGRATION_TYPES.map(type => {
          return (
            <>
              <CollapseContent description={''} title={type.label}>
                {type.configs.map(config => {
                  return renderItem(config.value, config.label);
                })}
              </CollapseContent>
            </>
          );
        })}
      </CollapseContent>
    </>
  );
};

export default MobinetConfigs;
