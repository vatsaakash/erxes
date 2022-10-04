const mutations = {
  async inboxZerocodeAISaveConfig(_root, doc, { models }) {
    const config = await models.ZeroCodeConfig.findOne({});

    if (config) {
      await models.ZeroCodeConfig.update({}, { $set: doc });
    } else {
      await models.ZeroCodeConfig.create(doc);
    }
  },
};

export default mutations;