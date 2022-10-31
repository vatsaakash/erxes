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
  createdAt
  modifiedAt
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

export const contractDetails = `
  query contractDetails($_id: String!) {
    contractDetails(_id: $_id) {
      ${contractFields}
    }
  }
`;

const contractTemplates = `
  query contractTemplates(${listParamsDef}) {
    contractTemplates(${listParamsValue}) {
      _id
      name
      content
      createdAt
      modifiedAt
      createdUser {
        _id
        username
        details {
          fullName
          avatar
        }
      }
    }
  }
`;

const contractTemplateDetails = `
  query contractTemplateDetails($_id: String!) {
    contractTemplateDetails(_id: $_id) {
      _id
      name
      content
      createdAt
      modifiedAt
      createdUser {
        _id
        username
        details {
          fullName
          avatar
        }
      }
    }
  }
`;

const contractTemplateTotalCounts = `
  query contractTemplateTotalCounts(${listParamsDef}) {
    contractTemplateTotalCounts(${listParamsValue})
  }
`;

export default {
  contracts,
  contractCounts,
  contractDetails,
  contractCategories,
  contractCategoriesTotalCount,
  contractCategoryDetail,
  contractTemplates,
  contractTemplateDetails,
  contractTemplateTotalCounts
};
