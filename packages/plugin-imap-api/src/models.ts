import * as Random from 'meteor-random';
import { Model, Document, Schema } from 'mongoose';

/*
 * Mongoose field options wrapper
 */
const field = options => {
  const { pkey, type, optional } = options;

  if (type === String && !pkey && !optional) {
    options.validate = /\S+/;
  }

  // TODO: remove
  if (pkey) {
    options.type = String;
    options.default = () => Random.id();
  }

  return options;
};

const schemaWrapper = schema => {
  schema.add({ scopeBrandIds: [String] });

  return schema;
};

export interface INotification {
  notifType?: string;
  title?: string;
  content?: string;
  link?: string;
  contentType?: string;
  contentTypeId?: string;
  receiver?: string;
  action?: string;
}

export interface INotificationDocument extends INotification, Document {
  _id: string;
  createdUser?: string;
  receiver: string;
  date: Date;
  isRead: boolean;
}

export const notificationSchema = new Schema({
  _id: field({ pkey: true }),
  link: field({ type: String })
});

export interface INotificationModel extends Model<INotificationDocument> {}

export const loadNotificationClass = models => {
  class Notification {}

  notificationSchema.loadClass(Notification);

  return notificationSchema;
};
