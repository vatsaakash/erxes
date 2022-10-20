import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface IContract {
  name: string;
  contractId: string;
  categoryId: string;
  status: string;
  servicePackageId: number;
  userId: string;
  selectedMemberIds: string;
  apartmentId: string;
  deviceId: string;
  entranceNum: number;
  doorNum: number;
  orderCreatedDate: Date;
  installFinishedDate: Date;
  contractStartedDate: Date;
  contractCancelledDate: Date;
  contractEndDate: Date;
  serviceLoginUser: string;
  servicePassword: string;
  parentalControlEnableStatus: string;
  penaltyServiceFee: number;
}

export interface IContractDocument extends IContract, Document {
  _id: string;
  createdAt: Date;
  modifiedAt: Date;
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
  createdAt: field({ type: Date, label: 'Created at' }),
  modifiedAt: field({ type: Date, label: 'Modified at' }),
  name: field({ type: String, label: 'Name' }),
  categoryId: field({
    type: String,
    optional: true,
    label: 'Category Id'
  }),
  contractId: field({
    type: String,
    optional: true,
    label: 'Contract Id'
  }),
  status: field({ type: String, optional: true, label: 'Status' }),
  servicePackageId: field({
    type: String,
    optional: true,
    label: 'Service Package Id'
  }),
  userId: field({ type: String, optional: true, label: 'User Id' }),
  selectedMemberIds: field({
    type: String,
    optional: true,
    label: 'selectedMemberIds'
  }),
  apartmentId: field({
    type: String,
    optional: true,
    label: 'Apartment Id'
  }),
  deviceId: field({ type: String, optional: true, label: 'Device Id' }),
  entranceNum: field({
    type: Number,
    optional: true,
    label: 'Entrance Num'
  }),
  doorNum: field({ type: Number, optional: true, label: 'Door Num' }),
  orderCreatedDate: field({
    type: Date,
    optional: true,
    label: 'Order Created Date'
  }),
  installFinishedDate: field({
    type: Date,
    optional: true,
    label: 'Name'
  }),
  contractStartedDate: field({
    type: Date,
    optional: true,
    label: 'Install Finished Date'
  }),
  contractCancelledDate: field({
    type: Date,
    optional: true,
    label: 'Contract Cancelled Date'
  }),
  contractEndDate: field({
    type: Date,
    optional: true,
    label: 'Contract End Date'
  }),
  serviceLoginUser: field({
    type: String,
    optional: true,
    label: 'Service Login User'
  }),
  servicePassword: field({
    type: String,
    optional: true,
    label: 'Service Password'
  }),
  parentalControlEnableStatus: field({
    type: String,
    optional: true,
    label: 'Parental Control Enable Status'
  }),
  penaltyServiceFee: field({
    type: Number,
    optional: true,
    label: 'Penalty Service Fee'
  })
});
