export const types = `
  type ContractCategory {
  _id: String!
  name: String
  description: String
  parentId: String
  code: String!
  order: String!

  isRoot: Boolean
  contractCount: Int
}

  type Contract {
    _id: String!
    name: String
  }
`;
export const queries = `
  contracts(typeId: String): [Contract]
`;

const contractCategoryParams = `
  name: String!,
  code: String!,
  description: String,
  parentId: String,
`;

const contractParams = `
  name: String,
`;

export const mutations = `
  contractCategoriesAdd(${contractCategoryParams}): ContractCategory
  contractCategoriesEdit(_id: String!, ${contractCategoryParams}): ContractCategory
  contractCategoriesRemove(_id: String!): JSON
  contractsAdd(${contractParams}): Contract
`;
