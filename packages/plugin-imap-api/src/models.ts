import { Document, Model, model, Schema } from 'mongoose';

interface IMail {
  name: string;
  address: string;
}

export interface IAttachmentParams {
  filename: string;
  size: number;
  mimeType: string;
  data?: string;
  attachmentId?: string;
}
export interface ICustomer {
  contactsId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  integrationId?: string;
}

export interface ICustomerDocument extends ICustomer, Document {}

export const customerSchema = new Schema({
  contactsId: String,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String
});

export interface ICustomerModel extends Model<ICustomerDocument> {}

export const loadCustomerClass = models => {
  class Customer {}

  customerSchema.loadClass(Customer);

  return customerSchema;
};

export interface IConversation {
  inboxId: string;
  customerId: string;
  integrationId: string;
}

export interface IConversationDocument extends IConversation, Document {}

export const conversationSchema = new Schema({
  inboxId: String,
  contactsCustomerId: String,
  inboxIntegrationId: String
});

export interface IConversationModel extends Model<IConversationDocument> {}

export const loadConversationClass = models => {
  class Conversation {}

  conversationSchema.loadClass(Conversation);

  return conversationSchema;
};
export interface IMessage {
  inboxConversationId: string;
  messageId: string;
  subject: string;
  body: string;
  to: IMail[];
  cc: IMail[];
  bcc: IMail[];
  from: IMail[];
  attachments?: IAttachmentParams[];
  createdAt: Date;
}

export interface IMessageDocument extends IMessage, Document {}

export const attachmentSchema = new Schema(
  {
    filename: String,
    mimeType: String,
    size: Number,
    attachmentId: String
  },
  { _id: false }
);

const emailSchema = new Schema(
  {
    name: String,
    address: String
  },
  { _id: false }
);

export const messageSchema = new Schema({
  inboxConversationId: String,
  subject: String,
  messageId: { type: String, unique: true },
  body: String,
  to: [emailSchema],
  cc: [emailSchema],
  bcc: [emailSchema],
  from: [emailSchema],
  attachments: [attachmentSchema],
  createdAt: { type: Date, index: true, default: new Date() }
});

export interface IMessageModel extends Model<IMessageDocument> {}

export const loadMessageClass = models => {
  class Message {}

  messageSchema.loadClass(Message);

  return messageSchema;
};
export interface IIntegration {
  inboxId: string;
  host: string;
  user: string;
  password: string;
}

export interface IIntegrationDocument extends IIntegration, Document {}

// schema for integration document
export const integrationSchema = new Schema({
  inboxId: String,
  host: String,
  user: String,
  password: String
});

export interface IIntegrationModel extends Model<IIntegrationDocument> {}

export const loadIntegrationClass = models => {
  class Integration {}

  integrationSchema.loadClass(Integration);

  return integrationSchema;
};
