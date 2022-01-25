const adsQueries = [
	{
		name: 'dealsForCP',
		handler: async (_root, params, { commonQuerySelector, models }) => {
			const filter = {
				...commonQuerySelector
			};

			const deals = await models.Deals.find({ stageId: params.stageId, ...filter });

			const dealProductIds = deals.flatMap(deal => {
				if (deal.productsData && deal.productsData.length > 0) {
					return deal.productsData.flatMap(
						pData => pData.productId || []
					);
				}

				return [];
			});

			const products = await models.Products.find({
				_id: { $in: [...new Set(dealProductIds)] }
			}).lean();

			for (const deal of deals) {
				if (
					!deal.productsData ||
					(deal.productsData && deal.productsData.length === 0)
				) {
					continue;
				}

				deal.products = [];

				for (const pData of deal.productsData) {
					if (!pData.productId) {
						continue;
					}

					deal.products.push({
						...(typeof pData.toJSON === 'function'
							? pData.toJSON()
							: pData),
						product:
							products.find(p => p._id === pData.productId) || {}
					});
				}
			}

			return deals;
		}
	},
	{
		name: 'dealDetailForCP',
		handler: async (_root, params, { commonQuerySelector, models }) => {
			const filter = {
				...commonQuerySelector
			};

			return models.Deals.findOne({_id: params._id}).lean();
		}
	}
];

export default adsQueries;
