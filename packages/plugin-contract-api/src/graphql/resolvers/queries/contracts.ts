import { IContext } from '../../../connectionResolver';
import { paginate } from 'erxes-api-utils';

const contractQueries = {
  async contracts(_root, params, { commonQuerySelector, models }: IContext) {
    const filter: any = commonQuerySelector;

    if (params.type) {
      filter.type = params.type;
    }

    if (params.categoryId) {
      filter.categoryId = params.categoryId;
    }

    // search =========
    if (params.searchValue) {
      filter.name = {
        $in: [new RegExp(`.*${params.searchValue}.*`, 'i')]
      };
    }

    return paginate(
      models.Contracts.find(filter)
        .sort({ createdAt: -1 })
        .lean(),
      { page: params.page, perPage: params.perPage }
    );
  },

  async contractDetail(_root, { _id }: { _id: string }, { models }: IContext) {
    return models.Contracts.findOne({ _id });
  },

  contractCounts(
    _root,
    { type }: { type: string },
    { commonQuerySelector, models }: IContext
  ) {
    const filter: any = commonQuerySelector;

    if (type) {
      filter.type = type;
    }

    return models.Contracts.find(filter).countDocuments();
  },

  contractCategories: async (
    _root,
    { parentId },
    { commonQuerySelector, models }
  ) => {
    const filter: any = commonQuerySelector;

    if (parentId) {
      filter.parentId = parentId;
    }

    return models.ContractCategories.find(filter).sort({ order: 1 });
  },

  contractCategoriesTotalCount: async (_root, _param, { models }) => {
    return models.ContractCategories.find().countDocuments();
  },

  contractCategoryDetail: async (_root, { _id }, { models }) => {
    return models.ContractCategories.findOne({ _id });
  }
};

// checkPermission(contractQueries, 'contracts', 'showContracts');
// checkPermission(contractQueries, 'contractDetail', 'showContracts');
// checkPermission(contractQueries, 'contractCounts', 'showContracts');
// checkPermission(contractQueries, 'contractCategories', 'showContracts');
// checkPermission(contractQueries, 'contractCategoriesTotalCount', 'showContracts');
// checkPermission(contractQueries, 'contractCategoryDetail', 'showContracts');

export default contractQueries;
