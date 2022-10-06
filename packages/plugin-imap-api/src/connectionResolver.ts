import * as mongoose from 'mongoose';
import {
  ICustomerDocument,
  IIntegrationDocument,
  IConversationDocument,
  IConversationMessageDocument,
  ICustomerModel,
  IIntegrationModel,
  IConversationModel,
  IConversationMessageModel,
  loadCustomerClass,
  loadIntegrationClass,
  loadConversationMessageClass,
  loadConversationClass
} from './models';
import { IContext as IMainContext } from '@erxes/api-utils/src';
import { createGenerateModels } from '@erxes/api-utils/src/core';

export interface IModels {
  Customers: ICustomerModel;
  Integrations: IIntegrationModel;
  ConversationMessages: IConversationMessageModel;
  Conversations: IConversationModel;
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

  models.ConversationMessages = db.model<
    IConversationMessageDocument,
    IConversationMessageModel
  >('imap_conversation_messages', loadConversationMessageClass(models));

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
