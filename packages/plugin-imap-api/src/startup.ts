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
                subdomain,
                action: 'integrations.receive',
                data: {
                  action: 'create-or-update-conversation',
                  payload: JSON.stringify({
                    integrationId: integration.erxesApiId,
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
};

const listen = async (subdomain: string) => {
  const models = await generateModels(subdomain);
  const integrations = await models.Integrations.find();

  for (const integration of integrations) {
    await listenIntegration(subdomain, integration);
  }
};

export default listen;
