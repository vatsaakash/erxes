const commonParamDefs = `$name: String!`;
const commonParams = `name: $name`;

const add = `
  mutation templatesAdd(${commonParamDefs}) {
    templatesAdd(${commonParams}) {
      _id
    }
  }
`;

export default {
  add
};
