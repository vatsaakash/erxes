const { Schema } = require('mongoose');

const zerocodeConfigSchema = new Schema({
    apiKey: { type: String, label: 'apiKey' },
})

const loadClass = (models) => {
  class ZeroConfig {
    static async createZero(doc) {
      return models.ZeroCodeConfig.create(doc);
    }
  }

  zerocodeConfigSchema.loadClass(ZeroConfig);

  return zerocodeConfigSchema;
};

module.exports = (db, models, subdomain) => {
    models.ZeroCodeConfig = db.model('inbox_zerocode_config', loadClass(models, subdomain))
}