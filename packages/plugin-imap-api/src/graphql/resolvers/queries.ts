import { moduleRequireLogin } from '@erxes/api-utils/src/permissions';
import { IContext } from '../../connectionResolver';

const queries = {
  async imapConversationDetail(
    _root,
    { conversationId },
    { models }: IContext
  ) {
    const messages = await models.ConversationMessages.find({ conversationId });

    return messages.map(message => {
      return {
        _id: message._id,
        mailData: {
          to: ['test@yahoo.com'],
          cc: [''],
          bcc: [''],
          body: message.body
        }
      };
    });
  }
};

moduleRequireLogin(queries);

export default queries;
