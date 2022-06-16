export const types = `
  type Template {
    _id: String!
    name: String
    contentType: String
    content: JSON

    jishee: String
  }
`;

export const queries = `
  templates(contentType: String): [Template]
  templatesTotalCount: Int
`;

const params = `
  name: String!,
  contenType: String!,
  content: JSON!,
`;

export const mutations = `
  templatesAdd(${params}): Template
`;
