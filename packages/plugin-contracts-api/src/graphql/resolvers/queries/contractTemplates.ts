import {
  checkPermission,
  requireLogin
} from '@erxes/api-utils/src/permissions';
import { IContext } from '../../../connectionResolver';
import { escapeRegExp, paginate } from '@erxes/api-utils/src/core';

interface IListParams {
  page: number;
  perPage: number;
  searchValue: string;
  categoryId: string;
}

const generateFilter = (commonSelector, args: IListParams) => {
  const { searchValue, categoryId } = args;

  const filter: any = commonSelector;

  if (searchValue) {
    filter.name = new RegExp(`.*${searchValue}.*`, 'i');
  }

  if (categoryId) {
    filter.categoryId = categoryId;
  }

  return filter;
};

const contractTemplateQueries = {
  /**
   * Contract templates list
   */
  contractTemplates(
    _root,
    args: IListParams,
    { commonQuerySelector, models }: IContext
  ) {
    const filter = generateFilter(commonQuerySelector, args);

    return paginate(models.ContractTemplates.find(filter), args);
  },

  /**
   * Get all contract templates count. We will use it in pager
   */
  contractTemplateTotalCounts(_root, _args, { models }: IContext) {
    return models.ContractTemplates.find({}).countDocuments();
  }
};

// requireLogin(contractTemplateQueries, 'contractTemplateTotalCounts');
// checkPermission(
//   contractTemplateQueries,
//   'contractTemplates',
//   'showContractTemplates',
//   []
// );

export default contractTemplateQueries;
