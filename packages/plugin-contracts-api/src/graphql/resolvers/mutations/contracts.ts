import { IContext } from '../../../connectionResolver';
import {
  IContract,
  IContractCategory,
  IContractCategoryDocument,
  IContractDocument
} from '../../../models/definitions/contracts';

interface IContractEdit extends IContract {
  _id: string;
}

interface IContractCategoryEdit extends IContractCategory {
  _id: string;
}

const contractMutations = {
  /**
   * Creates a new contract
   */
  async contractsAdd(_root, doc: IContract, { models }: IContext) {
    const contract = await models.Contracts.createContract(doc);

    return contract;
  },

  async contractsEdit(
    _root,
    doc: IContractDocument,
    { models, user, subdomain }: IContext
  ) {
    const updated = await models.Contracts.updateContract(doc._id, doc);

    return updated;
  },

  async contractsRemove(
    _root,
    { contractIds }: { contractIds: string[] },
    { models, user, subdomain }: IContext
  ) {
    await models.Contracts.removeContracts(subdomain, contractIds);

    return contractIds;
  },

  /**
   * Creates a new contract category
   */
  async contractCategoriesAdd(
    _root,
    doc: IContractCategory,
    { docModifier, models, user, subdomain }: IContext
  ) {
    const contractCategory = await models.ContractCategories.createContractCategory(
      docModifier(doc)
    );

    return contractCategory;
  },

  async contractCategoriesEdit(
    _root,
    doc: IContractCategoryDocument,
    { models, user, subdomain }: IContext
  ) {
    const updated = await models.ContractCategories.updateContractCategory(
      doc._id,
      doc
    );

    return updated;
  },

  async contractCategoriesRemove(
    _root,
    { _id }: { _id: string },
    { models, user, subdomain }: IContext
  ) {
    const removed = await models.ContractCategories.removeContractCategory(_id);

    return removed;
  }
};

// requireLogin(contractMutations, 'contractsAdd');
// requireLogin(contractMutations, 'contractsEdit');
// requireLogin(contractMutations, 'contractsRemove');
// requireLogin(contractMutations, 'contractCategoriesAdd');
// requireLogin(contractMutations, 'contractCategoriesEdit');
// requireLogin(contractMutations, 'contractCategoriesRemove');

export default contractMutations;
