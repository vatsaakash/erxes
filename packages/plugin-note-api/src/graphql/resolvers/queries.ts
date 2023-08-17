import { Notes, Types } from '../../models';
import { IContext } from '@erxes/api-utils/src/types';

const noteQueries = {
  notes(_root, { typeId }, _context: IContext) {
    const selector: any = {};

    if (typeId) {
      selector.typeId = typeId;
    }

    return Notes.find(selector).sort({ order: 1, name: 1 });
  },

  noteTypes(_root, _args, _context: IContext) {
    return Types.find({});
  },

  notesTotalCount(_root, _args, _context: IContext) {
    return Notes.find({}).countDocuments();
  }
};

export default noteQueries;
