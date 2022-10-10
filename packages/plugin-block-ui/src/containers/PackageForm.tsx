import { ButtonMutate } from '@erxes/ui/src';
import { IButtonMutateProps } from '@erxes/ui/src/types';
import React from 'react';
import PackageForm from '../components/PackageForm';
import { mutations, queries } from '../graphql';
import { IPackage } from '../types';

type Props = {
  data: IPackage;
  closeModal: () => void;
};

class PackageFormContainer extends React.Component<Props> {
  render() {
    const renderButton = ({
      passedName,
      values,
      isSubmitted,
      object
    }: IButtonMutateProps) => {
      const { closeModal } = this.props;

      const afterSave = data => {
        closeModal();
      };

      return (
        <ButtonMutate
          mutation={object ? mutations.packagesEdit : mutations.packagesAdd}
          variables={values}
          callback={afterSave}
          refetchQueries={getRefetchQueries()}
          isSubmitted={isSubmitted}
          type="submit"
          successMessage={`You successfully ${
            object ? 'updated' : 'added'
          } a ${passedName}`}
        />
      );
    };

    const updatedProps = {
      ...this.props,
      renderButton
    };

    return <PackageForm {...updatedProps} />;
  }
}

const getRefetchQueries = () => {
  return ['packages', 'packageCounts', 'packageDetail'];
};

export default PackageFormContainer;
