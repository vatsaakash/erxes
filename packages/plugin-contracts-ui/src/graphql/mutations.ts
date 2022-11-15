import { contractFields } from './queries';

const commonFields = `
  $name: String
  $contractId: String
  $categoryId: String
  $status: String
  $servicePackageId: Float
  $userId: String
  $selectedMemberIds: String
  $apartmentId: String
  $deviceId: String
  $entranceNum: Float
  $doorNum: Float
  $orderCreatedDate: Date
  $installFinishedDate: Date
  $contractStartedDate: Date
  $contractCancelledDate: Date
  $contractEndDate: Date
  $serviceLoginUser: String
  $servicePassword: String
  $parentalControlEnableStatus: String
  $penaltyServiceFee: Float
`;

const commonVariables = `
  name: $name
  contractId: $contractId
  categoryId: $categoryId
  status: $status
  servicePackageId: $servicePackageId
  userId: $userId
  selectedMemberIds: $selectedMemberIds
  apartmentId: $apartmentId
  deviceId: $deviceId
  entranceNum: $entranceNum
  doorNum: $doorNum
  orderCreatedDate: $orderCreatedDate
  installFinishedDate: $installFinishedDate
  contractStartedDate: $contractStartedDate
  contractCancelledDate: $contractCancelledDate
  contractEndDate: $contractEndDate
  serviceLoginUser: $serviceLoginUser
  servicePassword: $servicePassword
  parentalControlEnableStatus: $parentalControlEnableStatus
  penaltyServiceFee: $penaltyServiceFee
`;

const contractsAdd = `
  mutation contractsAdd(${commonFields}) {
    contractsAdd(${commonVariables}) {
      ${contractFields}
    }
  }
`;

const contractsEdit = `
  mutation contractsEdit($_id: String!, ${commonFields}) {
    contractsEdit(_id: $_id, ${commonVariables}) {
      ${contractFields}
    }
  }
`;

const contractsRemove = `
  mutation contractsRemove($contractIds: [String]) {
    contractsRemove(contractIds: $contractIds)
  }
`;

const contractCategoryParamsDef = `
  $name: String!,
  $code: String!,
  $parentId: String,
  $description: String
`;

const contractCategoryParams = `
  name: $name,
  code: $code,
  parentId: $parentId,
  description: $description
`;

const contractCategoryAdd = `
  mutation contractCategoriesAdd(${contractCategoryParamsDef}) {
    contractCategoriesAdd(${contractCategoryParams}) {
      _id
    }
  }
`;

const contractCategoryEdit = `
  mutation contractCategoriesEdit($_id: String!, ${contractCategoryParamsDef}) {
    contractCategoriesEdit(_id: $_id, ${contractCategoryParams}) {
      _id
    }
  }
`;

const contractCategoryRemove = `
  mutation contractCategoriesRemove($_id: String!) {
    contractCategoriesRemove(_id: $_id)
  }
`;

const commonTemplateParamsDef = `
  $name: String!,
  $categoryId: String,
  $html: String,
  $css: String
`;

const commonTemplateParams = `
  name: $name,
  categoryId: $categoryId,
  html: $html,
  css: $css
`;

const contractTemplateAdd = `
  mutation contractTemplatesAdd(${commonTemplateParamsDef}) {
    contractTemplatesAdd(${commonTemplateParams}) {
      _id
    }
  }
`;

const contractTemplateEdit = `
  mutation contractTemplatesEdit($_id: String!, ${commonTemplateParamsDef}) {
    contractTemplatesEdit(_id: $_id, ${commonTemplateParams}) {
      _id
    }
  }
`;

const contractTemplateRemove = `
  mutation contractTemplatesRemove($_id: String!) {
    contractTemplatesRemove(_id: $_id)
  }
`;

const contractTemplateDuplicate = `
  mutation contractTemplatesDuplicate($_id: String!) {
    contractTemplatesDuplicate(_id: $_id) {
      _id
    }
  }
`;

export default {
  contractsAdd,
  contractsEdit,
  contractsRemove,
  contractCategoryAdd,
  contractCategoryEdit,
  contractCategoryRemove,
  contractTemplateAdd,
  contractTemplateEdit,
  contractTemplateRemove,
  contractTemplateDuplicate
};
