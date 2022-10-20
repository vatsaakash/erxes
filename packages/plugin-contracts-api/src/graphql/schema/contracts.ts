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
    contractId: String
    categoryId: String
    status: String
    servicePackageId: Float
    userId: String
    selectedMemberIds: String
    apartmentId: String
    deviceId: String
    entranceNum: Float
    doorNum: Float
    orderCreatedDate: Date
    installFinishedDate: Date
    contractStartedDate: Date
    contractCancelledDate: Date
    contractEndDate: Date
    serviceLoginUser: String
    servicePassword: String
    parentalControlEnableStatus: String
    penaltyServiceFee: Float
    createdAt: Date
    modifiedAt: Date
  }
`;

const contractListParams = `
  page: Int
  perPage: Int
  categoryId: String
  searchValue: String
`;

export const queries = `
  contracts(${contractListParams}): [Contract]
  contractCounts(${contractListParams}, only: String): JSON
  contractDetails(_id: String!): Contract
  
  contractCategories(parentId: String): [ContractCategory]
  contractCategoriesTotalCount: Int
  contractCategoryDetail(_id: String): ContractCategory
`;

const contractCategoryParams = `
  name: String!
  code: String!
  description: String
  parentId: String
`;

const contractParams = `
  name: String
  contractId: String
  categoryId: String
  status: String
  servicePackageId: Float
  userId: String
  selectedMemberIds: String
  apartmentId: String
  deviceId: String
  entranceNum: Float
  doorNum: Float
  orderCreatedDate: Date
  installFinishedDate: Date
  contractStartedDate: Date
  contractCancelledDate: Date
  contractEndDate: Date
  serviceLoginUser: String
  servicePassword: String
  parentalControlEnableStatus: String
  penaltyServiceFee: Float
`;

export const mutations = `
  contractsAdd(${contractParams}): Contract
  contractsEdit(_id: String!, ${contractParams}): Contract
  contractsRemove(contractIds: [String]): [String]

  contractCategoriesAdd(${contractCategoryParams}): ContractCategory
  contractCategoriesEdit(_id: String!, ${contractCategoryParams}): ContractCategory
  contractCategoriesRemove(_id: String!): JSON  
`;
