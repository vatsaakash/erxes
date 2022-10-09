import {
  conformityQueryFieldDefs,
  conformityQueryFields
} from '@erxes/ui-cards/src/conformity';

export const packageFields = `
  _id
  name
  description
  wpId
  level
  projectWpId
  projectId
  price
  duration
  createdAt
  modifiedAt
`;

const listParamsDef = `
  $page: Int
  $perPage: Int
  $segment: String
  $categoryId: String
  $ids: [String]
  $searchValue: String
  $brand: String
  $sortField: String
  $sortDirection: Int
  ${conformityQueryFields}
`;

const listParamsValue = `
  page: $page
  perPage: $perPage
  segment: $segment
  categoryId: $categoryId
  ids: $ids
  searchValue: $searchValue
  brand: $brand
  sortField: $sortField
  sortDirection: $sortDirection
  ${conformityQueryFieldDefs}
`;

export const packages = `
  query packages(${listParamsDef}) {
    packages(${listParamsValue}) {
      ${packageFields}
    }
  }
`;

export const packageCounts = `
  query packageCounts(${listParamsDef}, $only: String) {
    packageCounts(${listParamsValue}, only: $only)
  }
`;

export const packageDetail = `
  query packageDetail($_id: String!) {
    packageDetail(_id: $_id) {
      ${packageFields}
    }
  }
`;

export default {
  packages,
  packageCounts,
  packageDetail
};
