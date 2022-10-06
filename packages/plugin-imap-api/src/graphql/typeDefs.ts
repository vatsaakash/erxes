import { gql } from 'apollo-server-express';

const types = `
  type IMap {
    _id: String!
    title: String
  }
`;

const queries = `
  imap: [IMap]
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
