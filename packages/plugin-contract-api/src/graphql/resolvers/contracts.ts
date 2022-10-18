import { IContext } from '../../connectionResolver';
import { IContractCategoryDocument } from '../../models/definitions/contracts';

const ContractCategory = {
  __resolveReference({ _id }, { models }: IContext) {
    return models.ContractCategories.findOne({ _id });
  },

  isRoot(category: IContractCategoryDocument, {}) {
    return category.parentId ? false : true;
  },

  async contractCount(
    category: IContractCategoryDocument,
    {},
    { models }: IContext
  ) {
    const product_category_ids = await models.ContractCategories.find(
      { order: { $regex: new RegExp(category.order) } },
      { _id: 1 }
    );

    return models.Contracts.countDocuments({
      categoryId: { $in: product_category_ids },
      status: { $ne: 'Deleted' }
    });
  }
};

export { ContractCategory };
