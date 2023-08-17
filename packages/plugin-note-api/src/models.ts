import * as _ from 'underscore';
import { model } from 'mongoose';
import { Schema } from 'mongoose';

export const typeSchema = new Schema({
  name: String
});

export const noteSchema = new Schema({
  name: String,
  createdAt: Date,
  expiryDate: Date,
  checked: Boolean,
  typeId: String
});

export const loadTypeClass = () => {
  class Type {
    public static async getType(_id: string) {
      const type = await Types.findOne({ _id });

      if (!type) {
        throw new Error('Type not found');
      }

      return type;
    }
    // create type
    public static async createType(doc) {
      return Types.create({ ...doc });
    }
    // remove type
    public static async removeType(_id: string) {
      return Types.deleteOne({ _id });
    }

    public static async updateType(_id: string, doc) {
      return Types.updateOne({ _id }, { $set: { ...doc } });
    }
  }

  typeSchema.loadClass(Type);
  return typeSchema;
};

export const loadNoteClass = () => {
  class Note {
    public static async getNote(_id: string) {
      const note = await Notes.findOne({ _id });

      if (!note) {
        throw new Error('Note not found');
      }

      return note;
    }

    // create
    public static async createNote(doc) {
      return Notes.create({
        ...doc,
        createdAt: new Date()
      });
    }
    // update
    public static async updateNote(_id: string, doc) {
      await Notes.updateOne({ _id }, { $set: { ...doc } }).then(err =>
        console.error(err)
      );
    }
    // remove
    public static async removeNote(_id: string) {
      return Notes.deleteOne({ _id });
    }
  }

  noteSchema.loadClass(Note);

  return noteSchema;
};

loadNoteClass();
loadTypeClass();

// tslint:disable-next-line
export const Types = model<any, any>('note_types', typeSchema);

// tslint:disable-next-line
export const Notes = model<any, any>('notes', noteSchema);
