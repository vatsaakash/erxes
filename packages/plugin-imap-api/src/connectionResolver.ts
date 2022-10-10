import * as mongoose from 'mongoose';
import {
  ICustomerDocument,
  IIntegrationDocument,
  IMessageDocument,
  ICustomerModel,
  IIntegrationModel,
  IMessageModel,
  loadCustomerClass,
  loadIntegrationClass,
  IConversationModel,
  loadMessageClass,
  IConversationDocument,
  loadConversationClass
} from './models';
import { IContext as IMainContext } from '@erxes/api-utils/src';
import { createGenerateModels } from '@erxes/api-utils/src/core';

export interface IModels {
  Customers: ICustomerModel;
  Integrations: IIntegrationModel;
  Conversations: IConversationModel;
  Messages: IMessageModel;
}
export interface IContext extends IMainContext {
  subdomain: string;
  models: IModels;
}

export let models: IModels | null = null;

export const loadClasses = (
  db: mongoose.Connection,
  _subdomain: string
): IModels => {
  models = {} as IModels;

  models.Customers = db.model<ICustomerDocument, ICustomerModel>(
    'imap_customers',
    loadCustomerClass(models)
  );

  models.Integrations = db.model<IIntegrationDocument, IIntegrationModel>(
    'imap_integrations',
    loadIntegrationClass(models)
  );

  models.Messages = db.model<IMessageDocument, IMessageModel>(
    'imap_messages',
    loadMessageClass(models)
  );

  models.Conversations = db.model<IConversationDocument, IConversationModel>(
    'imap_conversations',
    loadConversationClass(models)
  );

  return models;
};

export const generateModels = createGenerateModels<IModels>(
  models,
  loadClasses
);
