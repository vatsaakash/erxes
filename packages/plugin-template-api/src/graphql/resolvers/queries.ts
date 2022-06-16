import { requireLogin } from '@erxes/api-utils/src/permissions';

import { Templates } from '../../models';

const templateQueries = {
  templates(_root) {
    return Templates.find();
  },
  templatesTotalCount(_root, _args) {
    return Templates.find({}).countDocuments();
  }
};

requireLogin(templateQueries, 'templates');
requireLogin(templateQueries, 'templatesTotalCount');

export default templateQueries;
