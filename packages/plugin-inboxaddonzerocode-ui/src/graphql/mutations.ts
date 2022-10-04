const save = `
  mutation save($apiKey: String!) {
    inboxZerocodeAISaveConfig(apiKey: $apiKey) {
      apiKey
    }
  }
`;

export default {
  save
};
