import * as Imap from 'node-imap';
import { generateModels } from './connectionResolver';
import { sendInboxMessage } from './messageBroker';

const listenIntegration = async (subdomain, integration) => {
  var imap = new Imap({
    user: integration.user,
    password: integration.password,
    host: integration.host,
    port: 993,
    tls: true
  });

  const searchMessages = criteria => {
    return new Promise((resolve, reject) => {
      let messages: any = [];

      imap.search(criteria, function(err, results) {
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
              messages.push(parsedHeader);
            });
          });
        });

        f.once('error', function(err) {
          reject(err);
        });

        f.once('end', function() {
          resolve(messages);
        });
      });
    });
  };

  imap.once('ready', response => {
    imap.openBox('INBOX', true, async (err, box) => {
      const msgs: any = await searchMessages([
        'UNSEEN',
        ['SINCE', 'October 6, 2022']
      ]);

      for (const message of msgs) {
        const subject = message.subject[0];
        const from = message.from[0];

        const apiCustomerResponse = await sendInboxMessage({
          subdomain,
          action: 'integrations.receive',
          data: {
            action: 'get-create-update-customer',
            payload: JSON.stringify({
              integrationId: integration.erxesApiId,
              firstName: from
            })
          },
          isRPC: true
        });

        await sendInboxMessage({
          subdomain,
          action: 'integrations.receive',
          data: {
            action: 'create-or-update-conversation',
            payload: JSON.stringify({
              integrationId: integration.erxesApiId,
              customerId: apiCustomerResponse._id,
              content: subject
            })
          },
          isRPC: true
        });
      }
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
};

const listen = async (subdomain: string) => {
  const models = await generateModels(subdomain);
  const integrations = await models.Integrations.find();

  for (const integration of integrations) {
    await listenIntegration(subdomain, integration);
  }
};

export default listen;
