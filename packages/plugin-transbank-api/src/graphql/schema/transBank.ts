const transBankParams = `
   custType: String
   custName: String
   firstName: String
   lastName: String
   birthDate: Date
   mobile: Number
   phone: Number
   email: String 
   custCode: Number 
   registerCode: String 
   directorName: String 
   directorLastName: String 
   directorRegister: String 
   contactEmpPhone: Number 
`;

export const mutations = `
  customerUpdate(${transBankParams}): TransBankCustomer
 
`;
