const queries = [
  {
    name: 'dealsForRentpay',
    handler: async (_root, { priceRange }, { models }) => {
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

      const productIds = await models.Products.find(filter).distinct('_id');

      return models.Deals.find({
        'productsData.productId': { $in: productIds }
      });
    }
  }
];

export default [...queries];
