import { IContext } from '../../../connectionResolver';

const contractQueries = {
  contracts(_root, { _args }, { models }: IContext) {
    // return models.Templates.find({});
    return models.Contracts.find({});
  }
};

export default contractQueries;
