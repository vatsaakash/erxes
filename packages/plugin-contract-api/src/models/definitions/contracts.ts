import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface IContract {
  name: string;
}

export interface IContractDocument extends IContract, Document {
  _id: string;
}

export interface IContractCategory {
  name: string;
  code: string;
  parentId?: string;
  description?: string;
}

export interface IContractCategoryDocument extends IContractCategory, Document {
  _id: string;
  order: string;
  createdAt: Date;
}

export const contractCategorySchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: 'Name' }),
  code: field({ type: String, unique: true, label: 'Code' }),
  order: field({ type: String, label: 'Order' }),
  parentId: field({ type: String, optional: true, label: 'Parent' }),
  description: field({ type: String, optional: true, label: 'Description' }),
  createdAt: field({
    type: Date,
    default: new Date(),
    label: 'Created at'
  })
});

export const contractSchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: 'Name' })
});
