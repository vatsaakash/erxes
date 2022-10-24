import React from 'react';
import { __ } from '@erxes/ui/src/utils/core';
import { IContractCategory } from '../../types';
import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import {
  ControlWrapper,
  FlexItem,
  FlexPad,
  Indicator,
  StepWrapper
} from '@erxes/ui/src/components/step/styles';
import Steps from '@erxes/ui/src/components/step/Steps';
import Step from '@erxes/ui/src/components/step/Step';
import { Link } from 'react-router-dom';
import Button from '@erxes/ui/src/components/Button';
import FormGroup from '@erxes/ui/src/components/form/Group';
import ControlLabel from '@erxes/ui/src/components/form/Label';
import FormControl from '@erxes/ui/src/components/form/Control';
import EditorCK from '@erxes/ui/src/containers/EditorCK';

type Props = {
  contractCategories: IContractCategory[];
  contractCategoriesCount: number;
  queryParams: any;
};

function ContractForm(props: Props) {
  const { contractCategories, contractCategoriesCount, queryParams } = props;

  const breadcrumb = [
    { title: 'Contract Template', link: '/contract-template' },
    { title: __('Contract') }
  ];

  const renderPageContent = () => {
    const imagePath = '/images/icons/erxes-12.svg';

    return (
      <Step img={imagePath} title="Contract builder page" noButton={true}>
        <FlexItem>
          <FlexPad direction="column" overflow="auto">
            <FormGroup>
              <ControlLabel>Name:</ControlLabel>
              <FormControl
                placeholder="Enter a name"
                // onChange={(e: any) => this.onChange('name', e.target.value)}
                // defaultValue={name}
              />
            </FormGroup>

            <FlexItem overflow="auto" count="7">
              <EditorCK
                content={''}
                height={300}
                name={'registrationContent'}
                insertItems={{
                  items: [
                    {
                      value: 'link',
                      name: 'Link'
                    }
                  ],
                  title: 'Attributes',
                  label: 'Attributes'
                }}
              />
            </FlexItem>
          </FlexPad>
        </FlexItem>
      </Step>
    );
  };

  const renderButtons = () => {
    return (
      <Button.Group>
        <Link to="/contract-template">
          <Button btnStyle="simple" icon="times-circle">
            Cancel
          </Button>
        </Link>

        <Button btnStyle="success" icon={'check-circle'}>
          Save
        </Button>
      </Button.Group>
    );
  };

  return (
    <StepWrapper>
      <Wrapper.Header title={'Contract Form'} breadcrumb={breadcrumb} />
      <Steps>{renderPageContent()}</Steps>

      <ControlWrapper>
        <Indicator>
          {__('You are')} {'creating '}
          {__('contract')}
        </Indicator>
        {renderButtons()}
      </ControlWrapper>
    </StepWrapper>
  );
}

export default ContractForm;
