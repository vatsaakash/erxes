import {
  DateContainer,
  FormColumn,
  FormWrapper,
  ScrollWrapper
} from '@erxes/ui/src/styles/main';
import Form from '@erxes/ui/src/components/form/Form';
import FormControl from '@erxes/ui/src/components/form/Control';
import CollapseContent from '@erxes/ui/src/components/CollapseContent';
import { router, __ } from '@erxes/ui/src/utils/core';
import Button from '@erxes/ui/src/components/Button';
import { ControlLabel } from '@erxes/ui/src/components/form';
import FormGroup from '@erxes/ui/src/components/form/Group';
import { ModalFooter } from '@erxes/ui/src/styles/main';
import { IUser } from '@erxes/ui/src/auth/types';
import DateControl from '@erxes/ui/src/components/form/DateControl';
import { IButtonMutateProps, IFormProps } from '@erxes/ui/src/types';
import React from 'react';
import Select from 'react-select-plus';

import {
  IContract,
  IContractCategory,
  IContractDoc,
  IContractTemplate
} from '../types';

type Props = {
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  contract: IContract;
  closeModal: () => void;
  queryParams: any;
  history: any;
  contractCategories: IContractCategory[];
  contractTemplates: IContractTemplate[];
};

type State = {
  users?: IUser[];
  categoryId: string;
  contractId: string;

  moreValues: any;
};

class ContractForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { contract = {}, contractTemplates = {} } = props;

    this.state = {
      users: [],
      categoryId: this.props.queryParams.categoryId,
      contractId: contractTemplates._id,

      moreValues: { ...contract }
    };
  }

  generateDoc = (values: { _id: string } & IContractDoc) => {
    const { contract } = this.props;

    const finalValues = values;

    if (contract) {
      finalValues._id = contract._id;
    }

    return {
      _id: finalValues._id,
      ...this.state,
      ...this.state.moreValues,
      name: finalValues.name,
      contractId: this.state.contractId,
      entranceNum: Number(finalValues.entranceNum),
      doorNum: Number(finalValues.doorNum),
      categoryId: this.state.categoryId,
      status: finalValues.status,
      servicePackageId: Number(finalValues.servicePackageId),
      apartmentId: finalValues.apartmentId,
      deviceId: finalValues.deviceId
    };
  };

  onChangeInput = e => {
    const name = e.target.name;
    let value = e.target.value;
    if (e.target.type === 'number') {
      value = Number(value);
    }

    this.setState({
      moreValues: { ...this.state.moreValues, [name]: value }
    } as any);
  };

  renderFormGroup = (label, props) => {
    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} onChange={this.onChangeInput} />
      </FormGroup>
    );
  };

  onDateChange = (field, date) => {
    this.setState({
      moreValues: { ...this.state.moreValues, [field]: date }
    } as any);
  };

  renderDate = (name, formProps) => {
    return (
      <DateContainer>
        <DateControl
          {...formProps}
          required={false}
          name={name}
          value={this.state.moreValues[name]}
          onChange={this.onDateChange.bind(this, name)}
        />
      </DateContainer>
    );
  };

  renderMain = (formProps: IFormProps) => {
    const contract = this.props.contract || ({} as IContract);
    const { contractCategories, contractTemplates } = this.props;

    const onSelectChange = e => {
      this.setState({ contractId: e.value });
    };

    const onSelectedChange = e => {
      const value = e.value;
      console.log(value, 'sdfghjkl;');
      router.setParams(this.props.history, { categoryId: value });
      this.setState({ categoryId: value });
    };

    return (
      <CollapseContent
        title={__('Ерөнхий мэдээлэл')}
        compact={true}
        open={true}
      >
        <FormWrapper>
          <FormColumn>
            <FormGroup>
              <ControlLabel>Ерөнхий ангилал</ControlLabel>
              <Select
                placeholder={__('Choose parent')}
                value={this.state.categoryId}
                clearable={true}
                onChange={onSelectedChange}
                options={contractCategories.map(ct => ({
                  value: ct._id,
                  label: ct.name
                }))}
              />
            </FormGroup>

            {this.renderFormGroup('Name', {
              ...formProps,
              name: 'name',
              defaultValue: contract.name || ''
            })}

            <FormGroup>
              <ControlLabel>Contract</ControlLabel>
              <Select
                placeholder={__('Choose parent')}
                value={this.state.contractId}
                clearable={true}
                onChange={onSelectChange}
                options={contractTemplates.map(ct => ({
                  value: ct._id,
                  label: ct.name
                }))}
              />
            </FormGroup>

            {this.renderFormGroup('status', {
              ...formProps,
              name: 'status',
              defaultValue: contract.status || ''
            })}
          </FormColumn>

          <FormColumn>
            {this.renderFormGroup('apartmentId', {
              ...formProps,
              name: 'apartmentId',
              defaultValue: contract.apartmentId || ''
            })}
            {this.renderFormGroup('deviceId', {
              ...formProps,
              name: 'deviceId',
              defaultValue: contract.deviceId || ''
            })}
            {this.renderFormGroup('servicePackageId', {
              ...formProps,
              name: 'servicePackageId',
              defaultValue: contract.servicePackageId || 0,
              type: 'number'
            })}

            {this.renderFormGroup('entranceNum', {
              ...formProps,
              name: 'entranceNum',
              defaultValue: contract.entranceNum || 0,
              type: 'number'
            })}

            {this.renderFormGroup('doorNum', {
              ...formProps,
              name: 'doorNum',
              defaultValue: contract.doorNum || 0,
              type: 'number'
            })}
          </FormColumn>

          <FormColumn>
            <FormGroup>
              <ControlLabel>orderCreatedDate</ControlLabel>
              {this.renderDate('orderCreatedDate', formProps)}
            </FormGroup>

            <FormGroup>
              <ControlLabel>installFinishedDate</ControlLabel>
              {this.renderDate('installFinishedDate', formProps)}
            </FormGroup>

            <FormGroup>
              <ControlLabel>contractStartedDate</ControlLabel>
              {this.renderDate('contractStartedDate', formProps)}
            </FormGroup>

            <FormGroup>
              <ControlLabel>contractCancelledDate</ControlLabel>
              {this.renderDate('contractCancelledDate', formProps)}
            </FormGroup>

            <FormGroup>
              <ControlLabel>contractEndDate</ControlLabel>
              {this.renderDate('contractEndDate', formProps)}
            </FormGroup>
          </FormColumn>
        </FormWrapper>
      </CollapseContent>
    );
  };

  renderContent = (formProps: IFormProps) => {
    const { closeModal, renderButton } = this.props;
    const { values, isSubmitted } = formProps;

    return (
      <>
        <ScrollWrapper>{this.renderMain(formProps)}</ScrollWrapper>

        <ModalFooter>
          <Button btnStyle="simple" onClick={closeModal} icon="cancel-1">
            Close
          </Button>

          {renderButton({
            passedName: 'contract',
            values: this.generateDoc(values),
            isSubmitted,
            object: this.props.contract
          })}
        </ModalFooter>
      </>
    );
  };

  render() {
    return <Form renderContent={this.renderContent} />;
  }
}

export default ContractForm;
