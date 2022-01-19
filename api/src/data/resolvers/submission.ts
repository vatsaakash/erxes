import { Customers } from '../../db/models';

export default {
  customer(formSubmission: any) {
    return Customers.getCustomer(formSubmission.customerId);
  }
};
