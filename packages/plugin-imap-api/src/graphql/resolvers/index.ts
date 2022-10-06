import customScalars from '@erxes/api-utils/src/customScalars';
import NotificationMutations from './notificationMutations';
import NotificationQueries from './notificationQueries';

const resolvers: any = {
  ...customScalars,
  Mutation: {
    ...NotificationMutations
  },
  Query: {
    ...NotificationQueries
  }
};

export default resolvers;
