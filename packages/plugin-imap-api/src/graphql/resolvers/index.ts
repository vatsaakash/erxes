import customScalars from '@erxes/api-utils/src/customScalars';
import mutations from './notificationMutations';
import queries from './queries';

const resolvers: any = {
  ...customScalars,
  Mutation: {
    ...mutations
  },
  Query: {
    ...queries
  }
};

export default resolvers;
