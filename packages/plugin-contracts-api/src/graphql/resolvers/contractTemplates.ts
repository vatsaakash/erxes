import { IContractTemplateDocument } from '../../models/definitions/contractTemplates';

export default {
  /* created user of an contract template */
  createdUser(contractTemplate: IContractTemplateDocument) {
    return (
      contractTemplate.createdBy && {
        __typename: 'User',
        _id: contractTemplate.createdBy
      }
    );
  },

  updatedUser(contractTemplate: IContractTemplateDocument) {
    return (
      contractTemplate.modifiedBy && {
        __typename: 'User',
        _id: contractTemplate.modifiedBy
      }
    );
  }
};
