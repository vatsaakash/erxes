import { gql } from 'apollo-server-express';

import {
  types as packegeTypes,
  queries as packageQueries,
  mutations as packageMutations
} from './schema/packages';

import {
  queries as blockQueries,
  types as blockTypes,
  mutations as blockMutations
} from './schema/block';

const typeDefs = async _serviceDiscovery => {
  return gql`
    scalar JSON
    scalar Date

    ${packegeTypes}
    ${blockTypes}
    
    extend type Query {
      ${packageQueries}
      ${blockQueries}
    }
    
    extend type Mutation {
      ${packageMutations}
      ${blockMutations}
    }
  `;
};

export default typeDefs;
