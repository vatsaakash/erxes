import { gql } from 'apollo-server-express';

import { mutations as transBankMutations } from './schema/transBank';

const typeDefs = async () => {
  return gql`
    scalar JSON
    scalar Date
    
    
    extend type Mutation {
      ${transBankMutations}
    }
  `;
};

export default typeDefs;
