const list = `
  query listQuery($typeId: String) {
    notes(typeId: $typeId) {
      _id
      name
      expiryDate
      createdAt
      checked
      typeId
      currentType{
        _id
        name
      }
    }
  }
`;

const listNoteTypes = `
  query listNoteTypeQuery{
    noteTypes{
      _id
      name
    }
  }
`;

const totalCount = `
  query notesTotalCount{
    notesTotalCount
  }
`;

export default {
  list,
  totalCount,
  listNoteTypes
};
