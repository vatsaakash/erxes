
const getRelatedTargetss = async (
  subdomain,
  triggerType,
  action,
  execution,
  sendCommonMessage
) => {
  const { config } = action;
  const { target } = execution;

  const { module } = config;

  if (module === triggerType) {
    return [target];
  }

  // ! shuud holbootoi tested......
  if (
    triggerType === 'inbox:conversation' &&
    ['cards:task', 'cards:ticket', 'cards:deal'].includes(module)
  ) {
    return sendCommonMessage({
      subdomain,
      serviceName: 'cards',
      action: `${module.replace('cards:', '')}s.find`,
      data: {
        sourceConversationIds: { $in: [target._id] }
      },
      isRPC: true
    });
  }

  // ! target.isFormSubmission bwal geh met nemelt holbogdono. 222222 tested....
  if (
    ['contacts:customer', 'contacts:lead'].includes(triggerType) &&
    target.isFormSubmission &&
    ['cards:task', 'cards:ticket', 'cards:deal'].includes(module)
  ) {
    return sendCommonMessage({
      subdomain,
      serviceName: 'cards',
      action: `${module.replace('cards:', '')}s.find`,
      data: {
        sourceConversationIds: { $in: [target.conversationId] }
      },
      isRPC: true
    });
  }

  // ! shuud holbootoi tested.....
  if (
    triggerType === 'inbox:conversation' &&
    ['contacts:customer', 'contacts:company'].includes(module)
  ) {
    return sendCommonMessage({
      subdomain,
      serviceName: 'contacts',
      action: `${module.includes('customer') ? 'customers' : 'companies'}.find`,
      data: {
        _id: target[module.includes('customer') ? 'customerId' : 'companyId']
      },
      isRPC: true
    });
  }

  // ! conformity holbootoi tested.... 111
  if (
    [
      'cards:task',
      'cards:ticket',
      'cards:deal',
      'contacts:customer',
      'contacts:company'
    ].includes(triggerType) &&
    [
      'cards:task',
      'cards:ticket',
      'cards:deal',
      'contacts:customer',
      'contacts:company'
    ].includes(module)
  ) {
    const relType = replaceServiceTypes(module);

    const relTypeIds = await sendCommonMessage({
      subdomain,
      serviceName: 'core',
      action: 'conformities.savedConformity',
      data: {
        mainType: replaceServiceTypes(triggerType),
        mainTypeId: target._id,
        relTypes: [relType]
      },
      isRPC: true
    });

    const [serviceName, collectionType] = module.split(':');

    return sendCommonMessage({
      subdomain,
      serviceName,
      action: `${pluralFormation(collectionType)}.find`,
      data: { _id: { $in: relTypeIds } },
      isRPC: true
    });
  }

  return [];
};