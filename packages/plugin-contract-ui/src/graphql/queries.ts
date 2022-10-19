const contractCategoryFields = `
  _id
  name
  order
  code
  parentId
  description

  isRoot
`;

export const contractFields = `
  _id
  
  name
  contractId
  categoryId
  status
  servicePackageId
  userId
  selectedMemberIds
  apartmentId
  deviceId
  entranceNum
  doorNum
  orderCreatedDate
  installFinishedDate
  contractStartedDate
  contractCancelledDate
  contractEndDate
  serviceLoginUser
  servicePassword
  parentalControlEnableStatus
  penaltyServiceFee
`;

const listParamsDef = `
  $page: Int
  $perPage: Int
  $categoryId: String
  $searchValue: String
`;

const listParamsValue = `
  page: $page
  perPage: $perPage
  categoryId: $categoryId
  searchValue: $searchValue
`;

export const contracts = `
  query contracts(${listParamsDef}) {
    contracts(${listParamsValue}) {
      ${contractFields}
    }
  }
`;

export const contractCounts = `
  query contractCounts(${listParamsDef}, $only: String) {
    contractCounts(${listParamsValue}, only: $only)
  }
`;

const contractCategories = `
  query contractCategories {
    contractCategories {
      ${contractCategoryFields}
      contractCount
    }
  }
`;

const contractCategoriesTotalCount = `
  query contractCategoriesTotalCount {
    contractCategoriesTotalCount
  }
`;

const contractCategoryDetail = `
  query contractCategoryDetail($_id: String) {
    contractCategoryDetail(_id: $_id) {
      ${contractCategoryFields}
      contractCount
    }
  }
`;

export const contractDetail = `
  query contractDetail($_id: String!) {
    contractDetail(_id: $_id) {
      ${contractFields}
    }
  }
`;

export default {
  contracts,
  contractCounts,
  contractDetail,
  contractCategories,
  contractCategoriesTotalCount,
  contractCategoryDetail
};
