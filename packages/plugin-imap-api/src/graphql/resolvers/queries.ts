import { moduleRequireLogin } from '@erxes/api-utils/src/permissions';

const queries = {
  imapConversationDetail() {
    return [
      {
        _id: 1,
        mailData: { to: ['test@yahoo.com'], cc: [''], bcc: [''], body: 'body' }
      }
    ];
  }
};

moduleRequireLogin(queries);

export default queries;
