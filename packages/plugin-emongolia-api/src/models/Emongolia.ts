import { IEmongoliaDocument, danSchema } from './definitions/emongolia';

import { Model } from 'mongoose';

export const loadEmongoliaClass = models => {
  class Emongolia {
    public static async getEmongolia(_id: string) {
      const emongolia = await models.Emongolia.findOne({ _id });

      if (!emongolia) {
        throw new Error('Emongolia not found');
      }

      return emongolia;
    }
    /*
            * Create new emongolia

            */
    public static async createEmongolia(doc: any, user: any) {
      const emongolia = await models.Emongolia.create({
        createdBy: user._id,
        createdAt: doc.createdAt || new Date(),
        ...doc
      });

      return emongolia;
    }

    /*
     * Update emongolia
     */
    public static async updateEmongolia(
      _id: string,
      doc: IEmongoliaDocument,
      user: any
    ) {
      await models.Emongolia.updateOne(
        { _id },
        {
          $set: {
            updatedBy: user._id,
            updatedAt: new Date(),
            ...doc
          }
        }
      );

      return models.Emongolia.findOne({ _id });
    }

    /*
     * Remove emongolia
     */
    public static async removeEmongolia(_id: string) {
      const emongoliaObj = await models.Emongolia.findOne({ _id });

      if (!emongoliaObj) {
        throw new Error('Emongolia not found');
      }

      await models.Emongolia.deleteOne({ _id });
    }
  }
  danSchema.loadClass(Emongolia);
  return danSchema;
};

export interface IEmongoliaModel extends Model<IEmongoliaDocument> {
  getEmongolia(_id: string);
  createEmongolia(doc: any, user: any);
  updateEmongolia(_id: string, doc: IEmongoliaDocument, user: any);
  removeEmongolia(_id: string);
}
