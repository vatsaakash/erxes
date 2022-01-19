import { FormSubmissions, Integrations } from '../../../db/models';
import { IFormSubmissionFilter } from '../../../db/models/definitions/forms';

export const formSubmissionsQuery = async ({
  formId,
  tagId,
  contentTypeIds,
  filters
}: {
  formId: string;
  tagId: string;
  contentTypeIds: string[];
  filters: IFormSubmissionFilter[];
}) => {
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

  return convsSelector;
};
