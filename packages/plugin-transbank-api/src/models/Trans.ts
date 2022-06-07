import { IModels } from '../../../plugin-contacts-api/src/connectionResolver';
import { ITransDocument, ITrans, transSchema } from './definitions/trans';
import { Model } from 'mongoose';

export interface ITransModel extends Model<ITransDocument> {
  createTrans(doc: ITrans): ITransDocument;
  updateTrans(doc: ITrans): ITransDocument;
}

export const loadTransBankClass = (models: IModels) => {
  class TransBank {
    public static async createTrans(doc) {
      const cb = await models.Customers.create({
        ...doc
      });
      return cb;
    }

    public static async updateTrans(doc) {
      const { registerCode } = doc;

      delete doc.registerCode;

      return models.Customers.updateOne({ registerCode }, { $set: doc });
    }
  }
  transSchema.loadClass(TransBank);

  return transSchema;
};
