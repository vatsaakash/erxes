import * as mongoose from 'mongoose';
import { IContext as IMainContext } from '@erxes/api-utils/src';
import { createGenerateModels } from '@erxes/api-utils/src/core';
import {
  IContractCategoryModel,
  IContractModel,
  loadContractCatgoryClass,
  loadContractClass
} from './models/Contracts';
import {
  IContractCategoryDocument,
  IContractDocument
} from './models/definitions/contracts';
import {
  IContractTemplateModel,
  loadContractTemplateClass
} from './models/ContractTemplates';
import { IContractTemplateDocument } from './models/definitions/contractTemplates';

export interface IModels {
  Contracts: IContractModel;
  ContractCategories: IContractCategoryModel;
  ContractTemplates: IContractTemplateModel;
}
export interface IContext extends IMainContext {
  subdomain: string;
  models: IModels;
}

export let models: IModels | null = null;

export const loadClasses = (db: mongoose.Connection): IModels => {
  models = {} as IModels;

  models.Contracts = db.model<IContractDocument, IContractModel>(
    'contracts',
    loadContractClass(models)
  );

  models.ContractCategories = db.model<
    IContractCategoryDocument,
    IContractCategoryModel
  >('contract_categories', loadContractCatgoryClass(models));

  models.ContractTemplates = db.model<
    IContractTemplateDocument,
    IContractTemplateModel
  >('contract_templates', loadContractTemplateClass(models));

  return models;
};

export const generateModels = createGenerateModels<IModels>(
  models,
  loadClasses
);
