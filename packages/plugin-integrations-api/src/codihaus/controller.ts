import { generateModels, IModels } from '../connectionResolver';
import { debugCodihaus, debugError, debugRequest } from '../debuggers';
import { routeErrorHandling } from '../helpers';
import { sendInboxMessage } from '../messageBroker';
import { getSubdomain } from '@erxes/api-utils/src/core';
import { getConfig } from '../utils';

export const codihausCreateIntegration = async (
  models: IModels,
  { integrationId, data }
) => {
  const { phoneNumber } = JSON.parse(data || '{}');

  // Check existing Integration
  const integration = await models.Integrations.findOne({
    kind: 'codihaus',
    phoneNumber
  }).lean();

  if (integration) {
    const message = `Integration already exists with this phone number: ${phoneNumber}`;

    debugCodihaus(message);
    throw new Error(message);
  }

  await models.Integrations.create({
    kind: 'codihaus',
    erxesApiId: integrationId,
    phoneNumber
  });

  return { status: 'success' };
};

const init = async app => {
  app.post(
    '/codihaus-receive',
    routeErrorHandling(async (req, res) => {
      const subdomain = getSubdomain(req);
      const models = await generateModels(subdomain);
      const CODIHAUS_TOKEN = await getConfig(models, 'CODIHAUS_TOKEN');

      debugRequest(debugCodihaus, req);

      const { numberTo, numberFrom, disp, callID, owner, token } = req.body;

      console.log(CODIHAUS_TOKEN, token);

      if (CODIHAUS_TOKEN !== token) {
        throw new Error('Invalid token');
      }

      const integration = await models.Integrations.findOne({
        phoneNumber: numberTo,
        kind: 'codihaus'
      }).lean();

      if (!integration) {
        const message = `Integration not found with: ${numberTo}`;

        debugCodihaus(message);
        throw new Error(message);
      }

      // get customer
      let customer = await models.CodihausCustomers.findOne({
        phoneNumber: numberFrom
      });

      if (!customer) {
        try {
          customer = await models.CodihausCustomers.create({
            phoneNumber: numberFrom,
            integrationId: integration._id
          });
        } catch (e) {
          const message = e.message.includes('duplicate')
            ? 'Concurrent request: customer duplication'
            : e.message;

          debugError(message);
          throw new Error(message);
        }

        // save on api
        try {
          const apiCustomerResponse = await sendInboxMessage({
            subdomain,
            action: 'integrations.receive',
            data: {
              action: 'get-create-update-customer',
              payload: JSON.stringify({
                integrationId: integration.erxesApiId,
                primaryPhone: numberFrom,
                isUser: true,
                phones: [numberFrom]
              })
            },
            isRPC: true
          });

          customer.erxesApiId = apiCustomerResponse._id;
          await customer.save();
        } catch (e) {
          await models.CodihausCustomers.deleteOne({ _id: customer._id });

          debugError(
            'Codihaus: error occured during create or update customer on api: ',
            e.message
          );
          throw new Error(e);
        }
      }

      // get conversation
      let conversation = await models.CodihausConversations.findOne({
        callId: callID
      });

      // create conversation
      if (!conversation) {
        // save on integration db
        try {
          conversation = await models.CodihausConversations.create({
            state: disp,
            callId: callID,
            senderPhoneNumber: numberTo,
            recipientPhoneNumber: numberFrom,
            integrationId: integration._id
          });
        } catch (e) {
          const message = e.message.includes('duplicate')
            ? 'Concurrent request: conversation duplication'
            : e.message;

          debugError(message);
          throw new Error(message);
        }
      }

      // save on api
      try {
        const apiConversationResponse = await sendInboxMessage({
          subdomain,
          action: 'integrations.receive',
          data: {
            action: 'create-or-update-conversation',
            payload: JSON.stringify({
              customerId: customer.erxesApiId,
              content: disp,
              integrationId: integration.erxesApiId,
              owner
            })
          },
          isRPC: true
        });

        conversation.erxesApiId = apiConversationResponse._id;
        await conversation.save();
      } catch (e) {
        await models.CodihausConversations.deleteOne({ _id: conversation._id });

        debugError(
          'Codihaus: error occured during create or update conversation on api: ',
          e.message
        );
        throw new Error(e);
      }

      res.send('success');
    })
  );
};

export default init;
