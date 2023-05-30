import { BaseAPI } from './base';

export interface ISMSConfig {
  messageProApiKey: string;
  messageProPhone: string;
  skytelToken: string;
}

export class SMSApi extends BaseAPI {
  private config: ISMSConfig;

  constructor(config: ISMSConfig) {
    super(config);

    this.config = config;
  }

  async sendSms(args: { to: string; text: string; type: string }) {
    switch (args.type) {
      case 'messagePro':
        this.apiUrl = 'https://api.messagepro.mn';
        return this.messageProSend(args);
      case 'skytel':
        this.apiUrl = 'http://web2sms.skytel.mn';
        return this.skytelSend(args);
      default:
        throw new Error('Invalid SMS integration type');
    }
  }

  private async messageProSend(args: { to: string; text: string }) {
    const { to, text } = args;
    const { messageProApiKey, messageProPhone } = this.config;

    if (!messageProApiKey || !messageProPhone) {
      throw new Error('MessagePro settings are not configured');
    }

    try {
      await this.request({
        method: 'GET',
        path: 'send',
        params: {
          key: messageProApiKey,
          from: messageProPhone,
          to,
          text
        }
      });

      return 'sent';
    } catch (e) {
      console.error(e);
      throw new Error(e.message);
    }
  }

  private async skytelSend(args: { to: string; text: string }) {
    const { to, text } = args;
    const { skytelToken } = this.config;

    if (!skytelToken) {
      throw new Error('Skytel settings are not configured');
    }

    try {
      await this.request({
        method: 'GET',
        path: 'apiSend',
        params: {
          token: skytelToken,
          sendTo: to,
          message: text
        }
      });

      return 'sent';
    } catch (e) {
      console.error(e);
      throw new Error(e.message);
    }
  }
}
