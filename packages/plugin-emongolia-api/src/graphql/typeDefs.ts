import { gql } from 'apollo-server-express';

import {
  types as danTypes,
  queries as danQueries,
  mutations as danMutations
} from './schema/emongolia';

const typeDefs = async () => {
  return gql`
    scalar JSON
    scalar Date
    
    ${await danTypes()}
    
    extend type Query {
      ${exmQueries}
    }
    
    extend type Mutation {
      ${exmMutations}
    }
  `;
};

export default typeDefs;
