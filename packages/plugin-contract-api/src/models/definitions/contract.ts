import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface IContract {
  name: string;
}

export interface IContractDocument extends IContract, Document {
  _id: string;
}

export const contractSchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: 'Name' })
});
