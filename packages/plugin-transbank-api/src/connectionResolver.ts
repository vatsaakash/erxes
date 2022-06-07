import * as mongoose from 'mongoose';
import { ITransDocument } from './models/definitions/trans';
import { ITransModel, loadTransBankClass } from './models/Trans';
import { IContext as IMainContext } from '@erxes/api-utils/src';
import { createGenerateModels } from '@erxes/api-utils/src/core';

export interface IModels {
  Trans: ITransModel;
}
export interface IContext extends IMainContext {
  subdomain: string;
  models: IModels;
}

export let models: IModels;

export const loadClasses = (db: mongoose.Connection): IModels => {
  models = {} as IModels;

  models.Trans = db.model<ITransDocument, ITransModel>('trans');

  return models;
};

export const generateModels = createGenerateModels<IModels>(
  models,
  loadClasses
);
