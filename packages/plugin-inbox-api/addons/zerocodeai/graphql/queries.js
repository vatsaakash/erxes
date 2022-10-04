const { requireLogin } = require('@erxes/api-utils/src/permissions');

const queries = {
  inboxZerocodeConfig(_root, _args, { models }) {
    return models.ZeroCodeConfig.findOne({});
  },
};

// requireLogin(queries, 'zerocode');

export default queries;