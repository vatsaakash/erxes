import { Fields } from '../../db/models';

export default {
  async formFieldText(submission: any) {
    const field = await Fields.findOne(
      { _id: submission.formFieldId },
      { text: 1 }
    );

    return field ? field.text : '';
  }
};
