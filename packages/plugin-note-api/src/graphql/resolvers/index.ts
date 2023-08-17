import customScalars from '@erxes/api-utils/src/customScalars';

import mutations from './mutations';
import queries from './queries';
import { Types } from '../../models';

const Note = {
  currentType(note, _args) {
    return Types.findOne({ _id: note.typeId });
  }
};

const resolvers: any = async _serviceDiscovery => ({
  ...customScalars,
  Note,
  Mutation: {
    ...mutations
  },
  Query: {
    ...queries
  }
});

export default resolvers;
