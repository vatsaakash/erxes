import { requireLogin } from '@erxes/api-utils/src/permissions';

import { Surveys } from '../../models';

const surveyQueries = {
  surveys(_root) {
    return Surveys.find();
  },
  surveysTotalCount(_root, _args) {
    return Surveys.find({}).countDocuments();
  }
};

requireLogin(surveyQueries, 'surveys');
requireLogin(surveyQueries, 'surveysTotalCount');

export default surveyQueries;
