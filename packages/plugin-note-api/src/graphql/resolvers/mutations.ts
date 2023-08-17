import { Notes, Types } from '../../models';
import { IContext } from '@erxes/api-utils/src/types';

const noteMutations = {
  /**
   * Creates a new note
   */
  async notesAdd(_root, doc, _context: IContext) {
    return Notes.createNote(doc);
  },
  /**
   * Edits a new note
   */
  async notesEdit(_root, { _id, ...doc }, _context: IContext) {
    return Notes.updateNote(_id, doc);
  },
  /**
   * Removes a single note
   */
  async notesRemove(_root, { _id }, _context: IContext) {
    return Notes.removeNote(_id);
  },

  /**
   * Creates a new type for note
   */
  async noteTypesAdd(_root, doc, _context: IContext) {
    return Types.createType(doc);
  },

  async noteTypesRemove(_root, { _id }, _context: IContext) {
    return Types.removeType(_id);
  },

  async noteTypesEdit(_root, { _id, ...doc }, _context: IContext) {
    return Types.updateType(_id, doc);
  }
};

export default noteMutations;
