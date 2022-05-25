export const types = () => {
  return `
    extend type User @key(fields: "_id") {
      _id: String! @external
    }
    type DanScope {
      _id: String
      title: String
      responseType: String
      redirectUri: String
      scope: String
    }
    `;
};
