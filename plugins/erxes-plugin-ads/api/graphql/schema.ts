export const types = `
  type Ad {
    customerId: String
    loyalty: Float
  }
`;

export const queries = `
  formSubmissionDetail(contentTypeId: String!): Submission
`;
