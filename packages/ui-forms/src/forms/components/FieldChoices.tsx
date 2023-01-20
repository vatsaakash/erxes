import Icon from '@erxes/ui/src/components/Icon';
import { __ } from '@erxes/ui/src/utils';
import { isEnabled } from '@erxes/ui/src/utils/core';
import React from 'react';
import { FieldWrapper, Options } from '../styles';

type Props = {
  type: string;
  onChoiceClick: (choice: string) => void;
};

type FieldProps = {
  icon: string;
  type: string;
  text: string;
};

function FieldChoice(props: Props & FieldProps) {
  const { icon, type, text, onChoiceClick } = props;

  const onClick = () => {
    onChoiceClick(type);
  };

  return (
    <FieldWrapper onClick={onClick}>
      <Icon icon={icon} size={25} />
      {text || type}
    </FieldWrapper>
  );
}

function FieldChoices(props: Props) {
  const basicFieldTypes = [
    { type: 'input', text: __('Text input'), icon: 'edit-alt' },
    { type: 'textarea', text: __('Text area'), icon: 'paragraph' },
    { type: 'check', text: __('Checkbox'), icon: 'check-square' },
    { type: 'radio', text: __('Radio button'), icon: 'check-circle' },
    { type: 'select', text: __('Select'), icon: 'sort-amount-down' },
    { type: 'file', text: __('File'), icon: 'paperclip' },
    { type: 'email', text: __('Email'), icon: 'envelope' },
    { type: 'phone', text: __('Phone'), icon: 'phone' },
    { type: 'firstName', text: __('First name'), icon: 'user' },
    { type: 'middleName', text: __('Middle name'), icon: 'user' },
    { type: 'lastName', text: __('Last name'), icon: 'user' },
    { type: 'map', text: __('Location/Map'), icon: 'map-marker' },
    { type: 'html', text: __('HTML'), icon: 'code' },
    { type: 'objectList', text: __('Object list'), icon: 'sort-amount-down' },
    { type: 'customProperty', text: __('Custom property'), icon: 'cog' }
  ];

  const leadAdditionalFieldTypes = [
    { type: 'company_primaryName', text: __('Company name'), icon: 'building' },
    {
      type: 'company_primaryEmail',
      text: __('Company Email'),
      icon: 'envelope-alt'
    },
    { type: 'company_primaryPhone', text: __('Company Phone'), icon: 'phone' }
  ];

  return (
    <Options>
      {basicFieldTypes.map((field, index) => (
        <FieldChoice
          {...props}
          key={index}
          type={field.type}
          text={field.text}
          icon={field.icon}
        />
      ))}

      {props.type === 'lead' &&
        leadAdditionalFieldTypes.map((field, index) => (
          <FieldChoice
            {...props}
            key={index}
            type={field.type}
            text={field.text}
            icon={field.icon}
          />
        ))}

      {isEnabled('products') && props.type === 'lead' && (
        <FieldChoice
          {...props}
          type="productCategory"
          text={__('Product/Service')}
          icon="shoppingcart"
        />
      )}
    </Options>
  );
}

export default FieldChoices;
