import { Model } from 'mongoose';
import * as _ from 'underscore';
import { IModels } from '../connectionResolver';
import {
  IContract,
  IContractDocument,
  contractSchema
} from './definitions/contract';

export interface IContractModel extends Model<IContractDocument> {
  createTemplate(doc: IContract): Promise<IContractDocument>;
}

export const loadContractClass = (models: IModels) => {
  class Contract {
    // create
    public static async createTemplate(doc: IContract) {
      return models.Contracts.create({
        ...doc,
        createdAt: new Date()
      });
    }
  }

  contractSchema.loadClass(Contract);

  return contractSchema;
};
