export const types = `
  input FormSubmissionInput {
    _id: String!
    value: JSON
  }
`;

const listQueryParams = `
    priceRange: String
 `;

export const queries = `
  dealsForRentpay(${listQueryParams}): [Deal]
`;

export const mutations = `
`;
