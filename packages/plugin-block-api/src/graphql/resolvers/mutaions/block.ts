import { IContext } from '../../../connectionResolver';
import { getBalance, updateBalance } from '../../../utils';

const blockMutations = {
  /**
   * Creates a new package
   */
  async invest(
    _root,
    doc: { erxesCustomerId: string; packageId: string },
    { subdomain, models }: IContext
  ) {
    const { packageId, erxesCustomerId } = doc;

    const balance = await getBalance(subdomain, erxesCustomerId);

    const packageDetail = await models.Packages.findOne({ _id: packageId });

    if (!packageDetail) {
      throw new Error('Үлдэгдэл хүрэлцэхгүй байна');
    }

    const { price } = packageDetail;

    if (price > balance) {
      throw new Error('Үлдэгдэл хүрэлцэхгүй байна');
    }

    const newBalance = balance - price;

    await updateBalance(subdomain, erxesCustomerId, newBalance);

    const investment = await models.Investments.createInvestment(doc);

    return investment;
  }
};

export default blockMutations;
