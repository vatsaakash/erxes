import { requireLogin } from '@erxes/api-utils/src/permissions';
import { Surveys, ISurvey } from '../../models';

const surveyMutations = {
  /**
   * Creates a new survey
   */
  async surveysAdd(_root, doc: ISurvey) {
    const survey = await Surveys.createSurvey(doc);

    return survey;
  }
};

requireLogin(surveyMutations, 'surveysAdd');

export default surveyMutations;
