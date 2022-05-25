import { Schema, Document } from 'mongoose';
import { field, schemaHooksWrapper } from './utils';

export interface IEmongolia {
  title: string;
  responseType: string;
  redirectUri: string;
  scope: string;
}
export interface IEmongoliaDocument extends IEmongolia, Document {
  _id: string;
}

export const danSchema = schemaHooksWrapper(
  new Schema({
    _id: field({ pkey: true }),
    title: field({ type: String }),
    responseType: field({ type: String }),
    redirectUri: field({ type: String }),
    scope: field({ type: String })
  }),
  'erxes_danSchema'
);
