import { gql } from 'apollo-server-express';

import {
  types as contractTypes,
  queries as contractQueries,
  mutations as contractMutations
} from './schema/contract';

const typeDefs = async _serviceDiscovery => {
  return gql`
    scalar JSON
    scalar Date

    ${contractTypes}
    
    extend type Query {
      ${contractQueries}
    }
    
    extend type Mutation {
      ${contractMutations}
    }
  `;
};

export default typeDefs;
