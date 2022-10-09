import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface IPackage {
  name: string;
  description: string;
  wpId: string;
  level: string;
  projectWpId: string;
  projectId: string;
  price: string;
  duration: number;
}

export interface IPackageDocument extends IPackage, Document {
  _id: string;
  createdAt: Date;
  modifiedAt: Date;
}

export const packageSchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: 'Name' }),
  description: field({
    type: String,
    optional: true,
    label: 'Description'
  }),
  wpId: field({ type: String, optional: true, label: 'WP Id' }),
  level: field({ type: String, optional: true, label: 'Level' }),
  projectWpId: field({
    type: String,
    optional: true,
    label: 'Project WP Id'
  }),
  projectId: field({
    type: String,
    optional: true,
    label: 'Project Id'
  }),
  price: field({ type: String, optional: true, label: 'Price' }),
  duration: field({ type: Number, optional: true, label: 'Duration' }),
  createdAt: field({
    type: Date,
    default: Date.now,
    label: 'Created at'
  }),
  modifiedAt: field({ type: Date, label: 'Modified at' })
});
