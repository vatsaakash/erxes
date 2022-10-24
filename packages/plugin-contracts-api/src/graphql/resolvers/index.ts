import customScalars from '@erxes/api-utils/src/customScalars';
import { ContractCategory } from './contracts';
import ContractTemplate from './contractTemplates';

import Mutation from './mutations';
import Query from './queries';

const resolvers: any = async serviceDiscovery => ({
  ...customScalars,
  Mutation,
  Query,

  ContractCategory,
  ContractTemplate
});

export default resolvers;
