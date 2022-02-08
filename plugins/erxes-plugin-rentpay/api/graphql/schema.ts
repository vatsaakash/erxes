export const types = `
  input FormSubmissionInput {
    _id: String!
    value: JSON
  }
`;

const listQueryParams = `
    priceRange: String
    district: String
    limit: Int
 `;

export const queries = `
  dealsForRentpay(${listQueryParams}): [Deal]
  fieldsForRentpay(contentType: String, searchable: Boolean): [Field]
`;

export const mutations = `
`;
