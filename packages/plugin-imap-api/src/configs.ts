import * as Imap from 'node-imap';
import { inspect } from 'util';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { initBroker, sendInboxMessage } from './messageBroker';
import { generateModels } from './connectionResolver';
import { getSubdomain } from '@erxes/api-utils/src/core';

export let mainDb;
export let graphqlPubsub;
export let serviceDiscovery;

export let debug;

export default {
  name: 'imap',
  graphql: sd => {
    serviceDiscovery = sd;
    return {
      typeDefs,
      resolvers
    };
  },
  hasSubscriptions: true,
  segment: {},
  apolloServerContext: async (context, req) => {
    const subdomain = getSubdomain(req);

    context.subdomain = subdomain;
    context.models = await generateModels(subdomain);
  },

  onServerInit: async options => {
    mainDb = options.db;

    debug = options.debug;
    graphqlPubsub = options.pubsubClient;

    initBroker(options.messageBrokerClient);

    var imap = new Imap({
      user: 'dombookgombo@gmail.com',
      password: 'varsgaylquahqgwl',
      host: 'imap.gmail.com',
      port: 993,
      tls: true
    });

    imap.once('ready', response => {
      imap.openBox('INBOX', true, (err, box) => {
        imap.search(['UNSEEN', ['SINCE', 'September 30, 2022']], function(
          err,
          results
        ) {
          if (err) throw err;

          var f = imap.fetch(results, { bodies: '' });

          f.on('message', function(msg, seqno) {
            var prefix = '(#' + seqno + ') ';

            msg.on('body', function(stream, info) {
              var buffer = '';
              stream.on('data', function(chunk) {
                buffer += chunk.toString('utf8');
              });
              stream.once('end', async () => {
                const parsedHeader = Imap.parseHeader(buffer);
                const subject = parsedHeader.subject[0];

                await sendInboxMessage({
                  subdomain: 'os',
                  action: 'integrations.receive',
                  data: {
                    action: 'create-or-update-conversation',
                    payload: JSON.stringify({
                      content: subject
                    })
                  },
                  isRPC: true
                });
              });
            });
            msg.once('end', function() {
              console.log(prefix + 'Finished');
            });
          });

          f.once('error', function(err) {
            console.log('Fetch error: ' + err);
          });

          f.once('end', function() {
            console.log('Done fetching all messages!');
          });
        });
      });
    });

    imap.on('mail', function(response) {
      console.log('on mail =======', response);
    });

    imap.once('error', function(err) {
      console.log(err);
    });

    imap.once('end', function() {
      console.log('Connection ended');
    });

    imap.connect();
  }
};
