import { IContext } from '../../../connectionResolver';

const blockQueries = {
  async packages(_root, { _args }, { models }: IContext) {
    return models.Packages.find({});
  },

  async packageDetail(_root, { _id }: { _id: string }, { models }: IContext) {
    return models.Packages.findOne({ _id });
  }
};

export default blockQueries;
