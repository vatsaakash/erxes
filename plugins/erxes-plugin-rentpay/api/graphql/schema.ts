export const types = `
  input FormSubmissionInput {
    _id: String!
    value: JSON
  }
`;

const commonQueryParams = `
  date: ItemDate
  pipelineId: String
  customerIds: [String]
  companyIds: [String]
  assignedUserIds: [String]
  productIds: [String]
  closeDateType: String
  labelIds: [String]
  search: String
  priority: [String]
  sortField: String
  sortDirection: Int
  userIds: [String]
  segment: String
  startDate: String
  endDate: String
  hasStartAndCloseDate: Boolean
  `;

const listQueryParams = `
    initialStageId: String
    stageId: String
    skip: Int
    limit: Int
    ${commonQueryParams}
 `;

export const queries = `
  dealDetailForCP(_id: String!): Deal
  dealsForCP(${listQueryParams}): [DealListItem]
`;

export const mutations = `
`;
