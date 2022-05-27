export const types = () => {
  return `
    extend type User @key(fields: "_id") {
      _id: String! @external
    }

    type LoginUrl {
      responseType: String
      redirectUri: String
      scope: String
      clientId: String
    }
    `;
};

export const queries = `
  getLoginUrl(serviceName: String, value: String): LoginUrl
`;
