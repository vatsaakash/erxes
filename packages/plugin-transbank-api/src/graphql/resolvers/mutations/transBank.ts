const transBankMutations = {
  customerUpdate: async (
    _root,
    {
      custType,
      custName,
      firstName,
      lastName,
      birthDate,
      mobile,
      phone,
      email,
      custCode,
      registerCode,
      directorName,
      directorLastName,
      directorRegister,
      contactEmpPhone
    },
    { models }
  ) => {
    const customer = await models.Customer.findOne({ registerCode });

    if (customer) {
      return await models.Customer.updateCustomer({
        custType,
        custName,
        firstName,
        lastName,
        birthDate,
        mobile,
        phone,
        email,
        custCode,
        registerCode,
        directorName,
        directorLastName,
        directorRegister,
        contactEmpPhone
      });
    } else {
      return await models.Customer.createCustomer({
        custType,
        custName,
        firstName,
        lastName,
        birthDate,
        mobile,
        phone,
        email,
        custCode,
        registerCode,
        directorName,
        directorLastName,
        directorRegister,
        contactEmpPhone
      });
    }
  }
};

export default transBankMutations;
