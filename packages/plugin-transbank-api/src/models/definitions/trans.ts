import { Document, Schema } from 'mongoose';
import { field, schemaHooksWrapper } from './utils';

export interface ITrans {
  custType: String;
  custName: String;
  firstName: String;
  lastName: String;
  birthDate: Date;
  mobile: Number;
  phone: Number;
  email: String;
  custCode: Number;
  registerCode: String;
  directorName: String;
  directorLastName: String;
  directorRegister: String;
  contactEmpPhone: Number;
}

export interface ITransDocument extends ITrans, Document {
  _id: string;
}

export const transSchema = schemaHooksWrapper(
  new Schema({
    _id: field({ pkey: true }),
    custType: field({ type: String }),
    custName: field({ type: String }),
    firstName: field({ type: String }),
    lastName: field({ type: String }),
    birthDate: field({ type: Date }),
    mobile: field({ type: Number }),
    phone: field({ type: Number }),
    email: field({ type: String }),
    custCode: field({ type: Number }),
    registerCode: field({ type: String }),
    directorName: field({ type: String }),
    directorLastName: field({ type: String }),
    directorRegister: field({ type: String }),
    contactEmpPhone: field({ type: Number })
  }),
  'erxes_transBank'
);

// for trans query. increases search speed, avoids in-memory sorting
transSchema.index({ type: 1, order: 1, name: 1 });
