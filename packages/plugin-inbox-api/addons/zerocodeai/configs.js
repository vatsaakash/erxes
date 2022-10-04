const graphql = require("./graphql");
const generateModels = require("./models");

module.exports = {
  graphql,
  http: [
    {
      path: "/zero",
      method: "post",
      handler: async (addonMeta, req, res) => {
        const meta = await addonMeta();
        const models = await meta.generateModels();

        return res.json(await models.Zero1.find({}))
      },
    },
  ],
  generateModels
};