const adsMutations = [
	/**
	 * ad detail
	 */
	{
		name: 'formSubmissionsEdit',
		handler: async (_root, params, { models }) => {
			const { contentTypeId, customerId, submissions } = params;
			const conversation = await models.Conversations.findOne({
				_id: contentTypeId,
				customerId
			}).lean();

			if (!conversation) {
				throw new Error('Form submission not found !');
			}

			for (const submission of submissions) {
				const { _id, value } = submission;
				await models.FormSubmissions.updateOne(
					{ _id },
					{ $set: { value } }
				);
			}

			const formSubmissions = await models.FormSubmissions.find({
				contentTypeId
			}).lean();

			return {
				...conversation,
				contentTypeId: conversation._id,
				submissions: formSubmissions
			};
		}
	},
	{
		name: 'formSubmissionsRemove',
		handler: async (_root, params, { models }) => {
			const { customerId, contentTypeId } = params;
			const removed = await models.Conversations.deleteOne({
				customerId,
				_id: contentTypeId
			});
			
			await models.FormSubmissions.remove({ customerId, contentTypeId });

			return removed;
		}
	}
];

export default adsMutations;
