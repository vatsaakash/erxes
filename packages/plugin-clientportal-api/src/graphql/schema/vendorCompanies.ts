export const types = (isContactsEnabled: boolean) => `
${
  isContactsEnabled
    ? `
        extend type Customer @key(fields: "_id") {
          _id: String! @external
        }
  
        extend type Company @key(fields: "_id") {
          _id: String! @external
        }
        `
    : ''
}

  type VendorCompany @key(fields: "_id") {
    _id: String!
    companyId: String!
    company: Company
    vendorPortalId: String!

    userIds: [String]
    users: [ClientPortalUser]
  }

    input VendorCompanyInput {
        companyId: String!
        vendorPortalId: String!
    }
`;

export const queries = () => `
    vendorCompanies: [VendorCompany]
    vendorCompanyDetail(_id: String!): VendorCompany
`;

export const mutations = () => `
    vendorCompanyAdd(vendorCompany: VendorCompanyInput): VendorCompany
    vendorCompanyEdit(_id: String!, vendorCompany: VendorCompanyInput): VendorCompany
    vendorCompanyRemove(_id: String!): JSON
`;
