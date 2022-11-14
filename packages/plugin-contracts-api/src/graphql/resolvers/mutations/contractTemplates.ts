import { moduleCheckPermission } from '@erxes/api-utils/src/permissions';
import { IContext } from '../../../connectionResolver';
import { IContractTemplate } from '../../../models/definitions/contractTemplates';

interface IContractTemplatesEdit extends IContractTemplate {
  _id: string;
}

const contractTemplateMutations = {
  /**
   * Creates a new contract template
   */
  async contractTemplatesAdd(
    _root,
    doc: IContractTemplate,
    { user, docModifier, models, subdomain }: IContext
  ) {
    const modifiedDoc = docModifier(doc);

    const template = await models.ContractTemplates.createContractTemplate(
      modifiedDoc,
      user
    );

    return template;
  },

  /**
   * Update contract template
   */
  async contractTemplatesEdit(
    _root,
    { _id, ...fields }: IContractTemplatesEdit,
    { models, subdomain, user }: IContext
  ) {
    const updated = await models.ContractTemplates.updateContractTemplate(
      _id,
      fields,
      user._id
    );

    return updated;
  },

  /**
   * Delete contract template
   */
  async contractTemplatesRemove(
    _root,
    { _id }: { _id: string },
    { models, subdomain, user }: IContext
  ) {
    const removed = await models.ContractTemplates.removeContractTemplate(_id);

    return removed;
  },

  /**
   * Duplicate an contract template
   */
  async contractTemplatesDuplicate(
    _root,
    { _id }: { _id: string },
    { models, user }: IContext
  ) {
    const template = await models.ContractTemplates.duplicateContractTemplate(
      _id,
      user
    );

    return template;
  }
};

// moduleCheckPermission(contractTemplateMutations, 'manageContractTemplate');

export default contractTemplateMutations;
