import {
  Conversations,
  Forms,
  FormSubmissions,
  Integrations
} from '../../../db/models';
import { IFormSubmissionFilter } from '../../../db/models/definitions/forms';
import { formSubmissionsQuery } from '../../modules/formSubmissions/queryBuilder';
import { checkPermission } from '../../permissions/wrappers';
import { IContext } from '../../types';

const formQueries = {
  /**
   * Forms list
   */
  forms(_root, _args, { commonQuerySelector }: IContext) {
    return Forms.find(commonQuerySelector).sort({ title: 1 });
  },

  /**
   * Get one form
   */
  formDetail(_root, { _id }: { _id: string }) {
    return Forms.findOne({ _id });
  },

  async formSubmissions(
    _root,
    {
      formId,
      tagId,
      contentTypeIds,
      filters
    }: {
      formId: string;
      tagId: string;
      contentTypeIds: string[];
      filters: IFormSubmissionFilter[];
    }
  ) {
    const convsSelector = await formSubmissionsQuery({
      formId,
      tagId,
      contentTypeIds,
      filters
    });

    const test = await Conversations.aggregate([
      { $match: convsSelector },
      {
        $project: {
          _id: 0,
          contentTypeId: '$_id',
          customerId: 1,
          createdAt: 1,
          customFieldsData: 1
        }
      },
      {
        $lookup: {
          from: 'form_submissions',
          localField: 'contentTypeId',
          foreignField: 'contentTypeId',
          as: 'submissions'
        }
      }
    ]);

    return test;
  },

  async formSubmissionsTotalCount(
    _root,
    {
      formId,
      tagId,
      contentTypeIds,
      filters
    }: {
      formId: string;
      tagId: string;
      contentTypeIds: string[];
      filters: IFormSubmissionFilter[];
    }
  ) {
    const convsSelector = await formSubmissionsQuery({
      formId,
      tagId,
      contentTypeIds,
      filters
    });

    return Conversations.countDocuments(convsSelector);
  }
};

checkPermission(formQueries, 'forms', 'showForms', []);

export default formQueries;
