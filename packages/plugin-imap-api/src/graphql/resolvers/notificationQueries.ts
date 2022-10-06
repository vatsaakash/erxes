import { moduleRequireLogin } from '@erxes/api-utils/src/permissions';

const notificationQueries = {
  imap() {
    return [];
  }
};

moduleRequireLogin(notificationQueries);

export default notificationQueries;
