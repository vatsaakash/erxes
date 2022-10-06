import { moduleRequireLogin } from '@erxes/api-utils/src/permissions';
import { IContext } from '../../connectionResolver';

const notificationMutations = {
  imapSave(_root, doc, { user, models }: IContext) {
    return models.Notifications.create(doc);
  }
};

moduleRequireLogin(notificationMutations);

export default notificationMutations;
