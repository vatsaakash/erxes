import { sendContactsMessage } from './messageBroker';

const customerInfo: any = async data => {
  const subdomain = 'os';

  const customer = await sendContactsMessage({
    subdomain,
    action: 'customers.findOne',
    data: {
      custCode: data.cust_code
    },
    isRPC: true
  });

  if (customer) {
    await sendContactsMessage({
      subdomain,
      action: 'customers.updateOne',
      data: {
        selector: {
          _id: data.cust_code
        },
        modifier: {
          $set: {
            custType: data.cust_type,
            custName: data.cust_name,
            firstName: data.first_name,
            lastName: data.last_name,
            birthDate: data.birth_date,
            mobile: data.mobile,
            phone: data.phone,
            email: data.email,
            custCode: data.cust_code,
            registerCode: data.register_code,
            directorName: data.director_name,
            directorLname: data.director_lname,
            directorRegister: data.director_register,
            contactEmpPhone: data.contact_emp_phone
          }
        }
      },
      isRPC: true,
      defaultValue: {}
    });
  } else {
    await sendContactsMessage({
      subdomain,
      action: 'customers.createCustomer',
      data: {
        custType: data.cust_type,
        custName: data.cust_name,
        firstName: data.first_name,
        lastName: data.last_name,
        birthDate: data.birth_date,
        mobile: data.mobile,
        phone: data.phone,
        email: data.email,
        custCode: data.cust_code,
        registerCode: data.register_code,
        directorName: data.director_name,
        directorLname: data.director_lname,
        directorRegister: data.director_register,
        contactEmpPhone: data.contact_emp_phone
      },
      isRPC: true
    });
  }
};
export default customerInfo;
