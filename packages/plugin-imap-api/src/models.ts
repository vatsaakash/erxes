import { Document, Model, model, Schema } from 'mongoose';

interface IMail {
  name: string;
  email: string;
}

export interface IAttachmentParams {
  filename: string;
  size: number;
  mimeType: string;
  data?: string;
  attachmentId?: string;
}
export interface IMailParams {
  conversationId: string;
  shouldResolve?: boolean;
  erxesApiMessageId: string;
  unread?: boolean;
  messageId: string;
  headerId: string;
  threadId: string;
  subject: string;
  body: string;
  to: IMail[];
  cc: IMail[];
  bcc: IMail[];
  from: IMail[];
  references?: string[];
  inReplyTo?: string;
  replyTo?: string;
  labelIds?: string[];
  reply?: string[];
  attachments?: IAttachmentParams[];
}

export interface ICustomer {
  email: string;
  firstName?: string;
  lastName?: string;
  erxesApiId?: string;
  integrationId?: string;
}

export interface ICustomerDocument extends ICustomer, Document {}

export const customerSchema = new Schema({
  email: { type: String, unique: true },
  erxesApiId: String,
  firstName: String,
  lastName: String,
  integrationId: String
});

export interface ICustomerModel extends Model<ICustomerDocument> {}

export const loadCustomerClass = models => {
  class Customer {}

  customerSchema.loadClass(Customer);

  return customerSchema;
};
export interface IConversation {
  to: string;
  from: string;
  threadId: string;
  content: string;
  customerId: string;
  erxesApiId: string;
  createdAt: Date;
  integrationId: string;
}

export interface IConversationDocument extends IConversation, Document {}

export const conversationSchema = new Schema({
  to: { type: String, index: true },
  from: { type: String, index: true },
  content: String,
  customerId: String,
  erxesApiId: String,
  integrationId: String,
  threadId: String,
  createdAt: { type: Date, index: true, default: new Date() }
});

export interface IConversationModel extends Model<IConversationDocument> {}

export const loadConversationClass = models => {
  class Conversation {}

  conversationSchema.loadClass(Conversation);

  return conversationSchema;
};

export interface IConversationMessage extends IMailParams {
  conversationId: string;
  erxesApiMessageId: string;
  createdAt: Date;
}

export interface IConversationMessageDocument
  extends IConversationMessage,
    Document {}

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
    email: String
  },
  { _id: false }
);

export const conversationMessageSchema = new Schema({
  conversationId: String,
  erxesApiMessageId: String,
  subject: String,
  messageId: { type: String, unique: true },
  body: String,
  threadId: String,
  to: [emailSchema],
  cc: [emailSchema],
  bcc: [emailSchema],
  from: [emailSchema],
  references: [String],
  unread: { type: Boolean, default: true },
  headerId: String,
  sender: String,
  replyTo: String,
  inReplyTo: String,
  attachments: [attachmentSchema],
  createdAt: { type: Date, index: true, default: new Date() }
});

export interface IConversationMessageModel
  extends Model<IConversationMessageDocument> {}

export const loadConversationMessageClass = models => {
  class ConversationMessage {}

  conversationMessageSchema.loadClass(ConversationMessage);

  return conversationMessageSchema;
};
export interface IIntegration {
  erxesApiId: string;
  host: string;
  user: string;
  password: string;
}

export interface IIntegrationDocument extends IIntegration, Document {}

// schema for integration document
export const integrationSchema = new Schema({
  erxesApiId: String,
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
