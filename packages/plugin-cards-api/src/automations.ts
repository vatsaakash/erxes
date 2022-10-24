import {
  getRelatedTargets,
  replacePlaceHolders,
  setProperty
} from '@erxes/api-utils/src/automations';
import { generateModels, IModels } from './connectionResolver';
import { itemsAdd } from './graphql/resolvers/mutations/utils';
import { sendCommonMessage, sendCoreMessage } from './messageBroker';
import { getCollection } from './models/utils';

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
      data: { _id: { $in: target[targetKey] } },
      isRPC: true
    });

    return (tags.map(tag => tag.name) || []).join(', ');
  }

  if (targetKey === 'labelIds') {
    const labels = await models.PipelineLabels.find({
      _id: { $in: target[targetKey] }
    });

    return (labels.map(label => label.name) || []).join(', ');
  }

  if (['initialStageId', 'stageId'].includes(targetKey)) {
    const stage = await models.Stages.findOne({
      _id: target[targetKey]
    });

    return (stage && stage.name) || '';
  }

  if (['sourceConversationIds'].includes(targetKey)) {
    const conversations = await sendCommonMessage({
      subdomain,
      serviceName: 'inbox',
      action: 'conversations.find',
      data: { _id: { $in: target[targetKey] } },
      isRPC: true
    });

    return (conversations.map(c => c.content) || []).join(', ');
  }

  return false;
};

const gatherRelationData = async (
  subdomain: string,
  module: string,
  target: any,
  relationData: any
) => {
  const [serviceName, collectionType] = module.split(':');

  const {
    [serviceName]: { querySelector, queryValue }
  } = relationData;

  if (!querySelector || !queryValue) {
    return [];
  }

  const models = await generateModels(subdomain);
  let model: any;

  switch (collectionType) {
    case 'task':
      model = models.Tasks;
      break;
    case 'ticket':
      model = models.Tickets;
      break;
    default:
      model = models.Deals;
  }

  return model.find({
    [querySelector]: { $in: [target[queryValue]] }
  });
};

export default {
  dependentServices: [
    {
      name: 'contacts',
      conformityConnection: true,

      cards: {
        querySelector: 'sourceConversationIds',
        queryValue: 'conversationId',

        field: 'isFormSubmission'
      }
    },
    {
      name: 'inbox',

      cards: {
        querySelector: 'sourceConversationIds',
        queryValue: '_id'
      }
    }
  ],

  receiveActions: async ({
    subdomain,
    data: { action, execution, collectionType, triggerType, actionType }
  }) => {
    const models = await generateModels(subdomain);

    if (actionType === 'create') {
      return actionCreate({
        models,
        subdomain,
        action,
        execution,
        collectionType
      });
    }

    const conformities = await getRelatedTargets(
      subdomain,
      action,
      execution,
      triggerType,
      gatherRelationData,
      sendCommonMessage
    );

    const { module, rules } = action.config;

    return setProperty({
      models,
      subdomain,
      getRelatedValue,
      module,
      rules,
      execution,
      sendCommonMessage,
      conformities
    });
  },
  constants: {
    triggers: [
      {
        type: 'cards:task',
        img: 'automation3.svg',
        icon: 'file-plus-alt',
        label: 'Task',
        description:
          'Start with a blank workflow that enralls and is triggered off task'
      },
      {
        type: 'cards:ticket',
        img: 'automation3.svg',
        icon: 'file-plus',
        label: 'Ticket',
        description:
          'Start with a blank workflow that enralls and is triggered off ticket'
      },
      {
        type: 'cards:deal',
        img: 'automation3.svg',
        icon: 'piggy-bank',
        label: 'Sales pipeline',
        description:
          'Start with a blank workflow that enralls and is triggered off sales pipeline item'
      }
    ],
    actions: [
      {
        type: 'cards:task.create',
        icon: 'file-plus-alt',
        label: 'Create task',
        description: 'Create task',
        isAvailable: true
      },
      {
        type: 'cards:deal.create',
        icon: 'piggy-bank',
        label: 'Create deal',
        description: 'Create deal',
        isAvailable: true
      },
      {
        type: 'cards:ticket.create',
        icon: 'file-plus',
        label: 'Create ticket',
        description: 'Create ticket',
        isAvailable: true
      }
    ]
  }
};

const actionCreate = async ({
  models,
  subdomain,
  action,
  execution,
  collectionType
}) => {
  const { config = {} } = action;

  let newData = action.config.assignedTo
    ? await replacePlaceHolders({
        models,
        subdomain,
        getRelatedValue,
        actionData: { assignedTo: action.config.assignedTo },
        target: execution.target,
        isRelated: false
      })
    : {};

  delete action.config.assignedTo;

  newData = {
    ...newData,
    ...(await replacePlaceHolders({
      models,
      subdomain,
      getRelatedValue,
      actionData: action.config,
      target: execution.target
    }))
  };

  if (execution.target.userId) {
    newData.userId = execution.target.userId;
  }

  if (execution.triggerType === 'inbox:conversation') {
    newData.sourceConversationIds = [execution.targetId];
  }

  if (
    ['contacts:customer', 'contacts:lead'].includes(execution.triggerType) &&
    execution.target.isFormSubmission
  ) {
    newData.sourceConversationIds = [execution.target.conversationId];
  }

  if (newData.hasOwnProperty('assignedTo')) {
    newData.assignedUserIds = newData.assignedTo.trim().split(', ');
  }

  if (newData.hasOwnProperty('labelIds')) {
    newData.labelIds = newData.labelIds.trim().split(', ');
  }

  if (newData.hasOwnProperty('cardName')) {
    newData.name = newData.cardName;
  }

  if (config.hasOwnProperty('stageId')) {
    newData.stageId = config.stageId;
  }

  try {
    const { create } = getCollection(models, collectionType);

    const item = await itemsAdd(
      models,
      subdomain,
      newData,
      collectionType,
      create
    );

    if (execution.triggerType === 'inbox:conversation') {
      await sendCoreMessage({
        subdomain,
        action: 'conformities.addConformity',
        data: {
          mainType: 'customer',
          mainTypeId: execution.target.customerId,
          relType: `${collectionType}`,
          relTypeId: item._id
        }
      });
    } else {
      const mainType = execution.triggerType.split(':')[1];

      await sendCoreMessage({
        subdomain,
        action: 'conformities.addConformity',
        data: {
          mainType: mainType.replace('lead', 'customer'),
          mainTypeId: execution.targetId,
          relType: `${collectionType}`,
          relTypeId: item._id
        }
      });
    }

    return {
      name: item.name,
      itemId: item._id,
      stageId: item.stageId,
      pipelineId: newData.pipelineId,
      boardId: newData.boardId
    };
  } catch (e) {
    return { error: e.message };
  }
};
