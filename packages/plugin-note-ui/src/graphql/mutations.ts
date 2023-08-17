const add = `
  mutation notesAdd($name: String!, $expiryDate: Date, $typeId:String) {
    notesAdd(name:$name, expiryDate: $expiryDate, typeId:$typeId) {
      name
      _id
      expiryDate
      typeId
    }
  }
`;

const remove = `
  mutation notesRemove($_id: String!){
    notesRemove(_id: $_id)
  }
  `;

const edit = `
  mutation notesEdit($_id: String!, $name:String, $expiryDate:Date, $checked:Boolean, $typeId:String){
    notesEdit(_id: $_id, name: $name, expiryDate:$expiryDate, checked:$checked, typeId:$typeId){
      _id
    }
  }
  `;

const addType = `
  mutation typesAdd($name: String!){
    noteTypesAdd(name:$name){
      name
      _id
    }
  }
  `;

const removeType = `
  mutation typesRemove($_id:String!){
    noteTypesRemove(_id:$_id)
  }
`;

const editType = `
  mutation typesEdit($_id: String!, $name:String){
    noteTypesEdit(_id: $_id, name: $name){
      _id
    }
  }
`;

export default {
  add,
  remove,
  edit,
  addType,
  removeType,
  editType
};
