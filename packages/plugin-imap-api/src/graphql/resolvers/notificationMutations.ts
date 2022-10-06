import { moduleRequireLogin } from '@erxes/api-utils/src/permissions';
import { IContext } from '../../connectionResolver';

const notificationMutations = {
  imapSave(_root, doc, { models }: IContext) {
    return models.Integrations.create(doc);
  }
};

moduleRequireLogin(notificationMutations);

export default notificationMutations;
