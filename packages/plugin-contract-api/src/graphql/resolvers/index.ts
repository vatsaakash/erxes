import customScalars from '@erxes/api-utils/src/customScalars';
import { ContractCategory } from './contracts';

import Mutation from './mutations';
import Query from './queries';

const resolvers: any = async serviceDiscovery => ({
  ...customScalars,
  Mutation,
  Query,

  ContractCategory
});

export default resolvers;
