import { IContext } from '../../../connectionResolver';
import { IContract } from '../../../models/definitions/contract';

interface IContractEdit extends IContract {
  _id: string;
}

const contractMutations = {
  /**
   * Creates a new contract
   */
  async contractsAdd(_root, doc: IContract, { models }: IContext) {
    const template = await models.Contracts.createTemplate(doc);

    return template;
  }
};

// commented out for testing purposes
// requireLogin(contractMutations, 'contractsAdd');

export default contractMutations;
