import { queries as customerQueries } from '@erxes/ui/src/customers/graphql';

const getLoginUrl = `
  query login($limit: Int) {
    getLoginUrl(limit: $limit) {
     
      responseType,
      clientId,
      redirectUri,
      scope,
      state,

    }
  }
`;

// Settings

const configs = `
  query configs {
    configs {
      _id
      code
      value  
    }
  }
`;

const customerDetail = `
  query customerDetail($_id: String!) {
    customerDetail(_id: $_id) {
      ${customerQueries.customerFields}
    }
  }
`;

export default {
  getLoginUrl,
  customerDetail,
  configs
};
