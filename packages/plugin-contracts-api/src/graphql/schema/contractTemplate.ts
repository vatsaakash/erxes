export const types = `
  extend type User @key(fields: "_id") {
    _id: String! @external
  }

  type ContractTemplate @key(fields: "_id") @cacheControl(maxAge: 3) {
    _id: String!
    name: String!
    content: String
    createdBy: String
    createdAt: Date
    modifiedAt: Date
    createdUser: User
  }
`;

const contractTemplateListParams = `
  page: Int
  perPage: Int
  categoryId: String
  searchValue: String
`;

export const queries = `
  contractTemplates(${contractTemplateListParams}): [ContractTemplate]
  contractTemplateCounts(${contractTemplateListParams}, only: String): Int
`;

const contractTemplateParams = `
  name: String!
  categoryId: String
  content: String
`;

export const mutations = `
  contractTemplatesAdd(${contractTemplateParams}): ContractTemplate
  contractTemplatesEdit(_id: String!, ${contractTemplateParams}): ContractTemplate
  contractTemplatesRemove(_id: String!): JSON
  contractTemplatesDuplicate(_id: String!): ContractTemplate
`;
