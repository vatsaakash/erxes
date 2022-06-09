import { filterXSS } from 'xss';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { getSubdomain } from '@erxes/api-utils/src/core';
import utils from './utils';

export let graphqlPubsub;
export let serviceDiscovery;
export let mainDb;

export let debug;

export default {
  name: 'transbank',
  graphql: async sd => {
    serviceDiscovery = sd;

    return;
  },
  segment: { schemas: [] },
  hasSubscriptions: false,
  meta: {},
  apolloServerContext: async (context, req) => {
    const subdomain = getSubdomain(req);

    context.dataloaders = {};
    context.docModifier = doc => doc;

    context.subdomain = subdomain;

    return context;
  },
  onServerInit: async options => {
    mainDb = options.db;
    console.log('options==================', options);
    const app = options.app;

    app.disable('x-powered-by');

    app.use(cookieParser());

    // POST request transbank

    app.post('/transbank', async (req, res) => {
      const data = req.body;
      console.log('data===========>', data);

      if (data.Customer_info) {
        return utils.accountInfo({
          data
        });
      }

      // if (data.customer_info) {
      //   return utils.createOrUpdateCustomer()
      // }
    });

    // for health checking
    app.get('/health', async (_req, res) => {
      res.end('ok');
    });

    app.use((req: any, _res, next) => {
      req.rawBody = '';

      req.on('data', chunk => {
        req.rawBody += chunk.toString();
      });

      next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    debug = options.debug;
    graphqlPubsub = options.pubsubClient;
  }
};
