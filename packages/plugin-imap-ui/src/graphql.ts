export const queries = {
  detail: `
        query imapConversationDetail($conversationId: String!) {
            imapConversationDetail(conversationId: $conversationId) {
                _id
                mailData
            }
        }
    `
};

export const mutations = {};
