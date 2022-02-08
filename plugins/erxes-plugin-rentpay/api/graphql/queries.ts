const queries = [
  {
    name: 'dealsForRentpay',
    handler: async (_root, { priceRange, district, limit }, { models }) => {
      const filter: any = {};

      if (priceRange) {
        const prices = priceRange.split(',');

        filter.unitPrice = {
          $gte: parseInt(prices[0], 10)
        };

        if (prices.length === 2) {
          filter.unitPrice.$lte = parseInt(prices[1], 0);
        }
      }

      if (district) {
        const districts = district.split(',');

        const districtIds = await models.ProductCategories.find({
          code: { $in: districts }
        }).distinct('_id');

        const catIds = await models.ProductCategories.find({
          parentId: { $in: districtIds }
        }).distinct('_id');

        filter.categoryId = { $in: catIds };
      }

      console.log('filter: ', filter);

      const productIds = await models.Products.find(filter).distinct('_id');

      return models.Deals.find({
        'productsData.productId': { $in: productIds }
      }).limit(limit || 20);
    }
  },

  {
    name: 'fieldsForRentpay',
    handler: async (
      _root,
      {
        contentType,
        searchable
      }: {
        contentType: string;
        searchable: boolean;
      },
      { models }
    ) => {
      const query: any = { contentType };

      if (searchable !== undefined) {
        query.searchable = searchable;
      }

      return models.Fields.find(query).sort({ order: 1 });
    }
  }
];

export default [...queries];
