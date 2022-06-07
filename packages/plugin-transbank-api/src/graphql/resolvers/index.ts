import Mutation from './mutations';
import customScalars from '@erxes/api-utils/src/customScalars';

const resolvers: any = async () => ({
  ...customScalars,

  Mutation
});

export default resolvers;
