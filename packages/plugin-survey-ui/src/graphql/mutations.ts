const commonParamDefs = `$name: String!`;
const commonParams = `name: $name`;

const add = `
  mutation surveysAdd(${commonParamDefs}) {
    surveysAdd(${commonParams}) {
      _id
    }
  }
`;

export default {
  add
};
