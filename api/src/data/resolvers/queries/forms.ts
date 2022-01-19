import {
  Conversations,
  Forms,
  FormSubmissions,
  Integrations
} from '../../../db/models';
import { IFormSubmissionFilter } from '../../../db/models/definitions/forms';
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
    const integrationsSelector: any = { kind: 'lead', isActive: true };
    let conversationIds: string[] = [];

    if (formId) {
      integrationsSelector.formId = formId;
    }

    if (tagId) {
      integrationsSelector.tagIds = tagId;
    }

    if (contentTypeIds && contentTypeIds.length > 0) {
      conversationIds = contentTypeIds;
    }

    const submissionFilters: any[] = [];

    if (filters && filters.length > 0) {
      for (const filter of filters) {
        const { formFieldId, value } = filter;

        switch (filter.operator) {
          case 'eq':
            submissionFilters.push({ formFieldId, value: { $eq: value } });
            break;

          case 'c':
            submissionFilters.push({
              formFieldId,
              value: { $regex: new RegExp(value) }
            });
            break;

          case 'gte':
            submissionFilters.push({
              formFieldId,
              value: { $gte: value }
            });
            break;

          case 'lte':
            submissionFilters.push({
              formFieldId,
              value: { $lte: value }
            });
            break;

          default:
            break;
        }
      }

      const subs = await FormSubmissions.find({
        $and: submissionFilters
      }).lean();
      conversationIds = subs.map(e => e.contentTypeId);
    }

    const integration = await Integrations.findOne(integrationsSelector).lean();

    // const submissions: any[] = [];

    if (!integration) {
      return null;
    }

    let convsSelector: any = { integrationId: integration._id };

    if (conversationIds.length > 0) {
      convsSelector = { _id: { $in: conversationIds } };
    }

    const test = await Conversations.aggregate([
      { $match: convsSelector },
      {
        $project: {
          _id: 0,
          contentTypeId: '$_id',
          customerId: 1,
          createdAt: 1
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

    console.log(test);
    return test;
  }

  // formSubmissionsTotalCount(
  // 	_root,
  // 	{ integrationId }: { integrationId: string }
  // ) {
  // 	return Conversations.countDocuments({ integrationId });
  // }
};

checkPermission(formQueries, 'forms', 'showForms', []);

export default formQueries;
