import * as nodemailer from 'nodemailer';

import { moduleRequireLogin } from '@erxes/api-utils/src/permissions';
import { IContext } from '../../connectionResolver';
import { sendContactsMessage } from '../../messageBroker';

const notificationMutations = {
  /**
   * Send mail
   */
  async imapSendMail(_root, args: any, { subdomain, models }: IContext) {
    const { integrationId, subject, body, from, customerId, to } = args;

    let customer;

    const selector = customerId
      ? { _id: customerId }
      : { status: { $ne: 'deleted' }, emails: { $in: to } };

    customer = await sendContactsMessage({
      subdomain,
      action: 'customers.findOne',
      data: selector,
      isRPC: true
    });

    if (!customer) {
      const [primaryEmail] = to;

      customer = await sendContactsMessage({
        subdomain,
        action: 'customers.createCustomer',
        data: {
          state: 'lead',
          primaryEmail
        },
        isRPC: true
      });
    }

    const integration = await models.Integrations.findOne({
      inboxId: integrationId
    });

    if (!integration) {
      throw new Error('Integration not found');
    }

    const transporter = nodemailer.createTransport({
      host: integration.smtpHost,
      port: integration.smtpPort,
      auth: {
        user: integration.user,
        pass: integration.password
      }
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html: body
    });

    return info.messageId;
  }
};

moduleRequireLogin(notificationMutations);

export default notificationMutations;
