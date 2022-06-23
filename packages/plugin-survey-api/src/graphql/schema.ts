export const types = `
  type Survey {
    _id: String!
    name: String
  }
`;

export const queries = `
  surveys: [Survey]
  surveysTotalCount: Int
`;

const params = `
  name: String!,
`;

export const mutations = `
  surveysAdd(${params}): Survey
`;
