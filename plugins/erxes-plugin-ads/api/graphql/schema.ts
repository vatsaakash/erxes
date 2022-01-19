export const types = `
  type Ad {
    customerId: String
    loyalty: Float
  }
`;

export const queries = `
  formSubmissionsByCustomer(customerId: String!, tagId: String!, filters: [SubmissionFilter], page: Int, perPage: Int): [Submission]
  formSubmissionDetail(contentTypeId: String!): Submission
`;

export const mutations = `
  formSubmissionsEdit(contentTypeId: String!, customerId: String!): Submission
`;
