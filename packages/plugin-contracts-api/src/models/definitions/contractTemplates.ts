import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface IContractTemplate {
  name: string;
  content: string;
  categoryId: string;
  createdAt?: Date;
  modifiedAt?: Date;
  createdBy?: string;
}

export interface IContractTemplateDocument extends IContractTemplate, Document {
  _id: string;
}

export const contractTemplateSchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: 'Name' }),
  categoryId: field({ type: String, optional: true, label: 'Category Id' }),
  content: field({ type: String, optional: true, label: 'Content' }),
  createdAt: field({
    type: Date,
    label: 'Created at'
  }),
  createdBy: field({ type: String, label: 'Created by' }),
  modifiedAt: field({ type: Date, label: 'Modified at' })
});
