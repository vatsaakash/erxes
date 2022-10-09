import { IContext } from '../../../connectionResolver';
import { getBalance } from '../../../utils';

const blockQueries = {
  async getBalance(_root, { erxesCustomerId }, { subdomain }: IContext) {
    return getBalance(subdomain, erxesCustomerId);
  },

  async investments(_root, { erxesCustomerId }, { models }: IContext) {
    return models.Investments.find({ erxesCustomerId }).sort({ createdAt: -1 });
  }
};

export default blockQueries;
