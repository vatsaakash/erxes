var base64 = require('base-64');
const redirectUrl = 'https://www.rentpay.mn/emongolia/receive';
const clientId = '8bd4872e35ee93e32c33097c-af7c6f5ec773c96a37e2b4ce4f7a4049';

const danLoginQueries = {
  getLoginUrl: (_root, { serviceName, value }) => {
    const name = serviceName;
    const service_structure = [
      {
        services: name,
        wsdl: 'https://xyp.gov.mn/citizen-1.2.0/ws?WSDL'
      }
    ];
    const scope = base64.encode(JSON.stringify(service_structure));

    const url = `https://sso.gov.mn/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}state=afc7e00ab9250f59c2849bae67d90d1eb54459d8eb712c4c306bee5f287f2cb1`;

    return url;
  }
};

export default danLoginQueries;
