import { paginate } from 'erxes-api-utils';

const adsQueries = [
	/**
	 * ads list
	 */
	{
		name: 'ads',
		handler: async (_root, params, { models }) => {
			const integration = await models.Integrations.findOne({
				tagIds: params.tagId
			}).lean();

			if (integration) {
				const form = await models.Forms.findOne({
					_id: integration.formId
				}).lean();

				if (!form) {
					return;
				}

				const fields = await models.Fields.find({
					contentType: 'form',
					contentTypeId: form._id
				}).lean();

				const conversations = await paginate(
					models.Conversations.find({
						integrationId: integration._id
					}).sort({ createdAt: -1 }),
					{ page: params.page, perPage: params.perPage }
				);

				const ads = [];
				for (const conversation of conversations) {
					const ad: any = {
						adId: conversation._id,
						customerId: conversation.customerId
					};

					for (const field of fields) {
						const submissions: any[] = await models.FormSubmissions.find({
							contentTypeId: conversation._id
						}).lean();

						const submission = submissions.find(
							e => e.formFieldId === field._id
						);

						ad[field.text] = submission ? submission.value : undefined;
					}

					ads.push(ad);
				}

				const totalCount = await models.Conversations.find({
					integrationId: integration._id
				}).countDocuments();
        
				return { ads, totalCount };
			}
		}
	}
];

export default adsQueries;
