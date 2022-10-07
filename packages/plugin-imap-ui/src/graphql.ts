export const queries = {
  detail: `
        query imapConversationDetail($conversationId: String!) {
            imapConversationDetail(conversationId: $conversationId) {
                _id
            }
        }
    `
};

export const mutations = {};
