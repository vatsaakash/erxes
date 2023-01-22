import { commonFields } from './queries';

const commonFormParamsDef = `
  $name: String!,
  $channelIds: [String]
  $formId: String!,
  $languageCode: String,
  $leadData: IntegrationLeadData!
  $visibility: String,
  $departmentIds: [String],
`;

const commonFormParams = `
  name: $name,
  channelIds: $channelIds,
  formId: $formId,
  languageCode: $languageCode,
  leadData: $leadData,
  visibility: $visibility,
  departmentIds: $departmentIds,
`;

const integrationRemove = `
  mutation integrationsRemove($_id: String!) {
    integrationsRemove(_id: $_id)
  }
`;

const integrationsCreateLeadIntegration = `
  mutation integrationsCreateLeadIntegration(${commonFormParamsDef}, $brandId: String!) {
    integrationsCreateLeadIntegration(${commonFormParams}, brandId: $brandId) {
      _id
    }
  }
`;

const integrationsEditLeadIntegration = `
  mutation integrationsEditLeadIntegration($_id: String!, $brandId: String! , ${commonFormParamsDef}) {
    integrationsEditLeadIntegration(_id: $_id, brandId: $brandId, ${commonFormParams}) {
      _id
      ${commonFields}
    }
  }
`;

const integrationsCreateInternalFormIntegration = `
  mutation integrationsCreateInternalFormIntegration(${commonFormParamsDef}) {
    integrationsCreateInternalFormIntegration(${commonFormParams}) {
      _id
    }
  }
`;

const formCopy = `
  mutation integrationsCopyLeadIntegration($_id: String!) {
    integrationsCopyLeadIntegration(_id: $_id) {
      _id
    }
  }
`;

export default {
  integrationRemove,
  integrationsEditLeadIntegration,
  integrationsCreateLeadIntegration,
  formCopy
};
