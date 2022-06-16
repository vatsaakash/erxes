export const types = `
  type Template {
    _id: String!
    name: String
  }
`;

export const queries = `
  templates: [Template]
  templatesTotalCount: Int
`;

const params = `
  name: String!,
`;

export const mutations = `
  templatesAdd(${params}): Template
`;
