import Button from '@erxes/ui/src/components/Button';
import { ControlLabel } from '@erxes/ui/src/components/form';
import FormControl from '@erxes/ui/src/components/form/Control';
import CommonForm from '@erxes/ui/src/components/form/Form';
import FormGroup from '@erxes/ui/src/components/form/Group';
import { ModalFooter } from '@erxes/ui/src/styles/main';
import { IButtonMutateProps, IFormProps } from '@erxes/ui/src/types';
import { generateCategoryOptions } from '@erxes/ui/src/utils';
import React from 'react';
import { IContractCategory } from '../../types';

type Props = {
  category?: IContractCategory;
  contractCategories: IContractCategory[];
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  closeModal: () => void;
};

class CategoryForm extends React.Component<Props, {}> {
  renderContent = (formProps: IFormProps) => {
    const {
      renderButton,
      closeModal,
      category,
      contractCategories
    } = this.props;
    const { values, isSubmitted } = formProps;

    const object = category || ({} as IContractCategory);

    if (category) {
      values._id = category._id;
    }

    return (
      <>
        <FormGroup>
          <ControlLabel required={true}>Name</ControlLabel>
          <FormControl
            {...formProps}
            name="name"
            defaultValue={object.name}
            autoFocus={true}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel required={true}>Code</ControlLabel>
          <FormControl
            {...formProps}
            name="code"
            defaultValue={object.code}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl
            {...formProps}
            name="description"
            componentClass="textarea"
            rows={5}
            defaultValue={object.description}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Parent Category</ControlLabel>

          <FormControl
            {...formProps}
            name="parentId"
            componentClass="select"
            defaultValue={object.parentId}
          >
            <option value="" />
            {generateCategoryOptions(contractCategories, object._id, true)}
          </FormControl>
        </FormGroup>

        <ModalFooter>
          <Button
            btnStyle="simple"
            onClick={closeModal}
            icon="times-circle"
            uppercase={false}
          >
            Close
          </Button>

          {renderButton({
            passedName: 'contract category',
            values: { ...values },
            isSubmitted,
            callback: closeModal,
            object: category
          })}
        </ModalFooter>
      </>
    );
  };

  render() {
    return <CommonForm renderContent={this.renderContent} />;
  }
}

export default CategoryForm;
