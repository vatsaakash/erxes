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
  }
};
