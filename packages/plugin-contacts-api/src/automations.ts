import {
  getRelatedTargets,
  setProperty
} from '@erxes/api-utils/src/automations';
import { getService } from '@erxes/api-utils/src/serviceDiscovery';
import { generateModels, IModels } from './connectionResolver';
import { sendCommonMessage, sendCoreMessage } from './messageBroker';

const getRelatedValue = async (
  models: IModels,
  subdomain: string,
  target,
  targetKey
) => {
  if (
    [
      'userId',
      'assignedUserId',
      'closedUserId',
      'ownerId',
      'createdBy'
    ].includes(targetKey)
  ) {
    const user = await sendCoreMessage({
      subdomain,
      action: 'users.findOne',
      data: { _id: target[targetKey] },
      isRPC: true
    });

    return (
      (user && ((user.detail && user.detail.fullName) || user.email)) || ''
    );
  }

  if (
    ['participatedUserIds', 'assignedUserIds', 'watchedUserIds'].includes(
      targetKey
    )
  ) {
    const users = await sendCoreMessage({
      subdomain,
      action: 'users.find',
      data: {
        query: {
          _id: { $in: target[targetKey] }
        }
      },
      isRPC: true
    });

    return (
      users.map(user => (user.detail && user.detail.fullName) || user.email) ||
      []
    ).join(', ');
  }

  if (targetKey === 'tagIds') {
    const tags = await sendCommonMessage({
      subdomain,
      serviceName: 'tags',
      action: 'find',
      data: { _id: { $in: target[targetKey] } }
    });

    return (tags.map(tag => tag.name) || []).join(', ');
  }

  return false;
};

const gatherRelationData = async (
  subdomain: string,
  module: string,
  target: any
) => {
  const models = await generateModels(subdomain);
  let model: any = models.Customers;

  let queryValue = 'customerId';

  if (module.includes('company')) {
    model = models.Companies;
    queryValue = 'companyId';
  }

  return model.find({ _id: target[queryValue] });
};

export default {
  receiveActions: async ({
    subdomain,
    data: { action, execution, triggerType, actionType }
  }) => {
    const models = await generateModels(subdomain);

    const conformities = await getRelatedTargets(
      subdomain,
      action,
      execution,
      triggerType,
      gatherRelationData,
      sendCommonMessage
    );

    const { module, rules } = action.config;

    if (actionType === 'set-property') {
      return setProperty({
        models,
        subdomain,
        module: module.includes('lead') ? 'contacts:customer' : module,
        rules,
        getRelatedValue,
        execution,
        sendCommonMessage,
        conformities
      });
    }
  },
  constants: {
    triggers: [
      {
        type: 'contacts:customer',
        img: 'automation2.svg',
        icon: 'users-alt',
        label: 'Customer',
        description:
          'Start with a blank workflow that enralls and is triggered off Customers'
      },
      {
        type: 'contacts:lead',
        img: 'automation2.svg',
        icon: 'users-alt',
        label: 'Lead',
        description:
          'Start with a blank workflow that enralls and is triggered off Leads'
      },
      {
        type: 'contacts:company',
        img: 'automation2.svg',
        icon: 'university',
        label: 'Company',
        description:
          'Start with a blank workflow that enralls and is triggered off company'
      }
    ]
  }
};
