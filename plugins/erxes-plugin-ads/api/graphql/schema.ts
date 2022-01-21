export const types = `
  type Ad {
    customerId: String
    loyalty: Float
  }

  input FormSubmissionInput {
    _id: String!
    value: JSON
  }
`;

export const queries = `
  formSubmissionsByCustomer(customerId: String!, tagId: String!, filters: [SubmissionFilter], page: Int, perPage: Int): [Submission]
  formSubmissionDetail(contentTypeId: String!): Submission
`;

export const mutations = `
  formSubmissionsRemove(customerId: String!, contentTypeId: String!): JSON
  formSubmissionsEdit(contentTypeId: String!, customerId: String!, submissions: [FormSubmissionInput]): Submission
`;
