import { moduleRequireLogin } from '@erxes/api-utils/src/permissions';

const queries = {
  imapConversationDetail() {
    return [];
  }
};

moduleRequireLogin(queries);

export default queries;
