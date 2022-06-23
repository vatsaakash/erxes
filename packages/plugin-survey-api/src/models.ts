import * as Random from 'meteor-random';
import { Model, model } from 'mongoose';
import * as _ from 'underscore';
import { Document, Schema } from 'mongoose';

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

export interface ISurvey {
  name: string;
}

export interface ISurveyDocument extends ISurvey, Document {
  _id: string;
  createdAt: Date;
  order?: string;
  relatedIds?: string[];
}

export const surveySchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String, label: 'Name' })
});

export interface ISurveyModel extends Model<ISurveyDocument> {
  createSurvey(doc: ISurvey): Promise<ISurveyDocument>;
}

class Survey {
  public static async createSurvey(doc) {
    const survey = await Surveys.create(doc);
    return survey;
  }
}

surveySchema.loadClass(Survey);

const Surveys = model<ISurveyDocument, ISurveyModel>('surveys', surveySchema);

export { Surveys };
