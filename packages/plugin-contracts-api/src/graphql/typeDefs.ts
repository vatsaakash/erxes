import { gql } from 'apollo-server-express';

import {
  types as contractTypes,
  queries as contractQueries,
  mutations as contractMutations
} from './schema/contracts';

import {
  types as contractTemplateTypes,
  queries as contractTemplateQueries,
  mutations as contractTemplateMutations
} from './schema/contractTemplate';

const typeDefs = async _serviceDiscovery => {
  return gql`
    scalar JSON
    scalar Date

    enum CacheControlScope {
      PUBLIC
      PRIVATE
    }

    directive @cacheControl(
      maxAge: Int
      scope: CacheControlScope
      inheritMaxAge: Boolean
    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
    
    ${contractTypes}
    ${contractTemplateTypes}
    
    extend type Query {
      ${contractQueries}
      ${contractTemplateQueries}
    }
    
    extend type Mutation {
      ${contractMutations}
      ${contractTemplateMutations}
    }
  `;
};

export default typeDefs;
