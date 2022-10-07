import { gql } from 'apollo-server-express';

const types = `
  type IMap {
    _id: String!
    title: String
    mailData: JSON
  }
`;

const queries = `
  imapConversationDetail(conversationId: String!): [IMap]
`;

const mutations = `
  imapSave: String
`;

const typeDefs = gql`
  scalar JSON
  scalar Date

  ${types}

  extend type Query {
    ${queries}
  }

  extend type Mutation {
    ${mutations}
  }
`;

export default typeDefs;
