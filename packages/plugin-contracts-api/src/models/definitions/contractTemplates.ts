import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface IContractTemplate {
  name: string;
  categoryId: string;
  html: string;
  css: string;
  templateId?: string;

  createdAt?: Date;
  modifiedAt?: Date;

  createdBy?: string;
  modifiedBy?: string;
}

export interface IContractTemplateDocument extends IContractTemplate, Document {
  _id: string;
}

export const contractTemplateSchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: 'Name' }),
  categoryId: field({
    type: String,
    optional: true,
    label: 'Category Id'
  }),
  html: field({ type: String, optional: true, label: 'Html' }),
  css: field({ type: String, optional: true, label: 'Css' }),

  createdBy: field({ type: String, label: 'Created by' }),
  modifiedBy: field({
    type: String,
    optional: true,
    label: 'Modified by'
  }),

  createdAt: field({
    type: Date,
    label: 'Created at'
  }),
  modifiedAt: field({ type: Date, label: 'Modified at' })
});
