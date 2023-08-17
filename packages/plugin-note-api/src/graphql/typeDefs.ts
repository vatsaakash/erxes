import { gql } from 'apollo-server-express';

const types = `
  type Note {
    _id: String!
    name: String
    createdAt:Date
    expiryDate:Date
    checked:Boolean
    typeId: String
  
    currentType: NoteType
  }

  type NoteType {
    _id: String!
    name: String
  }
`;

const queries = `
  notes(typeId: String): [Note]
  noteTypes: [NoteType]
  notesTotalCount: Int
`;

const params = `
  name: String,
  expiryDate: Date,
  checked: Boolean,
  typeId:String
`;

const mutations = `
  notesAdd(${params}): Note
  notesRemove(_id: String!): JSON
  notesEdit(_id:String!, ${params}): Note
  noteTypesAdd(name:String):NoteType
  noteTypesRemove(_id: String!):JSON
  noteTypesEdit(_id: String!, name:String): NoteType
`;

const typeDefs = async _serviceDiscovery => {
  return gql`
    scalar JSON
    scalar Date

    ${types}
    
    extend type Query {
      ${queries}
    }
    
    extend type Mutation {
      ${mutations}
    }
  `;
};

export default typeDefs;
