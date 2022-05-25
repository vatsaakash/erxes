import * as mongoose from 'mongoose';
import { mainDb } from './configs';
import { IContext as IMainContext } from '@erxes/api-utils/src';
import { IEmongoliaDocument } from './models/definitions/emongolia';
import { IEmongoliaModel, loadEmongoliaClass } from './models/Emongolia';

export interface IModels {
  Emongolia: IEmongoliaModel;
}

export interface IContext extends IMainContext {
  subdomain: string;
  models: IModels;
}

export let models: IModels;

export const generateModels = async (
  _hostnameOrSubdomain: string
): Promise<IModels> => {
  if (models) {
    return models;
  }

  loadClasses(mainDb);

  return models;
};

export const loadClasses = (db: mongoose.Connection): IModels => {
  models = {} as IModels;

  models.Emongolia = db.model<IEmongoliaDocument, IEmongoliaModel>(
    'emongolia',
    loadEmongoliaClass(models)
  );

  return models;
};
