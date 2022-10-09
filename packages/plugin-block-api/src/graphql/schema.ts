/**
 * This is for defining GraphQL schema
 */

export const types = `
  type Block {
    _id: String!
    name: String
  }
`;
export const queries = `
  blocks(typeId: String): [Block]
`;

const params = `
  name: String,
`;

export const mutations = `
  blocksAdd(${params}): Block
`;
