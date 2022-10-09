export const types = `
  type Investment {
    _id: String!
    erxesCustomerId: String
    packageId: String
    
    package: Package
  }
`;

export const queries = `
  getBalance(erxesCustomerId: String): Float
  investments(erxesCustomerId: String): [Investment]
`;

export const mutations = `
  invest(erxesCustomerId: String, packageId: String ): Investment
`;
