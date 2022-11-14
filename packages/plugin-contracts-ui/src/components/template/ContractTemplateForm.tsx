import React from 'react';
import { __ } from '@erxes/ui/src/utils/core';
import { IContractCategory, IContractTemplate } from '../../types';
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
import Select from 'react-select-plus';
import { generateTree } from '../../utils';
import { EditorContainer } from '../../styles';
import GrapesJS from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import 'grapesjs/dist/css/grapes.min.css';

type Props = {
  contractTemplate?: IContractTemplate;
  contractCategories: IContractCategory[];
  queryParams: any;
  save: (name: string, categoryId: string, content: string) => void;
};

type State = {
  name: string;
  categoryId: string;
  content: string;
};

class ContractForm extends React.Component<Props, State> {
  grapes;

  constructor(props: Props) {
    super(props);

    const contractTemplate = props.contractTemplate || ({} as any);

    this.state = {
      name: contractTemplate.name || '',
      categoryId: contractTemplate.categoryId || '',
      content: contractTemplate.content || ''
    };
  }

  componentDidMount() {
    this.grapes = GrapesJS.init({
      protectedCss: '',
      container: `#editor`,
      fromElement: true,
      plugins: [gjsPresetWebpage],
      pluginsOpts: {},

      storageManager: false,
      assetManager: {},
      pageManager: {},
      layerManager: {
        appendTo: '#layers-container'
      }
    });
  }

  handleSubmit = () => {
    const { save } = this.props;
    const { name, categoryId, content } = this.state;

    save(name, categoryId, content);
  };

  onChangeTemplateValue = (key: string, value: any) => {
    this.setState({ [key]: value } as any);
  };

  renderPageContent = () => {
    const imagePath = '/images/icons/erxes-12.svg';
    const { contractCategories } = this.props;
    const { name, categoryId, content } = this.state;

    const categories = contractCategories.map(c => {
      if (c.parentId === null) {
        return { ...c, parentId: '' };
      }

      return c;
    });

    const options = generateTree(categories, '', (node, level) => ({
      value: node._id,
      label: `${'---'.repeat(level)} ${node.name}`
    }));

    const onChange = e => {
      const value = e.value;

      this.setState({ categoryId: value });
    };

    return (
      <Step img={imagePath} title="Contract builder page" noButton={true}>
        <FlexItem>
          <FlexPad direction="column" overflow="auto">
            <FormGroup>
              <ControlLabel>Name:</ControlLabel>
              <FormControl
                placeholder="Enter a name"
                name="name"
                defaultValue={name}
                type="text"
                required={true}
                autoFocus={true}
                onChange={(e: any) =>
                  this.onChangeTemplateValue('name', e.target.value)
                }
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>{__('Choose Category')}</ControlLabel>
              <Select
                options={options}
                value={categoryId}
                onChange={onChange}
              />
            </FormGroup>

            <div id="layers-container" />
          </FlexPad>

          <FlexItem overflow="auto" count="7">
            <EditorContainer>
              <div id="editor" />
            </EditorContainer>
          </FlexItem>
        </FlexItem>
      </Step>
    );
  };

  renderButtons = () => {
    return (
      <Button.Group>
        <Link to="/contract-template">
          <Button btnStyle="simple" icon="times-circle">
            Cancel
          </Button>
        </Link>

        <Button
          btnStyle="success"
          type="submit"
          icon="check-circle"
          onClick={this.handleSubmit}
        >
          Save
        </Button>
      </Button.Group>
    );
  };

  render() {
    const { contractTemplate } = this.props;

    const breadcrumb = [
      { title: 'Contract Template', link: '/contract-template' },
      { title: __('Contract') }
    ];

    return (
      <StepWrapper>
        <Wrapper.Header title={'Contract Form'} breadcrumb={breadcrumb} />
        <Steps>{this.renderPageContent()}</Steps>

        <ControlWrapper>
          <Indicator>
            {__('You are')} {contractTemplate ? 'editing ' : 'creating '}
            {__('contract')}
          </Indicator>
          {this.renderButtons()}
        </ControlWrapper>
      </StepWrapper>
    );
  }
}

export default ContractForm;
