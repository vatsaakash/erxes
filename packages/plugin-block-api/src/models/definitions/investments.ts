import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface IInvestment {
  erxesCustomerId: string;
  packageId: string;
}

export interface IInvestmentDocument extends IInvestment, Document {
  _id: string;
  createdAt: Date;
  modifiedAt: Date;
}

export const investmentSchema = new Schema({
  _id: field({ pkey: true }),
  erxesCustomerId: field({
    type: String,
    label: 'Customer'
  }),
  packageId: field({
    type: String,
    label: 'Package'
  }),
  createdAt: field({
    type: Date,
    default: Date.now,
    label: 'Created at'
  }),
  modifiedAt: field({ type: Date, label: 'Modified at' })
});
