import { paginate } from 'erxes-api-utils';

const adsQueries = [
	/**
	 * ads list
	 */
	{
		name: 'formSubmissionDetail',
		handler: async (_root, params, { models }) => {
			const { contentTypeId } = params;
			const conversation = await models.Conversations.findOne({
				_id: contentTypeId
			}).lean();

			if (!conversation) {
				throw new Error('Form Submission not found');
			}

			const submissions = await models.FormSubmissions.find({
				contentTypeId
			}).lean();

			return {
				...conversation,
				contentTypeId: conversation._id,
				submissions
			};
		}
	}
];

export default adsQueries;
