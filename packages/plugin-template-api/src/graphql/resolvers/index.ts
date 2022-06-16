import customScalars from '@erxes/api-utils/src/customScalars';

import mutations from './mutations';
import queries from './queries';
import Template from './templates';

const resolvers: any = async serviceDiscovery => ({
  ...customScalars,
  Template,
  Mutation: {
    ...mutations
  },
  Query: {
    ...queries
  }
});

export default resolvers;
