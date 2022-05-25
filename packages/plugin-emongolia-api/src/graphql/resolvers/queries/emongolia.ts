const danLoginQueries = {
  getDanLogin: async (_root, { customerId }, { models }) => {
    return await models.getDanLogin.find({ customerId });
  }
};

export default danLoginQueries;
