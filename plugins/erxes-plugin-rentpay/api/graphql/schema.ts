export const types = `
  input FormSubmissionInput {
    _id: String!
    value: JSON
  }
`;

const listQueryParams = `
    priceRange: String
    district: String
    customFields: JSON
    limit: Int
 `;

export const queries = `
  dealsForRentpay(${listQueryParams}): [Deal]
  fieldsForRentpay(contentType: String, searchable: Boolean, customFields: JSON): [Field]
`;

export const mutations = `
`;
