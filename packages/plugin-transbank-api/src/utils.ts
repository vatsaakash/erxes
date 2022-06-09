import { sendContactsMessage } from './messageBroker';

const accountInfo: any = async data => {
  const subdomain = 'os';

  const customer = await sendContactsMessage({
    subdomain,
    action: 'customers.findOne',
    data: {
      custCode: data
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
            birthDate: data.birth_date
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
        firstName: data.firstName,
        lastName: data.lastName,
        primaryEmail: data.email,
        primaryPhone: data.phone,
        state: 'customer'
      },
      isRPC: true
    });
  }
};
export default accountInfo;
