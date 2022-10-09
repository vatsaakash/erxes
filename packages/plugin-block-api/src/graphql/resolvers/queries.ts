import { IContext } from '../../connectionResolver';

const blockQueries = {
  packages(_root, { _args }, { models }: IContext) {
    return models.Packages.find({});
  }
};

export default blockQueries;
